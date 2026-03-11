import { Input } from "@material-tailwind/react";

function InputComponent(props) {
  return (
    <div className="mt-6 ">
      <div className=" mr-72 md:mx-10 lg:mx-10">
        <Input label={props.fieldtitle} className="border-2  " />
      </div>
    </div>
  );
}

export default InputComponent;
