import { Typography } from "@material-tailwind/react";
import InfoCheckBoxRender from "../../../../components/CustomerInfoComps/InfoCheckBoxRender";
import InfoPlainTextRender from "../../../../components/CustomerInfoComps/InfoPlainTextRender";
import { convertMongoDateToSimpleDate } from "../../../../helpers/dateConverter";

export const CustomerRtowork = ({ rtoWorkData }) => {
  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-2 md:gap-3 lg:gap-5">
      <div>
        <Typography className="text-sm lg:text-base font-semibold text-blue-700">
          RTO
        </Typography>
        <table>
          <tbody className="text-xs lg:text-sm ">
            <InfoPlainTextRender
              label={"RTO office place "}
              value={rtoWorkData?.rtoOfficePlace}
            />
            <InfoCheckBoxRender
              label={"RTO paper check "}
              value={rtoWorkData?.rtoPaperCheck}
            />
            <InfoCheckBoxRender
              label={"Origial RC "}
              value={rtoWorkData?.origialRc}
            />
            <InfoCheckBoxRender
              label={"Login address proof "}
              value={rtoWorkData?.loginAddressProof}
            />
            <InfoPlainTextRender
              label={"Mobile number "}
              value={rtoWorkData?.mobileNo}
            />
            <InfoCheckBoxRender
              label={"Insurance copy "}
              value={rtoWorkData?.insuranceCopy}
            />
            <InfoCheckBoxRender
              label={"Bank paper(HP34) "}
              value={rtoWorkData?.bankPaper}
            />
            <InfoCheckBoxRender
              label={"Sign letter "}
              value={rtoWorkData?.signLetter}
            />
            <InfoCheckBoxRender
              label={"Pollution "}
              value={rtoWorkData?.pollution}
            />
            <InfoCheckBoxRender
              label={"Approved by HR "}
              value={rtoWorkData?.workDetailsApprovedByHR}
            />
            <InfoCheckBoxRender
              label={"Approved by admin "}
              value={rtoWorkData?.workDetailsApprovedByAdmin}
            />
          </tbody>
        </table>
      </div>

      <div>
        <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
          Ready to RTO Work
        </Typography>
        <table>
          <tbody className="text-xs lg:text-sm ">
            <InfoPlainTextRender
              label={"Agent name "}
              value={rtoWorkData?.agentName}
            />
            <InfoPlainTextRender
              label={"Customer name "}
              value={rtoWorkData?.customerName}
            />
            <InfoPlainTextRender
              label={"Dealer name "}
              value={rtoWorkData?.dealerName}
            />
            <InfoPlainTextRender
              label={"Advance amount "}
              value={rtoWorkData?.advanceAmount}
            />
            <InfoPlainTextRender
              label={"Date "}
              value={convertMongoDateToSimpleDate(rtoWorkData?.date)}
            />
            <InfoPlainTextRender
              label={"Vehicle number "}
              value={rtoWorkData?.vehicleNo}
            />
            <InfoCheckBoxRender
              label={"Challan report "}
              value={rtoWorkData?.challanReport}
            />
            <InfoCheckBoxRender
              label={"Challan report send to manager "}
              value={rtoWorkData?.challanReportSendToManager}
            />
            <InfoCheckBoxRender
              label={"RC verification "}
              value={rtoWorkData?.rcVerification}
            />
            <InfoCheckBoxRender
              label={"Customer call to inform (OTP form parivahan) "}
              value={rtoWorkData?.customerCallToInformAboutOtp}
            />
          </tbody>
        </table>
      </div>

      <div>
        <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
          After 1 Week Customer Call
        </Typography>
        <table className="lg:mb-10">
          <tbody className="text-xs lg:text-sm ">
            <InfoCheckBoxRender
              label={"RC change parivahan site "}
              value={rtoWorkData?.rcChangeParivahanSite}
            />
            <InfoCheckBoxRender
              label={"Insurance changed (Call to customer for enquiry) "}
              value={rtoWorkData?.insuranceChanged}
            />
          </tbody>
        </table>

        <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
          After 15 Days Customer Call
        </Typography>
        <table>
          <tbody className="text-xs lg:text-sm ">
            <InfoCheckBoxRender
              label={"RC received to customer "}
              value={rtoWorkData?.rcRecivedToCustomer}
            />
            <InfoCheckBoxRender
              label={"Check RC details and confirm "}
              value={rtoWorkData?.checkRcDetailsAndConfirm}
            />
            <InfoCheckBoxRender
              label={"RC delivered confirm "}
              value={rtoWorkData?.rcDeliveredConfirm}
            />
            <InfoCheckBoxRender
              label={"Request new RC photo "}
              value={rtoWorkData?.requestNewRcPhoto}
            />
            <InfoCheckBoxRender
              label={"Send RC photo to manager & dealer "}
              value={rtoWorkData?.sendRcPhotoToManager}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};
