import Input from "../../../components/Input";
import RichTextEditor from "../../../components/RichTextEditor";

const CreateReview = (props) => {
  return (
    <div className="container mx-auto">
      <div className="text-4xl font-bold uppercase mb-4">Create Review</div>
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input label="Name" />
          </div>
          <div>
            <Input label="Location" />
          </div>
        </div>
      </div>
      <RichTextEditor />
    </div>
  );
};

export default CreateReview;
