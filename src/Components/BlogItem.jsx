import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const BlogItem = (props) => {
  const { id, title, desc, image, createdAt, createdBy, handleDeletePost } = props;
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 border-1 border-gray-100 dark:border-gray-700 rounded-xl p-3">
      <img className="h-[400px] w-full object-cover rounded-xl" src={ image } alt="" />
      <div className="p-4">
        <div className="flex items-center flex-wrap gap-3 text-gray-500 dark:text-gray-300 mb-3 text-sm">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>{ (new Date(createdAt)).toLocaleString() }</span>
          </div>
          |
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span>{ createdBy.name } </span>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 block transition">
          { title }
        </h3>
        <p className="text-gray-500 dark:text-gray-300 leading-7">
          { desc }
        </p>
        <div className="flex flex-wrap justify-between gap-2">
          {
            isLoggedIn && user && user._id === createdBy._id && <div className="flex flex-wrap gap-2 mt-4">
                <Link to={ `/edit/${id}` } className="flex items-center justify-center border-1 border-green-600 text-green-600 rounded-full cursor-pointer w-[42px] h-[42px] transition hover:scale-95 hover:bg-green-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </Link>
              <button onClick={ () => handleDeletePost(id) } className="flex items-center justify-center border-1 border-red-600 text-red-600 rounded-full cursor-pointer w-[42px] h-[42px] transition hover:scale-95 hover:bg-red-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
