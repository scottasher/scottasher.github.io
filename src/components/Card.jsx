import { Link } from "react-router-dom";

const Card = ({ src, link, title, body, layout }) => {
  return layout ? (
    layout()
  ) : (
    <div className="w-full bg-white rounded border border-gray-200 shadow-md">
      {src && (
        <Link to={link}>
          <img className="rounded-t" src={src} alt={src} />
        </Link>
      )}
      <div className="p-5">
        <Link to={link}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">{body}</p>
        <Link
          to={link}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
