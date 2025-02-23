import View from "pages";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const checkAuthStatus = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const lastLoginDate = localStorage.getItem('lastLoginDate');

    if (!isAuthenticated || !lastLoginDate) {
      localStorage.setItem('isAuthenticated', 'false');
      return false;
    }

    const lastLogin = new Date(lastLoginDate);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - lastLogin.getTime()
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference > 5) {
      localStorage.setItem('isAuthenticated', 'false');
      return false;
    }

    return true;
  };

  useEffect(() => {
    checkAuthStatus(); // Проверка при загрузке приложения
  }, []);
  return (
    <BrowserRouter>
      <View />
    </BrowserRouter>
  );
}

export default App;
