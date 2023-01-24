import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Carousel from "../../../components/Carousel";
import {
  fetchPlace,
  resetPlace,
} from "../../../redux/reducers/places/placeSlice";

const PlaceShow = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const place = useSelector((state) => state.place);

  useEffect(() => {
    if (place.status === "idle") {
      dispatch(fetchPlace({ id }));
    }
  }, [place.status]);

  useLayoutEffect(() => {
    return () => dispatch(resetPlace());
  }, []);

  if (!place.data.name) return "Loading";

  const description =
    place.data?.description &&
    convertFromRaw(JSON.parse(place.data?.description));
  const editorState = EditorState.createWithContent(description);

  return (
    <div>
      {place.data?.images.length > 0 && <Carousel />}
      <div className="prose p-3">
        <h2 className="text-4xl">{place.data.name}</h2>
        <Editor editorState={editorState} readOnly={true} />
      </div>
    </div>
  );
};

export default PlaceShow;
