import { Typography } from "@material-tailwind/react";
import { convertMongoDateToSimpleDate } from "../../../../helpers/dateConverter";
import { Link } from "react-router-dom";
import { RiWhatsappFill as WhatsappIcon } from "react-icons/ri";
import InfoCheckBoxRender from "../../../../components/CustomerInfoComps/InfoCheckBoxRender";

const camelCaseToTitle = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space before capital letters
    .replace(/(^|\s)(.)/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
};

const CustomerGeneral = ({ cusData }) => {
  return (
    <>
      {/* General Details */}

      <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-2 md:gap-3 lg:gap-5">
        <div className="mb-2">
          <Typography className="text-sm lg:text-base font-semibold text-blue-700">
            Personal Details
          </Typography>
          <table>
            <tbody className="text-xs lg:text-sm ">
              {/* <tr className=" border-b-2 ">
                <td className=" px-4 py-2  ">ID :</td>
                <td className=" px-4 py-2 ">{cusData?._id || "--"}</td>
              </tr> */}

              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">First Name :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.name || "--"}
                </td>
              </tr>

              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Last Name :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.lastName || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Phone no :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.phoneNo || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Email :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.email || "--"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Bank */}
        {/* <div>
          <Typography className="text-sm lg:text-base font-semibold text-blue-700">
            Bank Details
          </Typography>
          <table>
            <tbody className=" text-xs lg:text-sm ">
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Bank Name :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.bank?.bankName || "---"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Branch :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.bank?.branch || "---"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Address :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.bank?.address || "---"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Manager :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.manager || "---"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Manager phone no. :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.managerPhoneNo || "---"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Executive :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.executive || "---"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Executive phone no.:</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.employeePhoneNo || "---"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Valuation Details.:</td>
                <td className=" px-4 py-2 "></td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Dealer Name.:</td>
                <td className=" px-4 py-2 "></td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Old owner ph no.:</td>
                <td className=" px-4 py-2 "></td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Method:</td>
                <td className=" px-4 py-2 "></td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Policy:</td>
                <td className=" px-4 py-2 "></td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Manager Call.:</td>
                <td className=" px-4 py-2 "></td>
              </tr>
            </tbody>
          </table>
        </div> */}
        {/* bank */}
        <div>
          <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
            Car Details
          </Typography>
          <table>
            <tbody className="text-xs lg:text-sm ">
              <tr className=" border-b-2">
                <td className="  px-4 py-2  ">Car Name :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.car?.carName || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Model :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.car?.model || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Registration Number :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.car?.regNo || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">KM :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.car?.km || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Vehicle Location :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.car?.vehicleLocation || "--"}
                </td>
              </tr>
              <tr className=" border-b-2">
                <td className="  px-4 py-2  ">Ownership :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.car?.ownership || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Insurance Validity Date :</td>
                <td className=" px-4 py-2 ">
                  {convertMongoDateToSimpleDate(
                    cusData?.general?.insuranceDate
                  )}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Insurance Full / Third :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.insuranceType || "--"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {cusData.loan && (
          <div>
            <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
              Loan Details
            </Typography>
            <table>
              <tbody className="text-xs lg:text-sm ">
                <tr className=" border-b-2     ">
                  <td className="  px-4 py-2  ">EMI Amount :</td>
                  <td className=" px-4 py-2 ">
                    {cusData?.loan?.emiAmount || "--"}
                  </td>
                </tr>
                <tr className=" border-b-2     ">
                  <td className="  px-4 py-2  ">EMI Start Date :</td>
                  <td className=" px-4 py-2 ">
                    {convertMongoDateToSimpleDate(cusData?.loan?.emiStartDate)}
                  </td>
                </tr>
                <tr className=" border-b-2     ">
                  <td className="  px-4 py-2  ">EMI End Date :</td>
                  <td className=" px-4 py-2 ">
                    {convertMongoDateToSimpleDate(cusData?.loan?.emiEndDate)}
                  </td>
                </tr>
                <tr className=" border-b-2     ">
                  <td className="  px-4 py-2  ">IRR :</td>
                  <td className=" px-4 py-2 ">{cusData?.loan?.irr || "--"}</td>
                </tr>
                <tr className=" border-b-2     ">
                  <td className="  px-4 py-2  ">Flat Rate :</td>
                  <td className=" px-4 py-2 ">
                    {cusData?.loan?.irrRate || "--"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div>
          <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
            Dealer Details
          </Typography>
          <table>
            <tbody className="text-xs lg:text-sm ">
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Name :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.dealer?.name || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Shop Name :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.dealer?.shopname || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Palce :</td>
                <td className=" px-4 py-2 ">
                  {cusData?.general?.dealer?.place || "--"}
                </td>
              </tr>
              <tr className=" border-b-2     ">
                <td className="  px-4 py-2  ">Phone no. :</td>

                <td className="px-0 py-0 m-2 flex justify-center ">
                  {cusData?.general?.dealer?.phoneNo || "--"}
                  <Link
                    to={`https://wa.me/${
                      cusData?.general?.dealer?.selectedDealerPhoneNo || "--"
                    }`}
                    target="_blank"
                  >
                    <WhatsappIcon size={30} color="green" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div>
          <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
            Action Details
          </Typography>
          <div className="">
            {cusData?.statusHistory && (
              <table>
                <tbody className="text-xs lg:text-sm ">
                  {cusData?.statusHistory?.map((x, i) => (
                    <tr className="border-b-2" key={i}>
                      <td className="px-4 py-2 ">{x.status}</td>
                      <td className=" px-4 py-2 ">
                        {convertMongoDateToSimpleDate(x.date) +
                          " by " +
                          x.updatedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div> */}

        {cusData.general.initalCheckup &&
          cusData.general.initalCheckup.map((section, index) => (
            <div key={index}>
              {section.head !== "Bank checkup" && (
                <>
                  <Typography className="mt-2 text-sm lg:text-base font-semibold text-blue-700">
                    {section.head}
                  </Typography>
                  <table>
                    <tbody className="text-xs lg:text-sm ">
                      {Object.entries(section.values).map(([key, value], i) => (
                        <InfoCheckBoxRender
                          label={camelCaseToTitle(key)}
                          value={value}
                          key={i}
                        />
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default CustomerGeneral;
