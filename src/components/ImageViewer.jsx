import { Button } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";

const ImageViewer = ({ imageUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "customer-docs",
    // onAfterPrint: () => alert("Print Success"),
  });

  return (
    <div>
      <img
        className="w-16 lg:w-24 h-auto rounded-lg"
        src={imageUrl}
        alt="Image"
        onClick={openModal}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="image-modal grid justify-center">
          <div ref={componentRef} style={{ width: "auto", height: "auto" }}>
            <a href={imageUrl}>
              <img src={imageUrl} alt="Document" />
            </a>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <Button onClick={closeModal} color="red">
              Close
            </Button>
            <Button onClick={handlePrint}>
              <center>
                <AiFillPrinter className="text-2xl text-white" />
              </center>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageViewer;
