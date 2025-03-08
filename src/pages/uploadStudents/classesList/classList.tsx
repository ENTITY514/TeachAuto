import React, { useState, useEffect } from 'react';
import style from '../style.module.css';
import { Class } from 'interfaces/main.interface';

interface IClassListProps {
    classes: Class[]
    selectedClass: Class | undefined
    setSelectedClassId: (id: number) => void
}

export const ClassesList: React.FC<IClassListProps> = ({ classes, selectedClass, setSelectedClassId }) => {
    return (
        <div className={style.container}>
            <div className={style.classSelector}>
                {classes.map((c) => (
                    <button
                        key={c.id}
                        className={`${style.classButton} ${selectedClass?.id === c.id ? style.active : ''}`}
                        onClick={() => setSelectedClassId(c.id)}
                    >
                        {c.grade} {c.rank}
                    </button>
                ))}
            </div>
        </div>
    );
};