import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import { fetchPlaces } from "../../redux/reducers/places/placesSlice";

const PageBanner = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, updateForm } = useForm();
  const textShadow = "1px 3px 5px rgb(50 38 38 / 50%)";

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
    <Banner imageClass="bg-banner-home">
      <div className="absolute flex flex-col items-center w-full p-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1
          style={{ textShadow }}
          className="uppercase mb-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white"
        >
          Adventure awaits
        </h1>
        <p
          style={{ textShadow }}
          className="mb-6 text-2xl font-bold text-yellow-300 uppercase"
        >
          Your journey starts here
        </p>
        <div className="bg-[#00000070] p-5 md:flex-col md:flex w-full md:w-96 items-center width-full">
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
    </Banner>
  );
};

export default PageBanner;
