import React, { useState, useEffect } from 'react';
import style from '../style.module.css';
import { Class } from 'interfaces/main.interface';

export const StudentsList: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

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

    const selectedClass = classes.find((c) => c.id === selectedClassId);

    return (
        <div className={style.container}>
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
        </div>
    );
};