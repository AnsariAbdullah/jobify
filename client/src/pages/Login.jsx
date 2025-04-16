import {
  Form,
  redirect,
  useNavigation,
  Link,
  useActionData,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const actions = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (data.password.length < 8) {
    errors.msg = 'Password too short';
    return errors;
  }
  try {
    await customFetch.post('auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    // toast.error(error?.response?.data?.msg);
    errors.msg = error?.response?.data?.msg;
    return errors;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const errors = useActionData();

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <FormRow type='email' name='email' defaultValue='john@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <button type='submit' className='btn btn-block'>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button type='button' className='btn btn-block'>
          Explore the App
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
