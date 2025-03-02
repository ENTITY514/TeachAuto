export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    baseGrade: number;
}

export interface Class {
    id: number;
    grade: number;
    rank: string;
    students: Student[];
}

export interface WorkType {
    id: string;
    name: string;
    maxScore: number;
}

export interface StudentState {
    student: Student;
    present: boolean;
    homework: 0 | 1 | 2;
    works: { [key: string]: number };
    finalGrade: number | null;
}

export interface Lesson {
    id: number;
    date: string;
    classId: number;
    topic: string;
    homeworkDescription: string;
    students: StudentState[];
    workTypes: WorkType[];
}