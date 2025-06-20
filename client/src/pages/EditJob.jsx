import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditJob = () => {
  // we can use useParams hook to get params as shown below
  // const params = useParams();
  // console.log(params);
  // but since we get it in loader we doon't need to use this hook

  const { job } = useLoaderData();
  console.log(job);

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h2 className='form-title'>edit job</h2>
        <div className='form-center'>
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
