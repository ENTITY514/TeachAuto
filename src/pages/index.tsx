import { Routes, Route } from "react-router-dom";
import style from "./style.module.css"
import Footer from "modules/footer";
import Header from "modules/header"; import LessonPage from "./lessonPage";
import LoginPage from "./login";
import UploadStudentsPage from "./uploadStudents";
import MainPage from "./main";
import AllLessonsPage from "./allLessonsPage";


export default function View() {
    return (
        <div className={style.container}>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/upload-students" element={<UploadStudentsPage />} />
                <Route path="/lesson/:id" element={<LessonPage />} />
                <Route path="/all-lessons" element={<AllLessonsPage />} />
            </Routes>
            <Footer />
        </div>
    );
}