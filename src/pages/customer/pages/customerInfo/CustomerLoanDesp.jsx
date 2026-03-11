import { Card, CardBody, Typography } from "@material-tailwind/react";
import InfoCheckBoxRender from "../../../../components/CustomerInfoComps/InfoCheckBoxRender";
import InfoPlainTextRender from "../../../../components/CustomerInfoComps/InfoPlainTextRender";
import ImageViewer from "../../../../components/ImageViewer";

export const CustomerLoanDesp = ({ loanDespData }) => {
  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-2 md:gap-3 lg:gap-5">
      <div>
        <Typography className="text-sm lg:text-base font-semibold text-blue-700">
          Loan
        </Typography>
        <table>
          <tbody className="text-xs lg:text-sm ">
            <InfoCheckBoxRender
              label={"Loan Disp Call "}
              value={loanDespData?.loanDespCall}
            />
            <InfoCheckBoxRender
              label={"Loan Agreement Sign "}
              value={loanDespData?.loanAgreementSign}
            />
            <InfoPlainTextRender
              label={"Disp Amount "}
              value={loanDespData?.despAmount}
            />
            <InfoPlainTextRender
              label={"RTO cutting amount "}
              value={loanDespData?.rtoCuttingAmount}
            />
            <InfoPlainTextRender
              label={"Net DD "}
              value={loanDespData?.netDd}
            />
          </tbody>
        </table>
      </div>

      <div>
        <Typography className=" uppercase text-sm lg:text-base font-semibold text-blue-700">
          Disp Letter
        </Typography>
        <Card className="w-max rounded-lg m-auto">
          <CardBody>
            <ImageViewer
              imageUrl={`https://leadup-crm.s3.ap-south-1.amazonaws.com/${loanDespData?.despLetter}`}
              alt="doc"
            />
          </CardBody>
        </Card>
      </div>

      <div>
        <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
          Customer Enquiry Call
        </Typography>
        <table>
          <tbody className="text-xs lg:text-sm ">
            <InfoCheckBoxRender
              label={"Ask Balance Fund Given "}
              value={loanDespData?.askBalanceFundGiven}
            />
            <InfoCheckBoxRender
              label={"Dealer "}
              value={loanDespData?.askBalanceFundGivenDealer}
            />
            <InfoCheckBoxRender
              label={"Customer "}
              value={loanDespData?.askBalanceFundGivenCustomer}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};
