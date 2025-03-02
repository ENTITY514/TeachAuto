import React, { useState, useEffect } from 'react';
import style from '../style.module.css';
import { Class, Student } from 'interfaces/main.interface';

interface IAddStuedntToClass {
    addStudent: (student: Student) => void
    selectedClass: Class | undefined
}

export const AddStudentToClass: React.FC<IAddStuedntToClass> = ({ addStudent, selectedClass }) => {
    const [newStudentFirstName, setNewStudentFirstName] = useState<string>('');
    const [newStudentLastName, setNewStudentLastName] = useState<string>('');
    const [newStudentBaseGrade, setNewStudentBaseGrade] = useState<number>(2);

    const handleClick = () => {
        const newStudent: Student = {
            id: Date.now(),
            firstName: newStudentFirstName,
            lastName: newStudentLastName,
            baseGrade: newStudentBaseGrade,
        };
        addStudent(newStudent);
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

    return (
        <div className={style.container}>
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
                    <button onClick={handleClick}>Добавить ученика</button>
                    <button onClick={clearStudentForm}>Очистить поле</button>
                </div>
            )}
        </div>
    );
};