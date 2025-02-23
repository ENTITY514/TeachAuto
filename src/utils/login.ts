export const getUsers = () => {
  const usersData = localStorage.getItem('users');
  return usersData ? JSON.parse(usersData) : [];
};

export const saveUsers = (users: any) => {
  localStorage.setItem('users', JSON.stringify(users));
};