import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import FormSubHeading from "../../../components/formComponents/FormSubHeading";
import { IoMdPersonAdd } from "react-icons/io";

function DealerFormStaff() {
  const [inputFields, setInputFields] = useState([{ name: "", pno: "" }]);
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const addFields = () => {
    let newfield = { name: "", pno: "" };

    setInputFields([...inputFields, newfield]);
  };
  const submit = (e) => {
    e.preventDefault();
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <>
      {/* dealer-staffs */}
      <div className="mt-3 rounded-lg md:w-full ">
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
          <>
            <FormSubHeading subheading="Staff Details" />
          </>

          <div className="my-5 mx-auto">
            <Button
              type="button"
              onClick={addFields}
              className="px-4 py-4 text-white text-sm bg-blue-600 hover:bg-purple-800 border-l font-semibold rounded-full shadow-lg"
            >
              <IoMdPersonAdd className="text-xl " />
            </Button>
          </div>
        </div>
        <div className="h-60 overflow-y-scroll">
          <form action="" onSubmit={submit} className=" grid justify-center">
            {inputFields.map((input, index) => {
              return (
                <div key={index}>
                  <div className="w-80 my-5 mx-5">
                    <Input
                      label="Employee Name"
                      type="text"
                      value={input.name}
                      onChange={(event) => handleFormChange(index, event)}
                    />
                  </div>

                  <div className="w-80 my-5 mx-5">
                    <Input
                      label="Employee Pno."
                      type="tel"
                      value={input.pno}
                      onChange={(event) => handleFormChange(index, event)}
                    />
                  </div>

                  <div className="place-self-end my-7">
                    <Button
                      onClick={() => removeFields(index)}
                      className=" px-4 py-2 mx-6 mt-1 text-white text-sm bg-red-600 hover:bg-purple-800 border-l font-semibold rounded-full shadow-lg"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </div>
      {/* dealer-staffs-end*/}
    </>
  );
}

export default DealerFormStaff;
