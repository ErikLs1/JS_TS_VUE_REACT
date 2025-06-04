export interface EnrollmentForTeacherDto {
    enrollmentId: string;
    semesterSubjectId: string;
    subjectName: string;
    studentId: string;
    studentName: string;
    studentEmail: string;
    enrollmentDate: string;
    status:  string;
    studentAccepted: boolean;
}