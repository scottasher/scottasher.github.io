import { convertToRaw } from "draft-js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import RichTextEditor from "../../../components/RichTextEditor";
import Select from "../../../components/Select";
import {
  cellServiceOptions,
  housingOptions,
  internetAccessOptions,
  mealOptions,
  petFriendlyOptions,
} from "../../../constants/select";
import useForm from "../../../hooks/useForm";
import { addNewPlace } from "../../../redux/reducers/places/placeSlice";

// Need to do
// logo: String,
// images: String or Media

const CreatePlace = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, updateForm } = useForm();

  async function handleSubmit() {
    const description = convertToRaw(form.description.getCurrentContent());
    const data = {
      ...form,
      description: JSON.stringify(description),
    };
    const res = await dispatch(addNewPlace({ data })).unwrap();

    if (res.status === "success") {
      navigate("/places/" + res.data._id);
      toast(res.message, {
        toastId: "createPlace",
        type: res.status,
      });
    }
  }

  return (
    <div className="bg-gray-50 p-3">
      <div className="relative w-full px-6 py-12 bg-white shadow-sm shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
        <div className="text-4xl font-bold uppercase mb-4">Create Place</div>
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Input
                id="name"
                value={form.name}
                onChange={updateForm}
                placeholder="Name"
                label="Name"
              />
            </div>
            <div>
              <Input
                id="address"
                value={form.address}
                onChange={updateForm}
                placeholder="Address"
                label="Address"
              />
            </div>
            <div>
              <Input
                id="email"
                value={form.email}
                onChange={updateForm}
                placeholder="Email"
                label="Email"
              />
            </div>
            <div>
              <Input
                id="phone"
                value={form.phone}
                onChange={updateForm}
                placeholder="Phone"
                label="Phone"
              />
            </div>
            <div>
              <Input
                id="website"
                value={form.website}
                onChange={updateForm}
                placeholder="Website"
                label="Website"
              />
            </div>
            <div>
              <Input
                id="season"
                value={form.season}
                onChange={updateForm}
                placeholder="Season"
                label="Season"
              />
            </div>
            <div>
              <Input
                id="staffSize"
                value={form.staffSize}
                onChange={updateForm}
                placeholder="Staff Size"
                type="number"
                label="Staff Size"
              />
            </div>
            <div>
              <Select
                id="petFriendly"
                value={form.petFriendly}
                onChange={updateForm}
                options={petFriendlyOptions}
                placeholder="Pet Friendly"
                label="Pet Friendly"
              />
            </div>
            <div>
              <Select
                id="housing"
                value={form.housing}
                onChange={updateForm}
                options={housingOptions}
                placeholder="Housing"
                label="Housing"
              />
            </div>
            <div>
              <Select
                id="meals"
                value={form.meals}
                onChange={updateForm}
                options={mealOptions}
                placeholder="Meal"
                label="Meal"
              />
            </div>
            <div>
              <Select
                id="cellService"
                value={form.cellService}
                onChange={updateForm}
                options={cellServiceOptions}
                placeholder="Cell Service"
                label="Cell Service"
              />
            </div>
            <div>
              <Select
                id="internetAccess"
                value={form.internetAccess}
                onChange={updateForm}
                options={internetAccessOptions}
                placeholder="Internet Access"
                label="Internet Access"
              />
            </div>
          </div>
        </div>
        <RichTextEditor
          id="description"
          value={form.description}
          onChange={updateForm}
          label="Description"
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => navigate("/places")}
            className="mr-3"
            type="alternative"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlace;
