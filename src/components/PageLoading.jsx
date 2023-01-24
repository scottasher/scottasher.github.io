import Spinner from "./Spinner";

const PageLoading = (props) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-300 opacity-75 flex flex-col items-center justify-center">
      <Spinner size="2xl" />
    </div>
  );
};

export default PageLoading;
