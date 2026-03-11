import { Typography } from "@material-tailwind/react";

function DealerCarInformation() {
  return (
    <div className="h-auto">
      {/* dealer details */}
      <div>
        <div className=" bg-blue-400 p-1 h-10 w-120">
          <Typography variant="h1" className="ml-4 text-lg">
            Dealer or Brocker Details
          </Typography>
        </div>
        <div className="grid grid-cols-2">
          {/* dealer detail titles */}
          <div className="bg-gray-100 h-40 ">
            <div className="ml-4 p-4 space-y-1">
              <Typography className="font-base" variant="h6">
                Upload By:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Upload Date
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                User Name:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Updated Date:
              </Typography>
            </div>
          </div>
          {/* dealer fetch details */}
          <div className="bg-gray-100 h-40">
            <div className="ml-4 p-4 space-y-1">
              <Typography className="font-bold" variant="h6">
                KPS
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                15/5/23
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                Mahir
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                15/5/23
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* car details */}
      <div>
        <div className=" bg-blue-400 p-1 h-10">
          <Typography variant="h1" className="ml-4 text-lg">
            Car Details
          </Typography>
        </div>
        <div className="grid grid-cols-2">
          {/* car detail titles */}
          <div className="bg-gray-100 h-70 ">
            <div className="ml-4 p-4 space-y-1">
              <Typography className="font-base" variant="h6">
                Price:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Transmission:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Registered in:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Car Modal Name:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Location:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Kilometre:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Ownership:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Engine capacity:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Fuel:
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-base" variant="h6">
                Registration
              </Typography>
            </div>
          </div>
          {/*car fetch details */}
          <div className="bg-gray-100 h-70 ">
            <div className="ml-4 p-4 space-y-1">
              <Typography className="font-bold" variant="h6">
                1500000
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                Automatic
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                Tirur
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                New
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                Malappuram
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                1500 KM
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                Humaid
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                3000cc
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                Gas
              </Typography>
              <hr className="border border-gray-200" />
              <Typography className="font-bold" variant="h6">
                KL 55 AZ 1111
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealerCarInformation;
