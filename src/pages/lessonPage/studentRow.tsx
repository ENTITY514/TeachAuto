import styles from './style.module.css';
import { Lesson, StudentState } from '../../interfaces/main.interface';
import { SortStudentOfLessonByPresence, SortStudentsOfLessonByName } from './utils';

interface StudentRowProps {
  student: StudentState;
  index: number;
  lesson: Lesson;
  updateLesson: (updatedLesson: Lesson) => void;
  calculatePreliminaryGrade: (student: StudentState) => number;
}

const StudentRow = ({ student, index, lesson, updateLesson, calculatePreliminaryGrade }: StudentRowProps) => {
  const handlePresenceToggle = () => {
    let updated = {
      ...lesson,
      students: lesson.students.map(s =>
        s.student.id === student.student.id ? { ...s, present: !s.present } : s
      )
    };

    updated = { ...updated, students: SortStudentsOfLessonByName(updated) }
    updated = { ...updated, students: SortStudentOfLessonByPresence(updated) }
    updateLesson(updated);
  };

  const handleHomeworkClick = () => {
    const newHomework = (student.homework + 1) % 3 as 0 | 1 | 2;
    const updated = {
      ...lesson,
      students: lesson.students.map(s =>
        s.student.id === student.student.id ? { ...s, homework: newHomework } : s
      )
    };
    updateLesson(updated);
  };

  const handleWorkScoreChange = (workId: string, value: number) => {
    const updatedWorks = {
      ...student.works,
      [workId]: value
    };
    const updated = {
      ...lesson,
      students: lesson.students.map(s =>
        s.student.id === student.student.id ? { ...s, works: updatedWorks } : s
      )
    };
    updateLesson(updated);
  };

  const handleWorkScoreIncrement = (workId: string, maxScore: number) => {
    const currentValue = student.works[workId];
    const newValue = Math.min(maxScore, currentValue + 1);
    handleWorkScoreChange(workId, newValue);
  };

  const handleWorkScoreDecrement = (workId: string) => {
    const currentValue = student.works[workId];
    const newValue = Math.max(0, currentValue - 1);
    handleWorkScoreChange(workId, newValue);
  };

  const handleFinalGradeChange = (value: number) => {
    const updated = {
      ...lesson,
      students: lesson.students.map(s =>
        s.student.id === student.student.id ? { ...s, finalGrade: value } : s
      )
    };
    updateLesson(updated);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{`${student.student.lastName} ${student.student.firstName}`}</td>
      <td
        className={`${styles.presence} ${student.present ? styles.present : styles.absent}`}
        onClick={handlePresenceToggle}
      >
        {student.present ? '✓' : '✕'}
      </td>
      <td
        className={`${styles.hwCell} ${styles[`hw${student.homework}`]}`}
        onClick={handleHomeworkClick}
      />
      {lesson.workTypes.map(work => (
        <td key={work.id}>
          <div className={styles.scoreControls}>
            <button
              className={styles.controlButton}
              onClick={() => handleWorkScoreDecrement(work.id)}
              disabled={student.works[work.id] <= 0}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              max={work.maxScore}
              value={student.works[work.id]}
              onChange={(e) => handleWorkScoreChange(work.id, Math.min(work.maxScore, Math.max(0, +e.target.value)))}
              className={styles.scoreInput}
            />
            <button
              className={styles.controlButton}
              onClick={() => handleWorkScoreIncrement(work.id, work.maxScore)}
              disabled={student.works[work.id] >= work.maxScore}
            >
              +
            </button>
          </div>
        </td>
      ))}
      <td>{calculatePreliminaryGrade(student)}</td>
      <td>
        <input
          type="number"
          min="1"
          max="10"
          value={student.finalGrade || ''}
          onChange={(e) => handleFinalGradeChange(Math.min(10, Math.max(1, +e.target.value)))}
        />
      </td>
    </tr>
  );
};

export default StudentRow;