import { Typography } from "@material-tailwind/react";
import Sidebar from "../../../../components/sidebar/Sidebar";
// import DealerCarInfoCarImages from "./dealerCarInfoCarImages";
import DealerCarInformation from "./dealerCarInformation";

function DealerCarInfo() {
  return (
    <Sidebar>
      <>
        <Typography
          variant="h1"
          className="text-xl font-bold text-left text-black-700 mt-5 ml-2 "
        >
          Cars / Car Info
        </Typography>

        <div className=" mx-28 w-auto h-auto justify-center mt-10">
          <Typography className=" text-xl font-bold text-left text-black-700 mt-5 ml-2 ">
            Car Info
          </Typography>
          <div className="grid grid-cols-2 gap-3 h-auto">
            {/* car photo */}
            <>
              {/* <DealerCarInfoCarImages /> */}
            </>
            {/* Details */}
            <>
              <DealerCarInformation />
            </>
          </div>
        </div>
      </>
    </Sidebar>
  );
}

export default DealerCarInfo;
