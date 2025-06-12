import { Link, useNavigate } from 'react-router-dom';
import error404 from '../assets/images/404.svg';
import { ButtonOutlinePrimary } from '../Components/Buttons';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-dvh flex flex-col items-center justify-center text-center gap-8">
      <img src={ error404 } className="w-90" />
      <h2 className="text-4xl font-bold">Error404 - Page Not Found</h2>
      <ButtonOutlinePrimary onClick={ () => navigate("/") }>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Go Home
      </ButtonOutlinePrimary>
    </div>
  );
}

export default Error404;
