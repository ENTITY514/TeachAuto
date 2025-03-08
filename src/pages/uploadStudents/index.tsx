import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { Class, Student } from 'interfaces/main.interface';
import { AddStudentToClass } from './addStudent/addStudent';
import { StudentsList } from './students/students';
import { ClassesList } from './classesList/classList';
import { AddClass } from './addClass/addClass';

const UploadStudentsPage: React.FC = () => {
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

    const addClass = (c: Class) => {
        setClasses([...classes, c]);
        setSelectedClassId(c.id)
    };

    // Добавление нового ученика в выбранный класс
    const addStudent = (student: Student) => {
        if (selectedClassId === null) return;
        const selectedClass = classes.find((c) => c.id === selectedClassId);
        if (!selectedClass) return;
        const updatedClass = {
            ...selectedClass,
            students: [...selectedClass.students, student],
        };
        setClasses(classes.map((c) => (c.id === selectedClassId ? updatedClass : c)));
    };

    const selectClass = (id: number) => {
        setSelectedClassId(id)
    }

    const selectedClass = classes.find((c) => c.id === selectedClassId);

    return (
        <div className={style.container}>
            <AddClass addClass={addClass} />
            <ClassesList classes={classes} selectedClass={selectedClass} setSelectedClassId={selectClass} />
            <StudentsList selectedClass={selectedClass} />
            <AddStudentToClass addStudent={addStudent} selectedClass={selectedClass} />
        </div>
    );
};

export default UploadStudentsPage;