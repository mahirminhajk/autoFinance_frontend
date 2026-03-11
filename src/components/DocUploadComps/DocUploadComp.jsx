import { useEffect, useState } from "react";
import DocUploadChild from "./DocUploadChild";
import DocViewChild from "./DocViewChild";
import axiosapi from "../../helpers/axiosapi";
import { Spinner } from "@material-tailwind/react";

function DocUploadComp({ cusId, docObj }) {
    const [doc, setDoc] = useState(docObj);
    const [loading, setLoading] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [docStatus, setDocStatus] = useState("uploading");
    const [singleImg, setSingleImg] = useState(docObj.singleImg);

    const fetchDoc = async () => {
        try {
            setLoading(true);

            const res = await axiosapi.get(`/cus/doc/${cusId}/${doc.docname}`);
            if (res.data !== false) {
                setDoc(res.data);
                setDocStatus(res.data.status);
                setIsNew(false);
            } else {
                setIsNew(true);
            }

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchDoc();
    }, [])

    if (loading) {
        return <Spinner color="green" size={2} />;
    }

    return (
        <>
            {
                isNew ?
                    <DocUploadChild
                        doc={doc}
                        setDoc={setDoc}
                        setIsNew={setIsNew}
                        singleImg={singleImg}
                        cusId={cusId}
                    />
                    :
                    <DocViewChild
                        doc={doc}
                        lastDocStatus={docStatus}
                        singleImg={singleImg}
                        cusId={cusId}
                    />
            }
        </>
    )
}

export default DocUploadComp