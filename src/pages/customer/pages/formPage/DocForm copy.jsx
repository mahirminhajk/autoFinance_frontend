import { Fragment, useEffect, useReducer, useState } from "react";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import axiosapi from "../../../../helpers/axiosapi";
import { MdError as ErrorIcon } from "react-icons/md";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Checkbox,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  Spinner,
} from "@material-tailwind/react";
import StautsUpdateBtn from "../../../../components/formComponents/StautsUpdateBtn";
import {
  StatusCheckerRender,
  statusChecker,
} from "../../../../helpers/StatusHelper";
import Tabbar from "./components/Tabbar";
import FormSubHeading from "../../../../components/formComponents/FormSubHeading";
import LoadingControler from "../../../../components/controlComps/LoadingControler";
import { ToastComp, toastSuccess } from "../../../../helpers/ToastHelper";

const docsArray = [
  {
    docname: "aadhaar",
    verifydoc: {
      name: false,
      dob: false,
      photo: false,
      address: false,
    },
  },
  {
    docname: "pan",
    verifydoc: {
      name: false,
      dob: false,
    },
  },
  {
    docname: "passport",
    verifydoc: {
      photo: false,
      address: false,
    },
  },
  {
    docname: "photo",
    verifydoc: {
      photo: false,
      address: false,
    },
  },
];
const requiredStatus = "conform";

function DocUploader({
  docname,
  resImage,
  resImage1,
  defaultVerifyData,
  resVerifyData,
  cusId,
  updateMode,
  oneImageInput,
  setdocs,
  setDocsArray,
}) {
  //* Popup
  const [open, setOPen] = useState(false);
  const handleOpen = () => setOPen(!open);
  //* image uploader
  const [imageData, setImageData] = useState(null);
  const [imageData1, setImageData1] = useState(null);
  const [imageSrc, setImageSrc] = useState(resImage);
  const [imageSrc1, setImageSrc1] = useState(resImage1);
  const [verifyData, setVerifyData] = useState(defaultVerifyData || {});
  const [backendDetails, setBackendDetails] = useState({});

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  //* useReducer
  const UploadDocReducer = (state, action) => {
    switch (action.type) {
      case "UPLOAD_START":
        return {
          ...state,
          loading: true,
          error: null,
          disableUploadBtn: true,
        };
      case "UPLOAD_SUCCESS":
        return {
          loading: false,
          error: null,
          isUpdateMode: true,
          disableUploadBtn: false,
        };
      case "UPLOAD_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          disableUploadBtn: false,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(UploadDocReducer, {
    loading: false,
    error: null,
    isUpdateMode: updateMode,
    disableUploadBtn: false,
  });

  //* check it is update mode[by checking resverifydata]
  useEffect(() => {
    setLoading(true);
    if (resVerifyData !== null) {
      setVerifyData(resVerifyData);
    }
    setLoading(false);
  }, []);

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    //* img reader
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => setImageSrc(reader.result);
    setImageData(image);
  };
  const handleFileChange1 = (e) => {
    const image = e.target.files[0];
    //* img reader
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => setImageSrc1(reader.result);
    setImageData1(image);
  };

  const handleCancel = () => {
    setImageSrc(null);
    if (updateMode) {
      setBackendDetails({
        ...backendDetails,
        remove: true,
      });
    }
  };
  const handleCancel1 = () => {
    setImageSrc1(null);
    if (updateMode) {
      setBackendDetails({
        ...backendDetails,
        remove1: true,
      });
    }
  };

  const handleCheckBox = (e) => {
    setVerifyData({
      ...verifyData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleUpload = () => {
    const formData = new FormData();
    if (imageData !== null) {
      formData.append("img", imageData);
    }
    if (imageData1 !== null) {
      formData.append("img1", imageData1);
    }
    //* append backedn details
    if (backendDetails) {
      if (Object.prototype.hasOwnProperty.call(backendDetails, "remove")) {
        formData.append("remove", true);
      }
      if (Object.prototype.hasOwnProperty.call(backendDetails, "remove1")) {
        formData.append("remove1", true);
      }
    }

    formData.append("verifydoc", JSON.stringify(verifyData));

    dispatch({ type: "UPLOAD_START" });
    axiosapi
      .post(`/cus/doc/${cusId}?docname=${docname}`, formData)
      .then((res) => {
        dispatch({ type: "UPLOAD_SUCCESS" });
        //* toast
        toastSuccess("Document uploaded successfully");
        //* remove the doc from the docs array
        setDocsArray((prev) => {
          return prev.filter((doc) => doc.docname !== docname);
        });
        //* add the new doc to the docs array
        setdocs((prev) => {
          return [
            ...prev,
            {
              docname: docname,
              verifydoc: verifyData,
              imgname: "active",
              imgname1: "active",
            },
          ];
        });
        //* close popup
        handleOpen();
      })
      .catch((error) => {
        dispatch({ type: "UPLOAD_FAILURE", payload: { error } });
      });
  };

  return (
    !loading && (
      <Fragment>
        <Button
          size="sm"
          className="py-2 px-5 mt-5 ml-4 mb-2"
          onClick={handleOpen}
          variant="gradient"
        >
          {updateMode ? "Edit" : "upload - " + docname}
        </Button>
        <Dialog open={open} handler={handleOpen} size="xl">
          <DialogHeader>{`${docname.toUpperCase()} UPLOAD`}</DialogHeader>
          <DialogBody divider>
            <div>
              {state.loading ? (
                <span>Loading.....</span>
              ) : (
                <div className="">
                  <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2">
                    <div className="grid grid-cols lg:grid-rows-2 gap-2 mx-10">
                      {imageSrc ? (
                        <div>
                          <img
                            src={imageSrc}
                            alt="part0"
                            className="max-h-52"
                          />
                          <>
                            <Button
                              size="sm"
                              color="red"
                              className="mb-3"
                              onClick={() => setShowModal(true)}
                            >
                              Delete
                            </Button>
                            {showModal ? (
                              <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                  <div className="relative w-auto mx-auto max-w-sm">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                      {/*header*/}
                                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-sm md:text-base lg:text-xl font-semibold">
                                          Are you sure ?
                                        </h3>
                                      </div>

                                      {/*footer*/}
                                      <div className="flex items-center justify-end m-auto gap-5 my-3 border-t border-solid border-slate-200 rounded-b">
                                        <Button
                                          size="sm"
                                          className="bg-slate-500 text-black-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={() => setShowModal(false)}
                                        >
                                          Close
                                        </Button>
                                        <Button
                                          size="sm"
                                          className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={handleCancel}
                                        >
                                          Delete
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-50 fixed inset-0 z-40 bg-black" />
                              </>
                            ) : null}
                          </>
                        </div>
                      ) : (
                        <Input
                          type="file"
                          onChange={(e) => handleFileChange(e)}
                          label="upload first image"
                          accept="image/*"
                        />
                      )}

                      {oneImageInput ? (
                        <></>
                      ) : imageSrc1 ? (
                        <div>
                          <img
                            src={imageSrc1}
                            alt="part1"
                            className="max-h-52"

                          />
                          <>
                            <Button
                              size="sm"
                              color="red"
                              onClick={() => setShowModal(true)}
                            >
                              Delete
                            </Button>

                            {showModal ? (
                              <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                  <div className="relative w-auto mx-auto max-w-sm">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                      {/*header*/}
                                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-sm md:text-base lg:text-xl font-semibold">
                                          Are you sure ?
                                        </h3>
                                      </div>

                                      {/*footer*/}
                                      <div className="flex items-center justify-end m-auto gap-5 my-3 border-t border-solid border-slate-200 rounded-b">
                                        <Button
                                          size="sm"
                                          className="bg-slate-500 text-black-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={() => setShowModal(false)}
                                        >
                                          Close
                                        </Button>
                                        <Button
                                          size="sm"
                                          className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                          onClick={handleCancel1}
                                        >
                                          Delete
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-50 fixed inset-0 z-40 bg-black" />
                              </>
                            ) : null}
                          </>
                        </div>
                      ) : (
                        <Input
                          type="file"
                          onChange={(e) => handleFileChange1(e)}
                          label="upload second image"
                          accept="image/*"
                        />
                      )}
                    </div>
                    <div className="flex flex-col lg:text-base md:text-sm text-xs">
                      {Object.keys(verifyData).map((key) => (
                        <Checkbox
                          key={key}
                          color="blue"
                          id={key}
                          label={key}
                          name={key}
                          onChange={(e) => handleCheckBox(e)}
                          checked={verifyData[key]}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogBody>
          <div className=" flex justify-center gap-10 my-5">
            <Button
              size="sm"
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
              disabled={state.disableUploadBtn}
            >
              <span>Close</span>
            </Button>
            <Button
              size="sm"
              variant="gradient"
              color="green"
              onClick={handleUpload}
              disabled={state.disableUploadBtn}
            >
              {state.isUpdateMode ? <span>Update</span> : <span>Upload</span>}
            </Button>
          </div>
        </Dialog>
      </Fragment>
    )
  );
}

function ShowDoc({ docObj, cusId, oneImageInput }) {
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState(docObj);
  const [isJobFailed, setIsJobFailed] = useState(false);

  const fetchThisDoc = async () => {
    try {
      const res = await axiosapi.get(`/cus/doc/${cusId}/${doc.docname}`);
      const docData = res.data;

      if (docData.imgname === "active" || docData.imgname1 === "active") {
        setTimeout(fetchThisDoc, 2000);
      } else if (
        docData.imgname === "failed" ||
        docData.imgname1 === "failed"
      ) {
        setIsJobFailed(true);
      } else {
        setDoc(docData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (doc.imgname === "active" || doc.imgname1 === "active") {
      setLoading(true);
      setTimeout(fetchThisDoc, 2000);
    } else if (doc.imgname === "failed" || doc.imgname1 === "failed") {
      setIsJobFailed(true);
    }
  }, []);

  return (
    <Card className="my-5 max-w-full h-auto ">
      <CardBody>
        <Typography
          className="font-semibold lg:font-bold text-sm md:text-base lg:text-lg mb-2"
          color="blue-gray"
        >
          {doc.docname.toUpperCase()}
        </Typography>
        <div>
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2">
            {!isJobFailed && !loading ? (
              <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-2 border-r-2">
                {doc.imgname && doc.imgname !== "false" ? (
                  <img
                    src={doc.imgname}
                    alt="part0"
                    className="max-w-[190px] min-w-[140px] "
                  />
                ) : (
                  <span className="max-w-[100px] min-w-[80px]">no image</span>
                )}
                {oneImageInput ? (
                  <></>
                ) : doc.imgname1 && doc.imgname1 !== "false" ? (
                  <img
                    src={doc.imgname1}
                    alt="part1"
                    className="max-w-[190px] min-w-[140px]"
                  />
                ) : (
                  <span className="max-w-[100px] min-w-[80px]">no image</span>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4">
                {isJobFailed ? (
                  <span className="text-red-500 flex justify-center items-center flex-col text-center">
                    <ErrorIcon className="w-5 h-5" />
                    Failed to upload the images,
                    <br /> Please try to upload again
                  </span>
                ) : (
                  <>
                    <span>Uploading the Images</span>
                    <Spinner color="red" className="w-5 h-5" />
                  </>
                )}
              </div>
            )}
            <div className="flex flex-col lg:text-base md:text-sm text-xs">
              {Object.keys(doc.verifydoc).map((key) => (
                <Checkbox
                  key={key}
                  color="blue"
                  id={key}
                  label={key}
                  checked={doc.verifydoc[key]}
                  disabled
                />
              ))}
            </div>
          </div>
        </div>
      </CardBody>
      {!loading && (
        <CardFooter className="p-0">
          <DocUploader
            updateMode={true}
            docname={doc.docname}
            resImage={
              doc.imgname && doc.imgname !== "false" ? doc.imgname : null
            }
            resImage1={
              doc.imgname1 && doc.imgname1 !== "false" ? doc.imgname1 : null
            }
            resVerifyData={doc.verifydoc}
            cusId={cusId}
          />
        </CardFooter>
      )}
    </Card>
  );
}

function DocForm() {
  const cusId = useParams().cusid;
  const [docsarray, setDocsArray] = useState(docsArray);
  const [docs, setdocs] = useState();
  const [statusCheck, setStatusCheck] = useState(true);
  const [userStatus, setUserStatus] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
        const checker = statusChecker(requiredStatus, statusRes.data.status);
        setUserStatus(statusRes.data.status);
        setStatusCheck(checker);
        if (checker === false) return;

        const res = await axiosapi.get(`/cus/doc/${cusId}`);
        setdocs(res.data);

        //* remove docs from docsarray
        const docNames = res.data.map((item) => item.docname);

        //* Filter out documents from the docsarray based on matching docnames in the response
        const updatedDocsArray = docsarray.filter(
          (doc) => !docNames.includes(doc.docname)
        );
        setDocsArray(updatedDocsArray);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  if (!statusCheck) {
    return (
      <StatusCheckerRender
        requiredStatus={requiredStatus}
        userStatus={userStatus}
        cusid={cusId}
      />
    );
  }

  if (loading) {
    return <LoadingControler color="green" size={2} />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <Tabbar cusid={cusId} />
        <div className="_form-container mx-10 w-auto mt-5">
          <FormSubHeading subheading="Upload Doc Images" />

          {docs &&
            docs.map((doc, i) => (
              <ShowDoc
                key={i}
                docObj={doc}
                cusId={cusId}
                oneImageInput={doc.docname === "photo" ? true : false}
              />
            ))}

          {docsarray.map(({ docname, verifydoc }, i) => (
            <DocUploader
              key={i}
              docname={docname}
              defaultVerifyData={verifydoc}
              resImage={null}
              resImage1={null}
              resVerifyData={null}
              cusId={cusId}
              updateMode={false}
              oneImageInput={docname === "photo" ? true : false}
              setdocs={setdocs}
              setDocsArray={setDocsArray}
            />
          ))}

          <div className=" flex md:justify-center lg:justify-center my-10">
            <StautsUpdateBtn
              updateStatus={"upload_docs"}
              cusId={cusId}
              currentStatus={userStatus}
            />
          </div>
        </div>
      </div>
      <ToastComp />
    </Sidebar>
  );
}

export default DocForm;
