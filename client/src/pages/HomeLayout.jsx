import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <nav>Nav Bar</nav>
      <Outlet />
    </div>
  );
};
export default HomeLayout;
