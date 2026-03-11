import { Card, CardBody, Typography } from "@material-tailwind/react";
import InfoPlainTextRender from "../../../../components/CustomerInfoComps/InfoPlainTextRender";
import InfoCheckBoxRender from "../../../../components/CustomerInfoComps/InfoCheckBoxRender";
import { convertMongoDateToSimpleDate } from "../../../../helpers/dateConverter";
import ImageViewer from "../../../../components/ImageViewer";

export const CustomerLoanApproved = ({ loanApprovedData, loanData }) => {
  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-2 md:gap-3 lg:gap-5">
      <div>
        <Typography className="text-sm lg:text-base font-semibold text-blue-700">
          Loan
        </Typography>
        <table className="mb-2">
          <tbody className=" text-xs lg:text-sm ">
            <InfoPlainTextRender
              label={"IRR Rate "}
              value={loanData?.irrRate}
            />
            <InfoPlainTextRender label={"Flat Rate "} value={loanData?.irr} />
            <InfoCheckBoxRender
              label={"Advance "}
              value={loanData?.advance || false}
            />
            <InfoPlainTextRender
              label={"Advance Amount "}
              value={loanData?.advanceAmount}
            />
            <InfoPlainTextRender label={"Arrears "} value={loanData?.arrears} />
            <InfoPlainTextRender label={"PF "} value={loanData?.pf} />
            <InfoPlainTextRender
              label={"Loan Security "}
              value={loanData?.loanSecurity}
            />
            <InfoPlainTextRender
              label={"Loan Number "}
              value={loanData?.loanNumber}
            />
            <InfoPlainTextRender
              label={"Loan Amount "}
              value={loanData?.loanAmount}
            />
            <InfoPlainTextRender
              label={"EMI Amount "}
              value={loanData?.emiAmount}
            />
            <InfoPlainTextRender
              label={"EMI Tenure "}
              value={loanData?.emiTenure}
            />
            <InfoPlainTextRender
              label={"EMI Start Date "}
              value={convertMongoDateToSimpleDate(loanData?.emiStartDate)}
            />
            <InfoPlainTextRender
              label={"EMI End Date "}
              value={convertMongoDateToSimpleDate(loanData?.emiStartDate)}
            />
            <InfoPlainTextRender
              label={"Year Count "}
              value={loanData?.yearCount}
            />
            <InfoPlainTextRender
              label={"Insurance Ending Date "}
              value={convertMongoDateToSimpleDate(
                loanData?.InsuranceEndingDate
              )}
            />
          </tbody>
        </table>
      </div>
      {loanData?.chart && (
        <div>
          {/*Chart*/}
          <Typography className=" uppercase text-sm lg:text-base font-semibold text-blue-700">
            Chart
          </Typography>

          <Card className="w-max rounded-lg m-auto">
            <CardBody>
              <ImageViewer
                imageUrl={`https://leadup-crm.s3.ap-south-1.amazonaws.com/${loanData?.chart}`}
                alt="doc"
              />
            </CardBody>
          </Card>
        </div>
      )}

      <div>
        {loanApprovedData.map((item, index) => {
          return (
            <div key={index}>
              <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
                {item.head}
              </Typography>
              <table>
                <tbody className="text-xs lg:text-sm ">
                  {Object.entries(item.values).map(([key, value]) => {
                    const convertedLabel = key.replace(/_/g, " ");
                    return (
                      <InfoCheckBoxRender
                        key={key}
                        label={convertedLabel}
                        value={value}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};
