import { Card, CardBody, CardFooter, Checkbox, Spinner, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import DocUpdateChild from './DocUpdateChild';
import axiosapi from '../../helpers/axiosapi';

function DocViewChild({ doc, lastDocStatus, singleImg, cusId }) {
    const [docData, setDocData] = useState(doc);
    const [docStatus, setDocStatus] = useState(lastDocStatus);
    const [loading, setLoading] = useState(false);

    const fetchThisDocAgain = async () => {
        try {
            setLoading(true);

            const res = await axiosapi.get(`/cus/doc/${cusId}/${doc.docname}`);
            const resDocData = res.data;


            if (
                resDocData.status === "uploading" ||
                resDocData.status === "updating"
            ) {
                setDocStatus(resDocData.status);
                setTimeout(fetchThisDocAgain, 2000);
            } else {
                setDocStatus("done");
                setDocData(resDocData);
            }

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (docData.status !== "done") {
            setDocStatus(docData.status);
            setTimeout(fetchThisDocAgain, 2000);
        }
    }, [docStatus, docData]);


    if (loading) {
        return (
            <h1>Loading ....</h1>
        )
    }

    return (
        <>
            <Card>
                <CardBody>
                    <Typography
                        className="font-semibold lg:font-bold text-sm md:text-base lg:text-lg mb-2"
                        color="blue-gray"
                    >
                        {docData.docname.toUpperCase()}
                    </Typography>
                    <div>
                        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2">
                            {docStatus === "done" ? (
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
                                    {singleImg ? (
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
                                        {docStatus === "uploading"
                                            ? "Uploading..."
                                            : docStatus === "updating"
                                                ? "Updating..."
                                                : "Error, Please try to upload again"}
                                    </Typography>
                                </div>
                            )}
                            <div className="flex flex-col lg:text-base md:text-sm text-xs">
                                {Object.keys(docData.verifydoc).map((key) => (
                                    <Checkbox
                                        key={key}
                                        color="blue"
                                        id={key}
                                        label={key}
                                        checked={docData.verifydoc[key]}
                                        disabled
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <DocUpdateChild
                        docData={docData}
                        setDocData={setDocData}
                        setDocStatus={setDocStatus}
                        cusId={cusId}
                        singleImg={singleImg}
                    />
                </CardFooter>
            </Card>
        </>
    )
}

export default DocViewChild