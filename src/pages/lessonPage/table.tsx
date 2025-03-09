import styles from './style.module.css';
import { Lesson, StudentState } from '../../interfaces/main.interface';
import StudentRow from './studentRow';

interface StudentTableProps {
    lesson: Lesson;
    updateLesson: (updatedLesson: Lesson) => void;
    calculatePreliminaryGrade: (student: StudentState) => number;
}

const StudentTable = ({ lesson, updateLesson, calculatePreliminaryGrade }: StudentTableProps) => {
    return (
        <div className={styles.container}>
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
                        <StudentRow
                            key={student.student.id}
                            student={student}
                            index={index}
                            lesson={lesson}
                            updateLesson={updateLesson}
                            calculatePreliminaryGrade={calculatePreliminaryGrade}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;