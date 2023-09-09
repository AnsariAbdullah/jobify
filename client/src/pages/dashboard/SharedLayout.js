import { Outlet } from "react-router-dom";
import Wrapper from '../../assets/wrappers/SharedLayout';
import {
	BigSidebar,
	SmallSidebar,
	Navbar
} from '../../components';

const SharedLayout = () => {
	return (
		<Wrapper>
			<main className="dashboard">
				<SmallSidebar />
				<BigSidebar />
				<div>
					<Navbar />
					<div className="dashboard-page">
						<Outlet />
					</div>
				</div>
			</main>
			{/* <nav>
				<Link to="add-jobs">Add job</Link>
				<Link to="all-jobs">All jobs</Link>
			</nav> */}
		</Wrapper>
	);
}

export default SharedLayout;