import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import { Lesson, WorkType, StudentState } from 'interfaces/main.interface';
import LessonHeader from './header';
import StudentTable from './table';
import { calculatePreliminaryGrade, SortStudentOfLessonByPresence } from './utils';
import WorkTypeForm from './workTypes';

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
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
        works: { ...student.works, [newWork.id]: newWork.maxScore }
      }))
    };

    setNewWorkType({ type: '', max: 1 });
    updateLesson(updated);
  };

  if (!lesson) return <div>Loading...</div>;

  const calculateGrade = (student: StudentState) => calculatePreliminaryGrade(student, lesson);

  return (
    <div className={styles.bigContainer}>
      <LessonHeader
        lesson={lesson}
        onTopicChange={(newTopic) => handleTopicUpdate(newTopic)}
        onHomeworkDescriptionChange={(desc) => updateLesson({ ...lesson, homeworkDescription: desc })}
      />

      <WorkTypeForm
        newWorkType={newWorkType}
        setNewWorkType={setNewWorkType}
        onAddWorkType={handleAddWorkType}
      />

      <StudentTable
        lesson={lesson}
        updateLesson={updateLesson}
        calculatePreliminaryGrade={calculateGrade}
      />

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