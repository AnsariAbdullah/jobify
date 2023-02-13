import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	Error,
	Register,
	Landing
} from './pages';
import {
	AddJob,
	AllJobs,
	Profile,
	Stats,
	SharedLayout
} from './pages/dashboard';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* setting nested routes */}
				<Route path='/' element={<SharedLayout />}>
					<Route path='add-jobs' element={<AddJob />} />
					<Route path='all-jobs' element={<AllJobs />} />
					<Route path='profile' element={<Profile />} />
					{/* this will show the stats page when user navigates to '/' */}
					<Route index element={<Stats />} />
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
