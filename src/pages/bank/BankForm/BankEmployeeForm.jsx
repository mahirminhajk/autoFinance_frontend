import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import axiosapi from "../../../helpers/axiosapi";
import { toastSuccess } from "../../../helpers/ToastHelper";

const TABLE_HEAD = ["No", "Name", "Role", "Email", "Phone No", ""];

function BankEmployeeForm({ employees, bankId, setError }) {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(!showModal);

  const [employee, setEmployee] = useState(employees || []);
  const [emp, setEmp] = useState({
    name: "",
    role: "",
    email: "",
    phoneNo: "",
  });
  const [nextIndex, setNextIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateIndex = () => {
      setLoading(true);
      const currentIndex = employee.length + 1;
      setNextIndex(currentIndex);
      setLoading(false);
    };

    updateIndex();
  }, []);

  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const addEmployee = () => {
    setLoading(true);
    setEmployee((prevEmployees) => [
      ...prevEmployees,
      {
        index: nextIndex,
        name: emp.name,
        role: emp.role,
        email: emp.email,
        phoneNo: emp.phoneNo,
      },
    ]);
    handleOpen();
    setIsUpdateAvailable(true);
    //* increment the index
    setNextIndex((prevIndex) => prevIndex + 1);
    //*empty the input fields
    setEmp({ name: "", role: "", email: "", phoneNo: "" });
    setLoading(false);
    toastSuccess("Employee Added Successfully");
  };

  const handleEmployeeDelete = (index) => {
    setLoading(true);
    const newEmployees = [...employee];
    newEmployees.splice(index, 1);
    //* update the index
    newEmployees.forEach((emp, index) => {
      emp.index = index + 1;
    });
    setEmployee(newEmployees);
    setIsUpdateAvailable(true);
    setLoading(false);
    toastSuccess("Employee Deleted Successfully");
  };

  const handleEmployeesUpdate = async () => {
    try {
      setLoading(true);
      await axiosapi.patch(`/bank/${bankId}/employees`, employee);
      setIsUpdateAvailable(false);
      toastSuccess("Employees Updated Successfully");
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
              {TABLE_HEAD.map((item, index) => (
                <th key={index} className="px-4 py-2 font-semibold">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-center font-light lg:text-base md:text-sm text-xs">
            {loading ? (
              <p>Loading.....</p>
            ) : (
              employee &&
              employee.map((emp, index) => {
                const isLast = index === employee.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr
                    key={index}
                    className="text-center lg:text-base md:text-sm text-xs"
                  >
                    <td className={classes}>
                      <Typography color="blue-gray">
                        {emp.index || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray">
                        {emp.name || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray">
                        {emp.role || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray">
                        {emp.email || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray">
                        {emp.phoneNo || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <DeleteIcon
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleEmployeeDelete(index)}
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
              Add Employee <PlusIcon className="ml-1 text-lg" />
            </span>
          </Button>
          <Dialog size="sm" open={open} handler={handleOpen}>
            <DialogHeader>Add Bank Employee</DialogHeader>
            <DialogBody>
              <div className="flex  flex-col gap-4 mb-4">
                <Input
                  type="text"
                  color="blue"
                  label="Name"
                  onChange={(e) => setEmp((prevEmp) => ({ ...prevEmp, name: e.target.value }))}

                />
                <Input
                  type="email"
                  color="blue"
                  label="Email"
                  onChange={(e) => setEmp((prevEmp) => ({ ...prevEmp, email: e.target.value }))}

                />
                <Input
                  type="text"
                  color="blue"
                  label="Phone Number"
                  onChange={(e) => setEmp((prevEmp) => ({ ...prevEmp, phoneNo: e.target.value }))}
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
                  onClick={addEmployee}
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
              Add Employee <PlusIcon className="ml-1 text-lg" />
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
                      <div className="flex  flex-col gap-4 mb-4">
                        <Typography
                          className="font-semibold lg:font-bold text-sm md:text-base lg:text-lg mb-2"
                          color="blue-gray"
                        >
                          Add Employees
                        </Typography>
                        <Input
                          type="text"
                          color="blue"
                          label="Name"
                          onChange={(e) =>
                            setEmp((prevEmp) => ({
                              ...prevEmp,
                              name: e.target.value,
                            }))
                          }
                        />
                        <Select
                          color="blue"
                          label="Role"
                          defaultValue="employee"
                          onChange={(e) => {
                            setEmp((prevEmp) => ({
                              ...prevEmp,
                              role: e,
                            }));
                          }}
                        >
                          <Option value="Manager">Manager</Option>
                          <Option value="Employee">Executive</Option>
                        </Select>
                        <Input
                          type="email"
                          color="blue"
                          label="Email"
                          onChange={(e) =>
                            setEmp((prevEmp) => ({
                              ...prevEmp,
                              email: e.target.value,
                            }))
                          }
                        />

                        {/* Repair */}
                        <Input
                          type="text"
                          color="blue"
                          label="Phone No."
                          defaultValue="91"
                          onChange={(e) =>
                            setEmp((prevEmp) => ({
                              ...prevEmp,
                              phoneNo: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="flex justify-center items-center gap-3">
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
                          onClick={addEmployee}
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
            onClick={handleEmployeesUpdate}
          >
            Update Staffs
          </Button>
        )}
      </div>
    </div>
  );
}

export default BankEmployeeForm;
