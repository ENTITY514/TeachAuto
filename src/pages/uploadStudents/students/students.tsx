import React, { useState, useEffect } from 'react';
import style from '../style.module.css';
import { Class } from 'interfaces/main.interface';

interface IStudentListProps {
    selectedClass: Class | undefined
}

export const StudentsList: React.FC<IStudentListProps> = ({ selectedClass }) => {
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