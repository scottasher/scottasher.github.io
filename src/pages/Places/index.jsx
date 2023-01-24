import classNames from "classnames";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import useQuery from "../../hooks/useQuery";
import { fetchPlaces } from "../../redux/reducers/places/placesSlice";
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const Places = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queries = useQuery();
  const { form, updateForm, setFormInit } = useForm();
  const gridClasses = classNames(
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4"
  );
  const wrapperClasses = classNames("p-5 sm:px-36 lg:py-3 lg:px-36");

  const title = "Noteworthy technology acquisitions 2021";
  const src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png";
  const cardBody =
    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.";

  const cards = [
    {
      src,
      link: "/",
      body: cardBody,
      title,
    },
    {
      src,
      link: "/",
      body: cardBody,
      title,
    },
    {
      src,
      link: "/",
      body: cardBody,
      title,
    },
    {
      src,
      link: "/",
      body: cardBody,
      title,
    },
  ];

  const search = queries.get("search");
  useEffect(() => {
    if (search) {
      setFormInit({ search });
    }
  }, [search]);

  function fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 })),
    //   });
    // }, 1500);
  }

  async function handleSearch() {
    const res = await dispatch(fetchPlaces(form)).unwrap();
    if (res.status === "success") {
      navigate("/places?search=" + form.search);
    } else {
      toast(res.message, {
        toastId: "placesSearch",
        type: res.status,
      });
    }
  }

  return (
    <div>
      <div className="w-full py-14 bg-blue-300">
        <div className="flex items-center max-w-md mx-auto my-auto bg-white p-2 rounded-lg w-full">
          <div className="bg-[#00000070] p-5 md:flex-col md:flex rounded-lg items-center w-full">
            <Input
              id="search"
              value={form.search}
              onChange={updateForm}
              placeholder="Enter Job Title or Keyword"
            />
            <Button
              onClick={handleSearch}
              className="w-full mt-2"
              title="Search"
            />
          </div>
        </div>
      </div>
      <div className={wrapperClasses}>
        <div className="flex justify-end">
          <div>Write a review</div>
        </div>
        <div className={gridClasses}>
          {/* <InfiniteScroll
        dataLength={this.state.items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {this.state.items.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll> */}
        </div>
      </div>
    </div>
  );
};

export default Places;
