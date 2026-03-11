import { Typography } from "@material-tailwind/react";
import InfoPlainTextRender from "../../../../components/CustomerInfoComps/InfoPlainTextRender";

export const CustomerBank = ({ ftr, bank, otherData }) => {
  console.log("CustomerBank -> ftr", ftr);
  
  return (
    <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-2 md:gap-3 lg:gap-5">
      <div>
        <Typography className="text-sm lg:text-base font-semibold text-blue-700">
          Bank Details
        </Typography>
        <table>
          <tbody className=" text-xs lg:text-sm ">
            <InfoPlainTextRender label={"Bank name "} value={bank?.bankName} />
            <InfoPlainTextRender
              label={"Branch "}
              value={bank?.branch || "---"}
            />
            <InfoPlainTextRender
              label={"Address "}
              value={bank?.address || "---"}
            />
            <InfoPlainTextRender
              label={"Manager "}
              value={otherData?.manager || "---"}
            />
            <InfoPlainTextRender
              label={"Manager phone number "}
              value={otherData?.managerPhoneNo || "---"}
            />
            <InfoPlainTextRender
              label={"Executive "}
              value={otherData?.executive || "---"}
            />
            <InfoPlainTextRender
              label={"Executive phone number"}
              value={otherData?.executivePhoneNO || "---"}
            />
            <InfoPlainTextRender
              label={"Valuation details"}
              value={otherData?.valuationDetails || "---"}
            />
            {/* <InfoPlainTextRender
              label={"Customer Vehicle Location "}
              value={otherData?.customerVehicleLocation || "---"}
            /> */}
            <InfoPlainTextRender
              label={"Dealer name."}
              value={otherData?.dealerName || "---"}
            />
            {/* <InfoPlainTextRender
              label={"Old owner phone number"}
              value={otherData?.oldOwnerPhoneNumber || "---"}
            /> */}
            {/* <InfoPlainTextRender
              label={"Method "}
              value={otherData?.method || "---"}
            />
            <InfoPlainTextRender
              label={"Policy "}
              value={otherData?.policy || "---"}
            />
            <InfoCheckBoxRender
              label={"Manager call "}
              value={otherData?.managerCall}
            /> */}
          </tbody>
        </table>
      </div>

      <div className="mb-2">
        <Typography className="text-sm lg:text-base font-semibold text-blue-700">
          Valuation
        </Typography>
        <table>
          <tbody>
            {/* <InfoPlainTextRender
              label={"Vehicle Location "}
              value={ftr?.Vehicle_Location}
            /> */}

            {/* <InfoPlainTextRender
              label={"Vehicle Holder Name "}
              value={ftr?.Vehicle_Holder_Name}
            /> */}

            <InfoPlainTextRender
              label={"Company name "}
              value={ftr?.Company_Name}
            />

            <InfoPlainTextRender label={"Amount "} value={ftr?.Amount} />

            <InfoPlainTextRender
              label={"Valuation amount "}
              value={ftr?.Valuation_Amount}
            />

            {/* <InfoCheckBoxRender
              label={"Vehicle Photo Take After Report "}
              value={ftr?.Vehicle_Photo_Take_After_Report}
            /> */}

            {/* <InfoCheckBoxRender
              label={"Post Approvel Pending "}
              value={ftr?.Post_Approvel_Pending}
            /> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
