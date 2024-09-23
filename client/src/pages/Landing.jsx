import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>tracking</span> App
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
            sint, ipsam exercitationem consequatur laudantium molestiae eius
            dignissimos! Ut, aliquam laborum rerum numquam impedit voluptate,
            alias doloribus temporibus itaque omnis illum!
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login / Demo user
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};
export default Landing;
