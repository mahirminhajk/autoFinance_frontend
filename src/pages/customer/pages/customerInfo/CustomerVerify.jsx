import { Typography } from "@material-tailwind/react";
import InfoCheckBoxRender from "../../../../components/CustomerInfoComps/InfoCheckBoxRender";

export const CustomerVerify = ({ verifyData }) => {
  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-2 md:gap-3 lg:gap-5">
      {verifyData?.map((verify, i) => (
        <div key={i} >
          <Typography className=" text-sm lg:text-base font-semibold text-blue-700">
            {verify.head}
          </Typography>
          <table className="mb-2">
          <tbody className=" text-xs lg:text-sm ">
              {Object.entries(verify.values).map(([key, value]) => {
                const convertedLabel = key.replace(/_/g, " ");
                if (key === "Firm_Loan") {
                  if (key === "Firm_Loan") {
                    return (
                      <InfoCheckBoxRender
                        label={convertedLabel}
                        key={key}
                        value={value}
                      />
                    );
                  } else if (verify.values.Firm_Loan === true) {
                    return (
                      <InfoCheckBoxRender
                        label={convertedLabel}
                        key={key}
                        value={value}
                      />
                    );
                  }
                } else {
                  return (
                    <InfoCheckBoxRender
                      label={convertedLabel}
                      key={key}
                      value={value}
                    />
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
