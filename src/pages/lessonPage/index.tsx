import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';

interface StudentState {
  id: number;
  present: boolean;
  homework: 0 | 1 | 2;
  works: { [key: string]: number };
  finalGrade: number | null;
}

interface WorkType {
  id: string;
  name: string;
  maxScore: number;
}

interface StudentState {
    studentId: number; // Изменяем id на studentId для ясности
    present: boolean;
    homework: 0 | 1 | 2;
    works: { [key: string]: number };
    finalGrade: number | null;
  }
  
  interface Lesson {
    id: number;
    date: string;
    classId: number;
    topic: string;
    homeworkDescription: string;
    students: StudentState[];
    workTypes: WorkType[];
  }

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [editingTopic, setEditingTopic] = useState(false);
  const [newWorkType, setNewWorkType] = useState<{ type: string; max: number }>({ type: '', max: 1 });

  useEffect(() => {
    const savedLessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    const currentLesson = savedLessons.find((l: Lesson) => l.id === Number(id));
    
    if (currentLesson) {
      setLesson(currentLesson);
    } else {
      window.location.href = '/';
    }
  }, [id]);

  const updateLesson = (updatedLesson: Lesson) => {
    const savedLessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    const updatedLessons = savedLessons.map((l: Lesson) => 
      l.id === updatedLesson.id ? updatedLesson : l
    );
    localStorage.setItem('lessons', JSON.stringify(updatedLessons));
    setLesson(updatedLesson);
  };

  const handleTopicUpdate = (newTopic: string) => {
    if (!lesson) return;
    const updated = { ...lesson, topic: newTopic };
    updateLesson(updated);
    setEditingTopic(false);
  };

  const handleAddWorkType = () => {
    if (!lesson || !newWorkType.type || newWorkType.max < 1) return;
    
    const newWork: WorkType = {
      id: Date.now().toString(),
      name: newWorkType.type,
      maxScore: newWorkType.max
    };

    const updated = {
      ...lesson,
      workTypes: [...lesson.workTypes, newWork],
      students: lesson.students.map(student => ({
        ...student,
        works: { ...student.works, [newWork.id]: 0 }
      }))
    };

    setNewWorkType({ type: '', max: 1 });
    updateLesson(updated);
  };

  const calculatePreliminaryGrade = (student: StudentState) => {
    const homeworkScore = student.homework;
    const workScores = Object.values(student.works).reduce((a, b) => a + b, 0);
    const totalScore = homeworkScore + workScores;
    const maxPossible = 2 + lesson!.workTypes.reduce((a, b) => a + b.maxScore, 0);
    return Math.round((totalScore / maxPossible) * 10);
  };

  if (!lesson) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.classInfo}>
          <h2>Класс {lesson.classId}</h2>
          <p>Дата: {new Date(lesson.date).toLocaleDateString()}</p>
          {editingTopic ? (
            <input
              type="text"
              value={lesson.topic}
              onChange={(e) => setLesson({ ...lesson, topic: e.target.value })}
              onBlur={() => handleTopicUpdate(lesson.topic)}
              autoFocus
            />
          ) : (
            <h3 onDoubleClick={() => setEditingTopic(true)}>{lesson.topic}</h3>
          )}
        </div>
        <div className={styles.homework}>
          <h4>Домашнее задание:</h4>
          <textarea
            value={lesson.homeworkDescription}
            onChange={(e) => updateLesson({ ...lesson, homeworkDescription: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.workTypes}>
        <select
          value={newWorkType.type}
          onChange={(e) => setNewWorkType({ ...newWorkType, type: e.target.value })}
        >
          <option value="">Выберите тип работы</option>
          <option value="Устный ответ">Устный ответ</option>
          <option value="Самостоятельная работа">Самостоятельная работа</option>
          <option value="Ответ у доски">Ответ у доски</option>
        </select>
        <input
          type="number"
          min="1"
          value={newWorkType.max}
          onChange={(e) => setNewWorkType({ ...newWorkType, max: +e.target.value })}
        />
        <button onClick={handleAddWorkType}>Добавить работу</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Ученик</th>
            <th>Присутствие</th>
            <th>ДЗ</th>
            {lesson.workTypes.map(work => (
              <th key={work.id}>{work.name} (макс. {work.maxScore})</th>
            ))}
            <th>Предв. оценка</th>
            <th>Итоговая</th>
          </tr>
        </thead>
        <tbody>
          {lesson.students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{`${student.id}`}</td>
              <td
                className={`${styles.presence} ${student.present ? styles.present : styles.absent}`}
                onClick={() => {
                  const updated = {
                    ...lesson,
                    students: lesson.students.map(s =>
                      s.id === student.id ? { ...s, present: !s.present } : s
                    )
                  };
                  updateLesson(updated);
                }}
              >
                {student.present ? '✓' : '✕'}
              </td>
              <td
                className={`${styles.hwCell} ${styles[`hw${student.homework}`]}`}
                onClick={() => {
                  const newHomework = (student.homework + 1) % 3 as 0 | 1 | 2;
                  const updated = {
                    ...lesson,
                    students: lesson.students.map(s =>
                      s.id === student.id ? { ...s, homework: newHomework } : s
                    )
                  };
                  updateLesson(updated);
                }}
              />
              {lesson.workTypes.map(work => (
                <td key={work.id}>
                  <input
                    type="number"
                    min="0"
                    max={work.maxScore}
                    value={student.works[work.id]}
                    onChange={(e) => {
                      const updatedWorks = {
                        ...student.works,
                        [work.id]: Math.min(work.maxScore, Math.max(0, +e.target.value))
                      };
                      const updated = {
                        ...lesson,
                        students: lesson.students.map(s =>
                          s.id === student.id ? { ...s, works: updatedWorks } : s
                        )
                      };
                      updateLesson(updated);
                    }}
                  />
                </td>
              ))}
              <td>{calculatePreliminaryGrade(student)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={student.finalGrade || ''}
                  onChange={(e) => {
                    const updated = {
                      ...lesson,
                      students: lesson.students.map(s =>
                        s.id === student.id ? { 
                          ...s, 
                          finalGrade: Math.min(10, Math.max(1, +e.target.value)) 
                        } : s
                      )
                    };
                    updateLesson(updated);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        className={styles.saveButton}
        onClick={() => updateLesson(lesson)}
      >
        Сохранить
      </button>
    </div>
  );
};

export default LessonPage;