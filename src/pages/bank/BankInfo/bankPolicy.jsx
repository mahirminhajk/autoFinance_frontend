import { Typography } from "@material-tailwind/react";

function BankPolicy({ branchPolicy, mandatoryDoc }) {
  return (
    <>
      <Typography className="my-2 text-xl font-bold text-left text-black-700 ml-2 mt-3 ">
        Branch Policies
      </Typography>
      <div className="bg-blue-100 w-auto h-auto rounded-md p-5 mx-10">
        <p className="font-semibold text-xs md:text-sm lg:text-base">
          {branchPolicy || "N/A"}
        </p>
      </div>
      <Typography className="my-2 text-xl font-bold text-left text-black-700 ml-2 ">
        Mandatory Documents
      </Typography>
      <div className="bg-orange-100 w-auto h-auto rounded-md p-5 mx-10">
        <p className="font-semibold text-xs md:text-sm lg:text-base">
          {mandatoryDoc || "N/A"}
        </p>
      </div>
    </>
  );
}

export default BankPolicy;
