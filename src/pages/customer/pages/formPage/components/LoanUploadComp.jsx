import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Radio, Input, CardBody, Card } from "@material-tailwind/react";
import axiosapi from "../../../../../helpers/axiosapi";
import { convertMongoDateToInputDate } from "../../../../../helpers/dateConverter";
import { toastSuccess } from "../../../../../helpers/ToastHelper";

function LoanUploadComp({ cusId }) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [s3ImageName, setS3ImageName] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      irrRate: 0,
      flatRate: "",
      advance: false,
      advanceAmount: 0,
      arrears: "",
      pf: "",
      loanSecurity: "",
      loanNumber: "0",
      loanAmount: 0,
      emiAmount: 0,
      emiTenure: 0,
      emiStartDate: "",
      emiEndDate: "",
      InsuranceEndingDate: "",
      yearCount: 0,
    },
  });
  //* form hook watch
  const advanceRadio = watch("advance");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosapi.get(`/loan/${cusId}`);
        const data = response.data;
        if (data !== false) {
          setIsUpdateMode(true);
          Object.keys(data).forEach((key) => {
            if (key === "chart" && data["chart"] !== "null") {
              setS3ImageName(data[key]);
              setImageUrl(
                `https://leadup-crm.s3.ap-south-1.amazonaws.com/${data[key]}`
              );
            } else if (key === "advance") setValue(key, `${data[key]}`);
            else if (
              key === "emiStartDate" ||
              key === "emiEndDate" ||
              key === "InsuranceEndingDate"
            )
              setValue(key, convertMongoDateToInputDate(data[key]));
            else setValue(key, data[key]);
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    //* img reader
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => setImageUrl(reader.result);
    setImageData(image);
  };

  const handleImageDelete = async () => {
    setImageUrl(null);
    setValue("chart", null);
    if (isUpdateMode && s3ImageName) {
      await axiosapi
        .delete(`/loan/${cusId}/chart`)
        .then(() => setS3ImageName(null))
        .catch((err) => console.log(err));
    }
  };

  const uploadData = async (data) => {
    const formData = new FormData();

    // Append each key-value pair from data to the formData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append the image data if it exists
    if (imageData) {
      formData.append("chart", imageData);
    }

    try {
      if (!isUpdateMode) {
        await axiosapi
          .post(`/loan/${cusId}`, formData)
          .then((res) => {
            //*toast
            toastSuccess("Loan Details Added Successfully");
          })
          .catch((err) => console.log(err));
      } else {
        await axiosapi
          .patch(`/loan/${cusId}`, formData)
          .then((res) => {
            //*toast
            toastSuccess("Loan Details Updated Successfully");
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>
      <form onSubmit={handleSubmit(uploadData)} className="mt-12">
        <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mx-5 mr-72 md:mx-10 lg:mx-10">
          <Input
            variant="static"
            label="IRR Rate"
            type="number"
            {...register("irrRate")}
          />

          <Input
            variant="static"
            label="Flat Rate"
            type="text"
            {...register("irr")}
          />

          <div className="flex items-center">
            <label className="text-sm lg:text-base">Advance:</label>
            <div className="flex lg:text-base md:text-sm text-xs">
              <Radio
                label="Not Received"
                value={false}
                {...register("advance")}
                defaultChecked={!advanceRadio}
              />
              <Radio
                label="Received"
                value={true}
                {...register("advance")}
                defaultChecked={advanceRadio}
              />
            </div>
          </div>

          <Input
            variant="static"
            label="Advance Amount"
            type="number"
            {...register("advanceAmount")}
          />

          <Input
            variant="static"
            label="Arrears"
            type="text"
            {...register("arrears")}
          />

          <Input variant="static" label="PF" type="text" {...register("pf")} />

          <Input
            variant="static"
            label="Loan Security"
            type="text"
            {...register("loanSecurity")}
          />
          {/* updated */}
          <Input
            variant="static"
            label="Loan Number"
            type="text"
            {...register("loanNumber")}
          />

          <Input
            variant="static"
            label="Loan Amount"
            type="number"
            {...register("loanAmount")}
          />

          <Input
            variant="static"
            label="EMI Amount"
            type="number"
            {...register("emiAmount")}
          />

          <Input
            variant="static"
            label="EMI Tenure"
            type="number"
            {...register("emiTenure")}
          />

          <Input
            variant="static"
            label="EMI Start Date"
            type="date"
            {...register("emiStartDate")}
          />

          <Input
            variant="static"
            label="EMI End Date"
            type="date"
            {...register("emiEndDate")}
          />

          <Input
            variant="static"
            label="Insurance End Date"
            type="date"
            {...register("InsuranceEndingDate")}
          />

          <Input
            variant="static"
            label="Year Count"
            type="number"
            {...register("yearCount")}
          />

          {imageUrl ? (
            <Card className="mt-5 w-40">
              <img
                src={imageUrl}
                alt="Uploaded Image"
                className="w-36 m-2 lg:w-40"
              />
              <CardBody className="m-auto">
                <>
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => setShowModal(true)}
                  >
                    Delete
                  </Button>

                  {showModal ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto mx-auto max-w-sm">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                              <h3 className="text-sm md:text-base lg:text-xl font-semibold">
                                Are you sure ?
                              </h3>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end m-auto gap-5 my-3 border-t border-solid border-slate-200 rounded-b">
                              <Button
                                size="sm"
                                className="bg-slate-500 text-black-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleImageDelete}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-50 fixed inset-0 z-40 bg-black" />
                    </>
                  ) : null}
                </>
              </CardBody>
            </Card>
          ) : (
            <Input
              variant="static"
              label="Chart"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
              type="file"
              name="chart"
            />
          )}
        </div>

        <div className="my-5 ml-20 md:justify-center lg:justify-center flex">
          <Button size="sm" color="green" type="submit">
            {isUpdateMode ? "Update" : "Upload"} Loan
          </Button>
        </div>
      </form>
    </>
  );
}

export default LoanUploadComp;
