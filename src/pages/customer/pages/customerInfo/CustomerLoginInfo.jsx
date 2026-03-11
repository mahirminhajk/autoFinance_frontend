import InfoCheckBoxRender from "../../../../components/CustomerInfoComps/InfoCheckBoxRender";
import InfoPlainTextRender from "../../../../components/CustomerInfoComps/InfoPlainTextRender";
import { convertMongoDateToSimpleDateTime } from "../../../../helpers/dateConverter";

function CustoemrLoginInfo({ loginObj }) {
  return (
    <div className="flex md:mx-5 lg:mx-10 my-2">
      <table>
        <tbody className="text-xs lg:text-sm ">
          <InfoCheckBoxRender
            label={"LOGIN STATUS: "}
            value={loginObj?.loginStatus || false}
          />

          {loginObj.loginStatus === true && (
            <>
              <InfoPlainTextRender
                label={"USER NAME: "}
                value={loginObj?.updatedBy}
              />

              <InfoPlainTextRender
                label={"DATE: "}
                value={convertMongoDateToSimpleDateTime(loginObj?.updatedAt)}
              />
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustoemrLoginInfo;
