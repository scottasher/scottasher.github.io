import {
  InformationCircleIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../../components/Avatar";
import { useAuth } from "../../hooks/useAuth";
import ActivateBanner from "./ActivateBanner";
import AdminMenu from "./AdminMenu";

const UserProfile = (props) => {
  const { user } = useAuth();

  return (
    <div className="p-5">
      {!user.active && <ActivateBanner />}
      {user.authority === "admin" && <AdminMenu />}
      <div className="p-8 bg-white mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {user.reviewCount || 0}
              </p>
              <p className="text-gray-400">Reviews</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {user.commentCount || 0}
              </p>
              <p className="text-gray-400">Comments</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-md absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {user.avatar ? (
                <Avatar size="xl" src={user.avatar} />
              ) : (
                <UserIcon className="h-24 w-24" />
              )}
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Message
            </button>
            <button className="text-white flex items-center py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Edit <PencilIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          {user.fullName && (
            <>
              <h1 className="text-4xl font-medium text-gray-700">
                {user.fullName},{" "}
                <span className="font-light text-gray-500">{user.age}</span>
              </h1>
              {/* <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>
              <p className="mt-8 text-gray-500">
                Solution Manager - Creative Tim Officer
              </p>
              <p className="mt-2 text-gray-500">University of Computer Science</p> */}
            </>
          )}
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            {user.about
              ? user.about
              : "Consider adding a description about your self so potential employers can see your experience."}
          </p>
          {!user.about && (
            <button className="text-indigo-500 py-2 px-4 font-medium mt-4">
              Add Description
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
