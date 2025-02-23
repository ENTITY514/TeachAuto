import { Link } from 'react-router-dom';
import style from "./style.module.css"

export default function Navbar() {
  return (
    <nav className={style.navbar}>
      <ul className={style.navList}>
        <li><Link to="/" className={style.navLink}>Главная</Link></li>
        <li><Link to="/login" className={style.navLink}>Логин</Link></li>
        <li><Link to="/upload-students" className={style.navLink}>Загрузка учеников</Link></li>
        <li><Link to="/all-lessons" className={style.navLink}>Все уроки</Link></li>
      </ul>
    </nav>
  );
}