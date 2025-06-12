import { useLoading } from "../Contexts/LoadingContext";

const Loader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center">
      <div className="loader border-4 border-t-blue-500 border-white rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loader;