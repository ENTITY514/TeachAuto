import styles from './style.module.css';
import { Class, Lesson } from '../../interfaces/main.interface';
import React from 'react';

interface LessonHeaderProps {
  lesson: Lesson;
  editingTopic: boolean;
  setEditingTopic: (editing: boolean) => void;
  onTopicChange: (newTopic: string) => void;
  onTopicBlur: () => void;
  onHomeworkDescriptionChange: (description: string) => void;
}

const LessonHeader = ({
  lesson,
  editingTopic,
  setEditingTopic,
  onTopicChange,
  onTopicBlur,
  onHomeworkDescriptionChange
}: LessonHeaderProps) => {
  const [className, setClassName] = React.useState<string>("class")

  React.useEffect(() => {
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      const parsedClasses = JSON.parse(storedClasses)
      const selectedClass: Class = parsedClasses.find((c: { id: number; }) => c.id === lesson.classId)
      setClassName(selectedClass.grade + " " + selectedClass.rank)
    }
  }, []);
  return (
    <div className={styles.header}>
      <div className={styles.classInfo}>
        <h2>Класс {className}</h2>
        <p>Дата: {new Date(lesson.date).toLocaleDateString()}</p>
        {editingTopic ? (
          <input
            type="text"
            value={lesson.topic}
            onChange={(e) => onTopicChange(e.target.value)}
            onBlur={onTopicBlur}
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
          onChange={(e) => onHomeworkDescriptionChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LessonHeader;