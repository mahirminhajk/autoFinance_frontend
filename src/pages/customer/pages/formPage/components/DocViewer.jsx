import { useEffect, useState } from "react";
import axiosapi from "../../../../../helpers/axiosapi";
import {
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import DocUpdater from "./DocUpdater";

function DocViewer({ docObj, cusId, oneImageInput, setDocsArray, setDocs }) {
  const [docData, setDocData] = useState(docObj ?? {});
  const [err, setErr] = useState(null);
  const [loading,  setLoading] = useState(false);
  const [docStaus, setDocStatus] = useState(docObj?.status ?? "");

  const fetchThisDoc = async () => {
    if (!docData?.docname) return;
    try {
      setLoading(true)
      const res = await axiosapi.get(`/cus/doc/${cusId}/${docData.docname}`);
      const resDocData = res.data;

      if (
        resDocData.status === "uploading" ||
        resDocData.status === "updating"
      ) {
        setDocStatus(docData.status);
        setTimeout(fetchThisDoc, 2000);
      } else {
        setDocStatus("done");
        setDocData(resDocData);
      }
    } catch (error) {
      setErr(error.message || error.response.data.message || error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (docData?.status && docData.status !== "done") {
      setDocStatus(docData.status);
      setTimeout(fetchThisDoc, 2000);
    }   
  }, [docData, docStaus]);

  const verifyDocEntries = Object.entries(docData?.verifydoc ?? {});

  if(loading){
    return(
      <h1>Loading ....</h1>
    )
  }

  return (
    <Card>
      <CardBody>
        <Typography
          className="font-semibold lg:font-bold text-sm md:text-base lg:text-lg mb-2"
          color="blue-gray"
        >
          {(docData?.docname ?? "").toUpperCase()}
        </Typography>
        <div>
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2">
            {docStaus === "done" ? (
              <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-2 border-r-2">
                {docData.img1 && docData.img1 !== "false" ? (
                  <img
                    src={docData.img1}
                    alt="part0"
                    className="max-w-[190px] min-w-[140px] "
                  />
                ) : (
                  <span className="max-w-[100px] min-w-[80px]">no image</span>
                )}
                {oneImageInput ? (
                  <></>
                ) : docData.img2 && docData.img2 !== "false" ? (
                  <img
                    src={docData.img2}
                    alt="part1"
                    className="max-w-[190px] min-w-[140px]"
                  />
                ) : (
                  <span className="max-w-[100px] min-w-[80px]">no image</span>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <Spinner color="orange" size="w-8 h-8" />
                <Typography color="orange">
                  {docStaus === "uploading"
                    ? "Uploading..."
                    : docStaus === "updating"
                    ? "Updating..."
                    : "Error, Please try to upload again"}
                </Typography>
              </div>
            )}
            <div className="flex flex-col lg:text-base md:text-sm text-xs">
              {verifyDocEntries.map(([key, value]) => (
                <Checkbox
                  key={key}
                  color="blue"
                  id={key}
                  label={key}
                  checked={Boolean(value)}
                  disabled
                />
              ))}
            </div>
          </div>
        </div>
      </CardBody>
        <CardFooter className="p-0">
          {docData?.status === "done" && 
          <DocUpdater
            docData={docData}
            setDocData={setDocData}
            docStaus={docStaus}
            setDocStatus={setDocStatus}
            cusId={cusId}
            docname={docData?.docname}
            oneImageInput={oneImageInput}
          />}
        </CardFooter>
    </Card>
  );
}

export default DocViewer;
