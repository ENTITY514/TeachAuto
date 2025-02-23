import React, { useState, useEffect } from 'react';
import style from './style.module.css';

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    baseGrade: number;
}

interface Class {
    id: number;
    grade: number;
    rank: string;
    students: Student[];
}

const UploadStudentsPage: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [newClassGrade, setNewClassGrade] = useState<number>(1);
    const [newClassRank, setNewClassRank] = useState<string>('А');
    const [newStudentFirstName, setNewStudentFirstName] = useState<string>('');
    const [newStudentLastName, setNewStudentLastName] = useState<string>('');
    const [newStudentBaseGrade, setNewStudentBaseGrade] = useState<number>(2);

    // Загрузка данных из localStorage при монтировании компонента
    useEffect(() => {
        const storedClasses = localStorage.getItem('classes');
        if (storedClasses) {
            setClasses(JSON.parse(storedClasses));
        }
        else {
            localStorage.setItem('classes', JSON.stringify(classes));
        }
    }, []);

    // Сохранение данных в localStorage при изменении классов
    useEffect(() => {
        if (classes.length !== 0) {
            localStorage.setItem('classes', JSON.stringify(classes));
        }
    }, [classes]);

    // Добавление нового класса
    const addClass = () => {
        const newClass: Class = {
            id: Date.now(),
            grade: newClassGrade,
            rank: newClassRank,
            students: [],
        };
        setClasses([...classes, newClass]);
        setNewClassGrade(1);
        setNewClassRank('А');
    };

    // Добавление нового ученика в выбранный класс
    const addStudent = () => {
        if (selectedClassId === null) return;
        const selectedClass = classes.find((c) => c.id === selectedClassId);
        if (!selectedClass) return;

        const newStudent: Student = {
            id: Date.now(),
            firstName: newStudentFirstName,
            lastName: newStudentLastName,
            baseGrade: newStudentBaseGrade,
        };

        const updatedClass = {
            ...selectedClass,
            students: [...selectedClass.students, newStudent],
        };

        setClasses(classes.map((c) => (c.id === selectedClassId ? updatedClass : c)));
        setNewStudentFirstName('');
        setNewStudentLastName('');
        setNewStudentBaseGrade(2);
    };

    // Очистка формы добавления ученика
    const clearStudentForm = () => {
        setNewStudentFirstName('');
        setNewStudentLastName('');
        setNewStudentBaseGrade(2);
    };

    const selectedClass = classes.find((c) => c.id === selectedClassId);

    return (
        <div className={style.container}>
            {/* Форма добавления класса */}
            <div className={style.addClassForm}>
                <h3>Добавить класс</h3>
                <select
                    value={newClassGrade}
                    onChange={(e) => setNewClassGrade(Number(e.target.value))}
                >
                    {Array.from({ length: 11 }, (_, i) => i + 1).map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                    ))}
                </select>
                <select
                    value={newClassRank}
                    onChange={(e) => setNewClassRank(e.target.value)}
                >
                    {['А', 'Б', 'В', 'ЛУО', 'Без ранга'].map((rank) => (
                        <option key={rank} value={rank}>
                            {rank}
                        </option>
                    ))}
                </select>
                <button onClick={addClass}>Добавить класс</button>
            </div>

            {/* Список классов */}
            <div className={style.classSelector}>
                {classes.map((c) => (
                    <button
                        key={c.id}
                        className={`${style.classButton} ${selectedClassId === c.id ? style.active : ''}`}
                        onClick={() => setSelectedClassId(c.id)}
                    >
                        {c.grade} {c.rank}
                    </button>
                ))}
            </div>

            {/* Таблица учеников выбранного класса */}
            {selectedClass && (
                <div className={style.classTable}>
                    <h2>Ученики класса {selectedClass.grade} {selectedClass.rank}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Базовая оценка</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedClass.students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.baseGrade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Форма добавления ученика */}
            {selectedClass && (
                <div className={style.addStudentForm}>
                    <h3>Добавить ученика в класс {selectedClass.grade} {selectedClass.rank}</h3>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={newStudentFirstName}
                        onChange={(e) => setNewStudentFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={newStudentLastName}
                        onChange={(e) => setNewStudentLastName(e.target.value)}
                    />
                    <select
                        value={newStudentBaseGrade}
                        onChange={(e) => setNewStudentBaseGrade(Number(e.target.value))}
                    >
                        {[2, 3, 4, 5].map((grade) => (
                            <option key={grade} value={grade}>
                                {grade}
                            </option>
                        ))}
                    </select>
                    <button onClick={addStudent}>Добавить ученика</button>
                    <button onClick={clearStudentForm}>Очистить поле</button>
                </div>
            )}
        </div>
    );
};

export default UploadStudentsPage;