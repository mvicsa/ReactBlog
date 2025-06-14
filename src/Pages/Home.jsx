import { Link } from "react-router-dom";
import { ButtonPrimary } from "../Components/Buttons";
import BlogItem from "../Components/BlogItem";
import numberToArray from "../utils/number";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Home = () => {
  const {
    posts,
    hasFetchedPosts,
    searchInput,
    searchValue,
    handleSearch,
    currentPage,
    handlePagination,
    handleDeletePost
  } = useOutletContext();

  const { isLoggedIn } = useAuth();

  let filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const itemsPerPage = 3;
  const noOfPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const pages = numberToArray(noOfPages);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  filteredPosts = filteredPosts.slice(start, end);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white grow px-4">
      <div className="flex flex-col items-center justify-center text-center gap-3 py-[70px] max-w-[650px] mx-auto">
        <div className="bg-blue-100 text-blue-600 px-5 py-1 rounded-full mb-3">Blog</div>
        <h2 className="text-4xl font-bold leading-13 px-4">Discover Our Latest Blog Posts</h2>
        <p className="text-gray-600 dark:text-gray-300 text-xl leading-8 px-4">
          Explore the latest thought pieces, industry news, and helpful guides curated just for you.
        </p>
        <form onSubmit={ handleSearch } className="flex w-full mt-4 gap-2">
          <input
            ref={ searchInput }
            placeholder="Type to Search..."
            className="border outline-0 rounded-xl border-gray-200 focus:border-blue-600 dark:border-gray-700 dark:focus:border-blue-600 transition placeholder:text-gray-500 py-2 px-3 grow min-w-0"
          />
          <ButtonPrimary>Search</ButtonPrimary>
        </form>
      </div>

      <div className="flex flex-col gap-4 pb-[40px] max-w-[800px] mx-auto">
        {filteredPosts.map((post) => (
          <BlogItem
            key={ post._id }
            id={ post._id }
            title={ post.title }
            desc={ post.desc }
            image={ post.image }
            createdAt={ post.createdAt }
            createdBy={ post.createdBy }
            handleDeletePost={ handleDeletePost }
          />
        ))}

        {hasFetchedPosts && !posts.length && (
          <p className="text-center text-xl font-medium">No Posts Yet!</p>
        )}

        {!filteredPosts.length && searchValue && posts.length > 0 && (
          <div className="flex items-center justify-center text-center">
            <span className="bg-red-200 text-red-600 border-1 border-red-300 px-6 py-5 rounded-xl text-center w-full">
              No results found for "{searchValue}". Try checking your spelling or using different keywords.
            </span>
          </div>
        )}

        {pages.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {pages.map((page) => (
              <button
                onClick={() => handlePagination(page)}
                className={`px-4 py-2 rounded-xl border-1 text-blue-600 border-blue-600 cursor-pointer ${
                  currentPage === page && "bg-blue-600 text-white"
                }`}
                key={page}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        { isLoggedIn && (
          <Link
            to="/add"
            className="flex items-center justify-center border-1 border-blue-600  rounded-full cursor-pointer w-[50px] h-[50px] transition hover:scale-105 bg-blue-600 text-white fixed bottom-5 right-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
