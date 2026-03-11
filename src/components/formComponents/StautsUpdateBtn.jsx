import { useState } from "react";
import {
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { ImNotification as IconNot } from "react-icons/im";
import axiosapi from "../../helpers/axiosapi";
import { useNavigate } from "react-router";
import { nextStatusLink } from "../../helpers/StatusHelper";

function StautsUpdateBtn({ updateStatus, cusId, currentStatus }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(!showModal);

  const [loading, setLoading] = useState(false);

  const updateStatusName = updateStatus.replaceAll("_", " ").toUpperCase();

  const handelUpdateStaus = async () => {
    setLoading(true);
    try {
      const res = await axiosapi.patch(`/cus/${cusId}/status`, {
        status: updateStatus,
      });

      //* navigate to next page
      navigate(`/customer/${cusId}/${nextStatusLink(updateStatus)}`);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setShowModal(false);
  };

  return (
    // <Fragment>
    //   <Button color="amber" onClick={handleOpen} className="mb-10">
    //     Update Status From <span className="underline">{currentStatus}</span> To
    //     <span className="underline">{updateStatusName} </span>
    //   </Button>
    //   <Dialog open={open} handler={handleOpen}>
    //     <DialogBody divider className="grid place-items-center gap-4">
    //       <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary">
    //         <IconNot className="text-4xl text-white" />
    //       </div>
    //       <Typography color="blue-gray">
    //         Are you sure you want to update status to {updateStatusName}?
    //       </Typography>

    //       <div className="flex gap-3">
    //         <Button
    //           variant="text"
    //           color="blue-gray"
    //           onClick={handleOpen}
    //           className="hover:bg-red-300"
    //           disabled={loading}
    //         >
    //           Cancel
    //         </Button>
    //         <Button
    //           color="green"
    //           variant="gradient"
    //           onClick={handelUpdateStaus}
    //           disabled={loading}
    //         >
    //           Update
    //         </Button>
    //       </div>

    //       {loading && (
    //         <>
    //           <div className="absolute z-20">
    //             <Spinner color="red" className="w-8 h-8" />
    //           </div>
    //           <div className="absolute top-0 left-0 w-full h-full bg-blue-gray-200 opacity-90 z-10"></div>
    //         </>
    //       )}
    //     </DialogBody>
    //   </Dialog>
    // </Fragment>

    <>
      <Button
        color="amber"
        // onClick={handleOpen}
        className="mb-10"
        type="button"
        onClick={() => handleOpen()}
      >
        Update Status From <span className="underline"> {currentStatus} </span> To <span className="underline"> {updateStatusName} </span>
      </Button>
      {showModal ? (
        <>
          <div
            className="pop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={(e) => {
              if (e.target.className === "pop") handleOpen();
            }}
            open={open}
            handler={handleOpen}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="flex flex-col p-5 justify-center border-b border-solid border-slate-200 rounded-t">
                  <div className="flex justify-center mb-3">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary">
                      <IconNot className="text-4xl text-white" />
                    </div>
                  </div>

                  <div className="relative flex-auto mb-3">
                    <Typography
                      className="text-xs md:text-base lg:text-base"
                      color="blue-gray"
                    >
                      Are you sure you want to update status to
                      {updateStatusName}?
                    </Typography>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="text"
                      size="sm"
                      color="blue-gray"
                      // onClick={handleOpen}
                      onClick={() => handleOpen()}
                      className="hover:bg-red-300"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      color="green"
                      variant="gradient"
                      onClick={handelUpdateStaus}
                      disabled={loading}
                    >
                      Update
                    </Button>
                  </div>
                </div>

                {/*footer*/}
                {loading && (
                  <>
                    <div className="absolute z-20 flex justify-center">
                      <Spinner color="red" className="w-8 h-8" />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-gray-200 opacity-90 z-10" />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
}

export default StautsUpdateBtn;
