import { Class, Lesson, StudentState } from "interfaces/main.interface";
import style from "./style.module.css"
import { useEffect, useState } from 'react';


export default function AllLessonsPage() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [lessons, setLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        const savedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
        const savedLessons = JSON.parse(localStorage.getItem('lessons') || '[]');
        setClasses(savedClasses);
        setLessons(savedLessons);
    }, []);

    const handleAddLesson = (classId: number) => {
        const currentClass = classes.find(c => c.id === classId);
        if (!currentClass) return;

        const initialStudents: StudentState[] = currentClass.students.map(student => ({
            student,
            present: true,
            homework: 2 as 0 | 1 | 2,
            works: {},
            finalGrade: null
        }));

        const newLesson: Lesson = {
            id: Date.now(),
            date: new Date().toISOString(),
            classId,
            topic: 'Новая тема',
            homeworkDescription: '',
            students: initialStudents,
            workTypes: []
        };

        const updatedLessons = [...lessons, newLesson];
        localStorage.setItem('lessons', JSON.stringify(updatedLessons));
        setLessons(updatedLessons);
        window.location.href = `/lesson/${newLesson.id}`;
    };


    const lessonsByClass: { [key: number]: Lesson[] } = {};
    lessons.forEach(lesson => {
        if (!lessonsByClass[lesson.classId]) {
            lessonsByClass[lesson.classId] = [];
        }
        lessonsByClass[lesson.classId].push(lesson);
    });

    Object.values(lessonsByClass).forEach(lessons => {
        lessons.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    return (
        <div className={style.container}>
            {classes.length === 0 && (
                <p className={style.noClasses}>Нет доступных классов</p>
            )}

            {classes.map(cls => {
                const classLessons = lessonsByClass[cls.id] || [];
                return (
                    <div key={cls.id} className={style.classTable}>
                        <h2 className={style.classTitle}>Класс {cls.grade}-{cls.rank}</h2>

                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th className={style.tableHeader}>Дата</th>
                                    <th className={style.tableHeader}>Класс</th>
                                    <th className={style.tableHeader}>Тема</th>
                                    <th className={style.tableHeader}>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classLessons.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className={style.noLessons}>
                                            Нет уроков для этого класса
                                        </td>
                                    </tr>
                                ) : (
                                    classLessons.map(lesson => (
                                        <tr key={lesson.id} className={style.tableRow}>
                                            <td className={style.tableCell}>{new Date(lesson.date).toLocaleDateString()}</td>
                                            <td className={style.tableCell}>{cls.grade}-{cls.rank}</td>
                                            <td className={style.tableCell}>{lesson.topic}</td>
                                            <td className={style.tableCell}>
                                                <button
                                                    className={style.openButton}
                                                    onClick={() => window.location.href = `/lesson/${lesson.id}`}
                                                >
                                                    Открыть
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <button
                            className={style.addButton}
                            onClick={() => handleAddLesson(cls.id)}
                        >
                            Добавить урок
                        </button>
                    </div>
                );
            })}
        </div>
    );
};