import { Typography } from "@material-tailwind/react";

export const DealerStaffs = ({ staffs }) => {
  return (
    <>
      {/* staffs */}
      <Typography className="text-sm lg:text-base font-semibold text-left text-black-700 mt-5 ml-2 ">
        Staffs
      </Typography>
      <div className="w-auto h-auto ">
        {staffs.map((staff, i) => (
          <div key={i}>
            <div className="staffs lg:flex gap-2 ">
              <Typography className="name flex-1 py-1 mx-5 lg:mx-10 px-3 mb-2 bg-gray-100  rounded-lg shadow-lg text-black-700 text-xs md:text-sm lg:text-base mt-4 ">
                Name: <span className="font-bold">{staff.name}</span>
              </Typography>
              <Typography className="name flex-1 py-1 mx-5 lg:mx-10 px-3 mb-2 bg-gray-100  rounded-lg shadow-lg text-black-700 text-xs md:text-sm lg:text-base mt-4">
                Phone No.: <span className="font-bold">{staff.phoneNo}</span>
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
