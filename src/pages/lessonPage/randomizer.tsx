import React, { useState, useMemo, useCallback } from 'react';
import { StudentState } from 'interfaces/main.interface'; // Убедитесь, что путь к интерфейсам правильный
import styles from './style.module.css'; // Предполагаем, что стили в том же файле, что и у LessonPage

interface StudentRandomizerProps {
    students: StudentState[];
}

const StudentRandomizer: React.FC<StudentRandomizerProps> = ({ students }) => {
    // Состояние для хранения ID студентов, которые уже были вызваны в текущем цикле
    const [calledStudentIds, setCalledStudentIds] = useState<Set<number>>(new Set());
    // Состояние для хранения информации о последнем выбранном студенте
    const [selectedStudentInfo, setSelectedStudentInfo] = useState<{ index: number; lastName: string; firstName: string } | null>(null);
    // Состояние для сообщения пользователю
    const [message, setMessage] = useState<string>('');

    // Получаем список ID присутствующих студентов. useMemo кэширует результат.
    const presentStudentIds = useMemo(() => {
        return students
            .filter(s => s.present)
            .map(s => s.student.id);
    }, [students]); // Пересчитываем только при изменении списка студентов

    // Функция выбора случайного ученика
    const selectRandomStudent = useCallback(() => {
        // Находим ID студентов, которые присутствуют И еще не были вызваны
        let availableStudentIds = presentStudentIds.filter(id => !calledStudentIds.has(id));

        // Если доступных нет, но присутствующие есть - значит, все были вызваны. Сбрасываем список вызванных.
        if (availableStudentIds.length === 0 && presentStudentIds.length > 0) {
            setMessage('Все присутствующие были вызваны! Начинаем заново.');
            setCalledStudentIds(new Set()); // Сброс
            availableStudentIds = [...presentStudentIds]; // Все присутствующие снова доступны
        } else if (presentStudentIds.length === 0) {
            setMessage('Нет присутствующих учеников для выбора.');
            setSelectedStudentInfo(null);
            return; // Выходим, если некого выбирать
        } else {
            setMessage(''); // Убираем сообщение, если есть кого выбрать
        }

        // Если после возможного сброса все еще нет доступных (например, никто не присутствует)
        if (availableStudentIds.length === 0) {
            setMessage('Нет доступных учеников для выбора.');
            setSelectedStudentInfo(null);
            return;
        }

        // Выбираем случайный индекс из списка доступных ID
        const randomIndex = Math.floor(Math.random() * availableStudentIds.length);
        const selectedStudentId = availableStudentIds[randomIndex];

        // Находим полного студента по ID
        const selectedStudentState = students.find(s => s.student.id === selectedStudentId);
        // Находим индекс студента в *оригинальном* списке для отображения номера
        const originalIndex = students.findIndex(s => s.student.id === selectedStudentId);


        if (selectedStudentState) {
            // Обновляем состояние: добавляем ID в вызванные и сохраняем инфо о выбранном
            setCalledStudentIds(prev => new Set(prev).add(selectedStudentId));
            setSelectedStudentInfo({
                index: originalIndex + 1, // +1 для отображения номера с 1, а не с 0
                lastName: selectedStudentState.student.lastName,
                firstName: selectedStudentState.student.firstName
            });
        }
    }, [students, presentStudentIds, calledStudentIds]); // Зависимости для useCallback

    return (
        <div className={`${styles.container} ${styles.randomizerContainer}`}> {/* Используем существующий класс container и добавляем новый */}
            <h4>Случайный выбор ученика</h4>
            <button onClick={selectRandomStudent} className={styles.randomizerButton} disabled={presentStudentIds.length === 0}>
                Выбрать ученика
            </button>
            {message && <p className={styles.randomizerMessage}>{message}</p>}
            {selectedStudentInfo && !message && ( // Показываем результат, только если нет сообщения об ошибке/сбросе
                <p className={styles.randomizerResult}>
                    Выбран ученик: <strong>№ {selectedStudentInfo.index} - {selectedStudentInfo.lastName + " " + selectedStudentInfo.firstName}</strong>
                </p>
            )}
            {/* Опционально: показать, сколько еще не вызвано */}
            <p className={styles.randomizerStatus}>
                Осталось невызванных: {presentStudentIds.length - calledStudentIds.size} / {presentStudentIds.length}
            </p>
        </div>
    );
};

export default StudentRandomizer;