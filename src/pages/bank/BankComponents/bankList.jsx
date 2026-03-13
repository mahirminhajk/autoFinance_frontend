import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { BsBank2 } from "react-icons/bs";

export const BankList = ({ banks }) => {
  const navigate = useNavigate();

  return (
    <>
      {banks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center mb-3">
            <BsBank2 className="text-yellow-500 text-3xl" />
          </div>
          <p className="text-gray-700 font-bold text-base">No Banks Found</p>
          <p className="text-gray-400 text-sm mt-1">
            No banks have been added yet. Add a bank to get started.
          </p>
        </div>
      ) : (
        <div className=" border-gray-200 py-2 md:py-3 lg:py-5 px-2 md:px-3 lg:px-5 gap-5 grid grid-cols grid-cols-{n} md:grid-cols-2 lg:grid-cols-4  gap-y-3 gap-x-3 ">
          {/* Card-Start */}

          {banks.map((bank) => (
            <button
              key={bank._id}
              onClick={() => navigate(`/bank/${bank._id}`)}
              className=" transform transition duration-500 hover:scale-110"
            >
              <Card className=" mx-auto lg:mx-5 my-3 w-64 md:w-64 lg:w-64 h-52 md:h-52 lg:h-52  relative items-center flex flex-col ">
                <CardHeader
                  // color="blue-gray"
                  className="relative w-50 h-32 my-1 flex items-center mx-6 shadow-lg"
                >
                  {bank.logo ? (
                    <img
                      src={bank.logo}
                      alt="bank logo"
                      className="h-36 lg:h-auto w-60 lg:w-auto rounded-lg bg-cover bg-center"
                    />
                  ) : (
                    <p>No Logo</p>
                  )}
                </CardHeader>
                <CardBody className="p-3">
                  <Typography
                    color="blue-gray"
                    className="text-base md:text-base lg:text-lg font-bold"
                  >
                    {bank.bankName}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="text-sm md:text-base lg:text-lg font-medium"
                  >
                    {bank.branch}
                  </Typography>
                </CardBody>
              </Card>
            </button>
          ))}

          {/* Card-End */}
        </div>
      )}
    </>
  );
};