import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import { fetchPlaces } from "../../redux/reducers/places/placesSlice";

const Featured = (props) => {
  const dispatch = useDispatch();

  const places = useSelector((state) => state.places);
  useEffect(() => {
    if (places.status === "idle") {
      dispatch(fetchPlaces({ sort: "-dateCreated", limit: 10 }));
    }
  });

  const wrapperClasses = classNames(
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4",
    "p-5 sm:px-36 md:p-10 lg:py-17 lg:px-36"
  );

  return (
    <div className={wrapperClasses}>
      {places.data.map((item, i) => {
        const data = { link: "/places/" + item._id, title: item.name };

        return <Card key={i} {...data} />;
      })}
    </div>
  );
};

export default Featured;
