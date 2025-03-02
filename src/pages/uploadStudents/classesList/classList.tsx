import React, { useState, useEffect } from 'react';
import style from '../style.module.css';
import { Class } from 'interfaces/main.interface';

interface IClassListProps {
    selectedClass: Class | undefined
    setSelectedClassId: (id: number) => void
}

export const ClassesList: React.FC<IClassListProps> = ({ selectedClass, setSelectedClassId }) => {
    const [classes, setClasses] = useState<Class[]>([]);

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