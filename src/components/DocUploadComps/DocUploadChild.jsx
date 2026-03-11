import { Button, Checkbox, Dialog, DialogBody, DialogHeader, Input, Spinner } from '@material-tailwind/react';
import { Fragment, useState } from 'react'
import axiosapi from '../../helpers/axiosapi';

function DocUploadChild({
    doc,
    setIsNew,
    setDoc,
    singleImg,
    cusId
}) {
    const [loading, setLoading] = useState(false);

    const [imgData, setImgData] = useState({
        img1: null,
        img2: null,
    });
    const [imgSrc, setImgSrc] = useState({
        img1: null,
        img2: null,
    });
    const [verifyData, setVerifyData] = useState(doc.verifydoc);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    //*delete popup
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e, field) => {
        const image = e.target.files[0];
        //* img reader
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () =>
            setImgSrc((prev) => ({ ...prev, [field]: reader.result }));
        setImgData((prev) => ({ ...prev, [field]: image }));
    };

    const handleFileCancel = (field) => {
        setImgSrc((prev) => ({ ...prev, [field]: null }));
        setImgData((prev) => ({ ...prev, [field]: null }));
        setShowModal(false);
    };

    const handleCheckBox = (e) =>
        setVerifyData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

    const handleUpload = () => {
        setLoading(true);
        const formData = new FormData();
        //* img1, img2, verifydoc
        //TODO: optimize the img 
        if (imgData.img1) formData.append("img1", imgData.img1);
        if (imgData.img2) formData.append("img2", imgData.img2);
        formData.append("verifydoc", JSON.stringify(verifyData));

        try {
            axiosapi
                .post(`/cus/doc/${cusId}/?docname=${doc.docname}`, formData)
                .then((res) => {
                    //* set isNew to false
                    setIsNew(false);
                    //* add to view list
                    setDoc(res.data);
                    setLoading(false)
                    //* make data null
                    setImgData({
                        img1: null,
                        img2: null,
                    });
                    setImgSrc({
                        img1: null,
                        img2: null,
                    });
                    handleOpen();
                });
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <>
            <Fragment>
                <Button
                    size="sm"
                    className="py-2 px-5 mt-5 ml-4 mb-2"
                    onClick={handleOpen}
                    variant="gradient"
                >
                    {`Upload ${doc.docname}`}
                </Button>
                <Dialog open={open} handler={handleOpen} size="lg">
                    <DialogHeader>{`Upload ${doc.docname}`}</DialogHeader>
                    <DialogBody>
                        <div className="relative">
                            <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2">
                                <div className="grid grid-cols lg:grid-rows-2 gap-2 mx-10">
                                    {imgSrc.img1 ? (
                                        <div>
                                            <img src={imgSrc.img1} alt="part0" className="max-h-44" />
                                            <>
                                                <Button
                                                    size="sm"
                                                    color="red"
                                                    className="mb-3"
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    Delete
                                                </Button>
                                                {showModal && (
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
                                                                            onClick={() => handleFileCancel("img1")}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="opacity-50 fixed inset-0 z-40 bg-black" />
                                                    </>
                                                )}
                                            </>
                                        </div>
                                    ) : (
                                        <Input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, "img1")}
                                            label="upload first image"
                                            accept="image/*"
                                            disabled={loading}
                                        />
                                    )}

                                    {singleImg ? (
                                        <></>
                                    ) : imgSrc.img2 ? (
                                        <div>
                                            <img src={imgSrc.img2} alt="part1" className="max-h-44" />
                                            <>
                                                <Button
                                                    size="sm"
                                                    color="red"
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    Delete
                                                </Button>

                                                {showModal && (
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
                                                                            onClick={() => handleFileCancel("img2")}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="opacity-50 fixed inset-0 z-40 bg-black" />
                                                    </>
                                                )}
                                            </>
                                        </div>
                                    ) : (
                                        <Input
                                            type="file"
                                            onChange={(e) => handleFileChange(e, "img2")}
                                            label="upload second image"
                                            accept="image/*"
                                            disabled={loading}
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
                                            disabled={loading}
                                        />
                                    ))}
                                </div>
                            </div>
                            {loading &&
                                <div className="absolute top-1/2 left-1/2">
                                    <Spinner color="green" className="h-8 w-8" />
                                </div>
                            }
                        </div>
                    </DialogBody>

                    <div className=" flex justify-center gap-10 my-5">
                        <Button
                            size="sm"
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                            disabled={loading}
                        >
                            <span>Close</span>
                        </Button>
                        <Button
                            size="sm"
                            variant="gradient"
                            color="green"
                            onClick={handleUpload}
                            disabled={loading}
                        >
                            Upload Doc
                        </Button>
                    </div>
                </Dialog>
            </Fragment>
        </>
    )
}

export default DocUploadChild