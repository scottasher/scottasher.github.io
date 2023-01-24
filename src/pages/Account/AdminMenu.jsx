import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Dropdown from "../../components/Dropdown";

const AdminMenu = (props) => {
  const actions = [
    { title: "Create Place", path: "/places/create" },
    { title: "Write a review", onClick: (e) => console.log(e) },
  ];

  const dropTrigger = (
    <div className="font-fold text-md flex items-center cursor-pointer">
      Actions
      <ChevronDownIcon className="w-4 h-4" />
    </div>
  );

  return (
    <div className="bg-gray-100 p-3 rounded-lg flex items center justify-between">
      <div>
        <ChevronLeftIcon className="h-5 w-5" />
      </div>
      <div>
        <Dropdown trigger={dropTrigger} data={actions} />
      </div>
    </div>
  );
};

export default AdminMenu;
