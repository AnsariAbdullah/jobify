import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
	const { numOfPages, page } = useAppContext();

	const prevPage = () => {
		console.log('prev page');
	}

	const nextPage = () => {
		console.log('next page');
	}

	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1;
	})

	return (
		<Wrapper>
			<button className="prev-btn" onClick={prevPage}>
				<HiChevronDoubleLeft />
				prev
			</button>

			<div className="btn-container">
				{pages.map((pageNumber) =>
					<button
						type="button"
						className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
						key={pageNumber}
						onClick={() => console.log('change page number')}
					>
						{pageNumber}
					</button>
				)}
			</div>

			<button className="next-btn" onClick={nextPage}>
				<HiChevronDoubleRight />
				next
			</button>

		</Wrapper>
	);
}

export default PageBtnContainer;