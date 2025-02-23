import { useState } from "react";
import style from "./style.module.css"
import CryptoJS from 'crypto-js';
import { getUsers, saveUsers } from "utils/login";


export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (isLogin) {
        // Логика логина
        const users = getUsers();
        const user = users.find((u: { username: string; }) => u.username === username);
  
        if (!user) {
          alert('Пользователь не найден');
          return;
        }
  
        const decryptedPassword = CryptoJS.AES.decrypt(user.encryptedPassword, 'secret-key').toString(CryptoJS.enc.Utf8);
  
        if (decryptedPassword !== password) {
          alert('Неверный пароль');
          return;
        }
  
        // Успешный логин: сохраняем информацию о входе
        const loginDate = new Date().toISOString();
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('lastLoginDate', loginDate);
        console.log('Успешный вход, дата:', loginDate);
      } else {
        // Логика регистрации
        const users = getUsers();
        if (users.some((u: { username: string; }) => u.username === username)) {
          alert('Пользователь с таким именем уже существует');
          return;
        }
  
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();
        users.push({ username, encryptedPassword });
        saveUsers(users);
        console.log('Пользователь зарегистрирован');
      }
  
      // Очистка полей после успешного завершения
      setUsername('');
      setPassword('');
    };
  
    return (
      <div className={style.container}>
        <div className={style.formWrapper}>
          <div className={style.tabs}>
            <button
              className={`${style.tab} ${isLogin ? style.active : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Логин
            </button>
            <button
              className={`${style.tab} ${!isLogin ? style.active : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Регистрация
            </button>
          </div>
          <div className={style.formContainer}>
            <div
              className={style.formSlider}
              style={{
                transform: isLogin ? 'translateX(0)' : 'translateX(-50%)',
              }}
            >
              <form
                onSubmit={handleSubmit}
                className={`${style.form} ${style.login}`}
              >
                <input
                  type="text"
                  placeholder="Имя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Войти</button>
              </form>
              <form
                onSubmit={handleSubmit}
                className={`${style.form} ${style.register}`}
              >
                <input
                  type="text"
                  placeholder="Имя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Зарегистрироваться</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }