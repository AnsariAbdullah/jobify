import { useState, createContext, useContext } from 'react';

export const DashboardContext = createContext();

const user = { name: 'john' };

const [showSidebar, setShowSidebar] = useState(false);
const [isDarkTheme, setIsDarkTheme] = useState(false);

const toggleDarkTheme = () => {
  console.log('toggle dark theme');
};

const toggleSidebar = () => {
  setShowSidebar(!showSidebar);
};

const logoutUser = async () => {
  console.log('logout user');
};

const Dashboard = ({ children }) => {
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default Dashboard;
