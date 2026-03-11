import { Fragment, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import axiosapi from "../../../../helpers/axiosapi";
import { toastSuccess } from "../../../../helpers/ToastHelper";

const TABLE_HEAD = ["Name", "Phone No", ""];

function StaffsForm({ tableRows, setError, dealerId }) {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(!showModal);

  const [staffs, setStaffs] = useState(tableRows || []);
  const [staff, setStaff] = useState({ name: "", phoneNo: "" });

  const [loading, setLoading] = useState(false);

  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const handleStaffDelete = (index) => {
    const newStaffs = [...staffs];
    newStaffs.splice(index, 1);
    setStaffs(newStaffs);
    setIsUpdateAvailable(true);
    toastSuccess("Staff deleted successfully");
  };

  const addStaff = () => {
    setStaffs((prevStaffs) => [
      ...prevStaffs,
      { name: staff.name, phoneNo: staff.phoneNo },
    ]);
    handleOpen();
    setIsUpdateAvailable(true);
    //*empty the input fields
    setStaff({ name: "", phoneNo: "" });
    toastSuccess("Staff added successfully");
  };

  const handleStaffsUpdate = async () => {
    setLoading(true);
    try {
      await axiosapi.patch(`/dealer/${dealerId}/staffs`, staffs);
      setIsUpdateAvailable(false);
      toastSuccess("Staffs updated successfully");
    } catch (err) {
      setError(err.response.data || err);
    }
    setLoading(false);
  };

  return (
    <div className="mx-20 my-5 m-auto">
      <Card className="h-auto w-auto">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase lg:text-base md:text-sm text-xs ">
              {TABLE_HEAD.map((head) => (
                <th key={head} className="px-4 py-2 font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-center font-light lg:text-base md:text-sm text-xs">
            {loading ? (
              "Loading.."
            ) : (
              staffs &&
              staffs.map(({ name, phoneNo }, index) => {
                const isLast = index === staffs.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={index}
                    className="text-center lg:text-base md:text-sm text-xs"
                  >
                    <td className={classes}>
                      <Typography color="blue-gray">{name}</Typography>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray">{phoneNo}</Typography>
                    </td>
                    <td className={classes}>
                      <DeleteIcon
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleStaffDelete(index)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Card>

      <div className=" flex justify-center mt-9 gap-6">
        {/* <Fragment>
          <Button color="orange" disabled={loading} onClick={handleOpen}>
            <span className="flex justify-center items-center">
              Add Staff <PlusIcon className="ml-1 text-lg" />
            </span>
          </Button>
          <Dialog size="sm" open={open} handler={handleOpen}>
            <DialogHeader>Add Staff</DialogHeader>
            <DialogBody>
              <div className="flex flex-col gap-4 mb-4">
                <Input
                  type="text"
                  color="blue"
                  label="Name"
                  onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                />
                <Input
                  type="text"
                  color="blue"
                  label="Phone No"
                  onChange={(e) =>
                    setStaff({ ...staff, phoneNo: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <Button
                  onClick={handleOpen}
                  className="bg-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={addStaff}
                  className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Add Staff
                </Button>
              </div>
            </DialogBody>
          </Dialog>
        </Fragment> */}

        <>
          <Button
            size="sm"
            color="orange"
            // onClick={handleOpen}
            disabled={loading}
            onClick={() => setShowModal(true)}
          >
            <span className="flex justify-center items-center">
              Add Staff <PlusIcon className="ml-1 text-lg" />
            </span>
          </Button>
          {showModal ? (
            <>
              <div
                className="pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                onClick={(e) => {
                  if (e.target.className === "pop") handleOpen();
                }}
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*body*/}
                    <div className="flex flex-col p-5 justify-center border-b border-solid border-slate-200 rounded-t">
                      <div className="flex flex-col gap-4 mb-4">
                        <Typography
                          className="font-semibold lg:font-bold text-sm md:text-base lg:text-lg mb-2"
                          color="blue-gray"
                        >
                          Add staff
                        </Typography>
                        <Input
                          type="text"
                          color="blue"
                          label="Name"
                          onChange={(e) =>
                            setStaff({ ...staff, name: e.target.value })
                          }
                        />
                        <Input
                          type="text"
                          color="blue"
                          label="Phone No."
                          defaultValue="91"
                          onChange={(e) =>
                            setStaff({ ...staff, phoneNo: e.target.value })
                          }
                        />
                      </div>
                      <div className=" flex justify-center gap-6 my-5">
                        <Button
                          variant="text"
                          size="sm"
                          color="blue-gray"
                          // onClick={handleOpen}
                          onClick={() => handleOpen()}
                          className="hover:bg-red-300"
                        >
                          <span>Close</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="gradient"
                          color="green"
                          onClick={addStaff}
                        >
                          Add Staff
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-50 fixed inset-0 z-40 bg-black" />
            </>
          ) : null}
        </>

        {isUpdateAvailable && (
          <Button
            size="sm"
            color="green"
            disabled={loading}
            onClick={handleStaffsUpdate}
          >
            Update Staffs
          </Button>
        )}
      </div>
    </div>
  );
}

export default StaffsForm;
