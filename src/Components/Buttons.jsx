export const ButtonPrimary = ({ children, onClick, className }) => {
  return (
    <button onClick={ onClick } className={ `flex justify-center items-center gap-2 py-2 px-5 border-1 border-blue-600 rounded-xl cursor-pointer bg-blue-600 text-white transition hover:-translate-y-0.5 hover:bg-blue-800 hover:border-blue-800 hover:text-white ${className}` }>
      { children }
    </button>
  );
}

export const ButtonOutlinePrimary = ({ children, onClick, className }) => {
  return (
    <button onClick={ onClick } className={ `flex justify-center items-center gap-2 py-2 px-5 border-1 border-blue-600 rounded-xl cursor-pointer text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white ${className}` }>
      { children }
    </button>
  );
}
