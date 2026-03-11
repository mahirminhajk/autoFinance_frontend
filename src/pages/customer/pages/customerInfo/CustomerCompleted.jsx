import { Card, CardBody, Typography } from "@material-tailwind/react";
import InfoPlainTextRender from "../../../../components/CustomerInfoComps/InfoPlainTextRender";
import ImageViewer from "../../../../components/ImageViewer";
import InfoCheckBoxRender from "../../../../components/CustomerInfoComps/InfoCheckBoxRender";

export const CustomerCompleted = ({ cusCompleteData }) => {
  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-2 md:gap-3 lg:gap-5 ">
      <div>
        <Typography className=" text-sm lg:text-base font-semibold text-blue-700">
          Completed
        </Typography>
        <table>
          <tbody className="text-xs lg:text-sm ">
            <InfoPlainTextRender
              label={"Loan Amount "}
              value={cusCompleteData?.loanAmount}
            />
            <InfoPlainTextRender
              label={"Payout Amount "}
              value={cusCompleteData?.payoutTotal}
            />
            <InfoPlainTextRender
              label={"Total Loan Amount "}
              value={cusCompleteData?.totalLoanAmount}
            />
            <InfoPlainTextRender
              label={"Total Payout Amount "}
              value={cusCompleteData?.totalPayoutAmount}
            />
            <InfoCheckBoxRender
              label={"Add to WhatsApp broadcast group "}
              value={cusCompleteData?.addToWhatspGroup}
            />
            <InfoCheckBoxRender
              label={"Complete Payout to Dealer "}
              value={cusCompleteData?.completePayoutToDealer}
            />
          </tbody>
        </table>
      </div>

      {cusCompleteData?.payoutSlip && (
        <div>
          <Typography className=" uppercase text-sm lg:text-base font-semibold text-blue-700">
            Payout Slip
          </Typography>
          <Card className="w-max rounded-lg m-auto">
            <CardBody>
              <ImageViewer
                imageUrl={`https://leadup-crm.s3.ap-south-1.amazonaws.com/${cusCompleteData?.payoutSlip}`}
                alt="doc"
              />
            </CardBody>
          </Card>
        </div>
      )}

      {cusCompleteData?.invoice && (
        <div>
          <Typography className=" uppercase text-sm lg:text-base font-semibold text-blue-700">
            Invoice
          </Typography>
          <Card className="w-max rounded-lg m-auto">
            <CardBody>
              <ImageViewer
                imageUrl={`https://leadup-crm.s3.ap-south-1.amazonaws.com/${cusCompleteData?.invoice}`}
                alt="doc"
              />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
