import styles from './style.module.css';
import { Class, Lesson } from '../../interfaces/main.interface';
import React from 'react';

interface LessonHeaderProps {
  lesson: Lesson;
  onTopicChange: (newTopic: string) => void;
  onHomeworkDescriptionChange: (description: string) => void;
}

const LessonHeader = ({
  lesson,
  onTopicChange,
  onHomeworkDescriptionChange
}: LessonHeaderProps) => {
  const [className, setClassName] = React.useState<string>("class")
  const [originalTopic] = React.useState(lesson.topic);

  React.useEffect(() => {
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      const parsedClasses = JSON.parse(storedClasses)
      const selectedClass: Class = parsedClasses.find((c: { id: number; }) => c.id === lesson.classId)
      setClassName(selectedClass.grade + " " + selectedClass.rank)
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.classInfo}>
          <h2>Класс {className}</h2>
          <p>Дата: {new Date(lesson.date).toLocaleDateString()}</p>
          <input
            type="text"
            value={lesson.topic}
            onChange={(e) => onTopicChange(e.target.value)}
            autoFocus
            className={`${styles.editableInput} ${lesson.topic !== originalTopic ? styles.changed : ''}`}
          />
        </div>
        <div className={styles.homework}>
          <h4>Домашнее задание:</h4>
          <textarea
            value={lesson.homeworkDescription}
            onChange={(e) => onHomeworkDescriptionChange(e.target.value)}
            className={`${styles.editableInput} ${lesson.topic !== originalTopic ? styles.changed : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;