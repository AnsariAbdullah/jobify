import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				{/* info */}
				<div className="info">
					<h1>
						Job <span>tracking</span> app
					</h1>
					<p>
						I'm baby aesthetic drinking vinegar franzen williamsburg chambray knausgaard iPhone affogato letterpress. 3 wolf moon sartorial palo santo, pabst pickled big mood farm-to-table sus fashion axe iceland. Sustainable banjo small batch, put a bird on it fam palo santo irony butcher pickled offal cardigan microdosing. Waistcoat lyft locavore 3 wolf moon, hella stumptown wolf cardigan.
					</p>
					<Link to="/register" className="btn btn-hero">
						Login/Register
					</Link>
				</div>

				{/* image */}
				<img src={main} alt="job hunt" className="img main-img" />
			</div>
		</Wrapper>
	);
}

export default Landing;