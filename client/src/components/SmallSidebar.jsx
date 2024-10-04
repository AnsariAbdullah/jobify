import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            {links.map((links) => {
              const { text, path, icon } = links;
              return (
                <NavLink
                  to={path}
                  key={text}
                  className='nav-link'
                  onClick={toggleSidebar}
                  end
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
