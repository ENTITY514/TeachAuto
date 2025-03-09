import { StudentState, Lesson } from "interfaces/main.interface";


export function calculatePreliminaryGrade(student: StudentState, lesson: Lesson): number {
    const homeworkScore = student.homework;
    const workScores = Object.values(student.works).reduce((a, b) => a + b, 0);
    const totalScore = homeworkScore + workScores;
    const maxPossible = 2 + lesson.workTypes.reduce((a, b) => a + b.maxScore, 0);
    return Math.round((totalScore / maxPossible) * 10);
}

export function SortStudentOfLessonByPresence(lesson: Lesson) {
    return lesson.students.sort((a, b) => Number(b.present) - Number(a.present));
}

export function SortStudentsOfLessonByName(lesson: Lesson) {
    return lesson.students.sort((a, b) => {
        const nameA = `${a.student.lastName} ${a.student.firstName}`;
        const nameB = `${b.student.lastName} ${b.student.firstName}`;
        return nameA.localeCompare(nameB);
    });
}