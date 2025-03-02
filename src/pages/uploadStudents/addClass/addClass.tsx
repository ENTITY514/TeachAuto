import React, { useState, useEffect } from 'react';
import style from '../style.module.css';
import { Class } from 'interfaces/main.interface';

interface IAddClass {
    addClass: (c: Class) => void
}

const CLASS_RANK = ['А', 'Б', 'В', 'ЛУО', 'Без ранга']

export const AddClass: React.FC<IAddClass> = ({ addClass }) => {
    const [newClassGrade, setNewClassGrade] = useState<number>(1);
    const [newClassRank, setNewClassRank] = useState<string>('А');

    // Добавление нового класса
    const handleClick = () => {
        const newClass: Class = {
            id: Date.now(),
            grade: newClassGrade,
            rank: newClassRank,
            students: [],
        };
        addClass(newClass)
        setNewClassGrade(1);
        setNewClassRank('А');
    };

    return (
        <div className={style.container}>
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
                    {CLASS_RANK.map((rank) => (
                        <option key={rank} value={rank}>
                            {rank}
                        </option>
                    ))}
                </select>
                <button onClick={handleClick}>Добавить класс</button>
            </div>
        </div>
    );
};