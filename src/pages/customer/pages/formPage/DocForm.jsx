import { useEffect, useState } from "react";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import axiosapi from "../../../../helpers/axiosapi";
import StautsUpdateBtn from "../../../../components/formComponents/StautsUpdateBtn";
import { statusChecker } from "../../../../helpers/StatusHelper";
import Tabbar from "./components/Tabbar";
import FormSubHeading from "../../../../components/formComponents/FormSubHeading";
import LoadingControler from "../../../../components/controlComps/LoadingControler";
import { ToastComp } from "../../../../helpers/ToastHelper";
import DocUploader from "./components/DocUploader";
import DocViewer from "./components/DocViewer";

const docsArray = [
  {
    docname: "Aadhaar",
    verifydoc: {
      name: false,
      dob: false,
      photo: false,
      address: false,
      check_permanent_address: false,
      own_house: false,
      rent_house: false,
      cross_check_aadhar_and_pan_dob: false,
      verify_father_mother_and_wife_name: false,
      verify_ph_no_link_with_aadhar: false,
    },
    singleImg: false,
  },
  {
    docname: "Pan",
    verifydoc: {
      name: false,
      dob: false,
      crosscheck_pan_and_aadhar_dob: false,
      pan_card_photo_clear: false,
      verify_digital_sign_if_no_sign_collect_passport_licence_land_tax_kseb_bill_or_others: false,
    },
    singleImg: false,
  },
  {
    docname: "Licence",
    verifydoc: {
      name: false,
      dob: false,
      photo: false,
      address: false,
    },
    singleImg: false,
  },
  {
    docname: "Passport",
    verifydoc: {
      photo: false,
      address: false,
    },
    singleImg: false,
  },
  {
    docname: "Photo",
    verifydoc: {
      photo: false,
      address: false,
    },
    singleImg: true,
  },
  {
    docname: "Voter ID",
    verifydoc: {},
    singleImg: true,
  },
  // {
  //   docname: "RC",
  //   verifydoc: {},
  //   singleImg: true,
  // },
  // {
  //   docname: "Insurance",
  //   verifydoc: {},
  //   singleImg: true,
  // },
];
const requiredStatus = "rto_work";

function formatVerifyDoc(verifydoc) {
  const formattedVerifydoc = {};
  for (const key in verifydoc) {
    const formattedKey = key.replace(/_/g, " ").toLowerCase();
    formattedVerifydoc[
      formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)
    ] = verifydoc[key];
  }
  return formattedVerifydoc;
}

function DocForm() {
  const cusId = useParams().cusid;
  const [docsarray, setDocsArray] = useState(docsArray);
  const [docs, setDocs] = useState();
  // const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        // const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
        // const checker = statusChecker(requiredStatus, statusRes.data.status);
        // setUserStatus(statusRes.data.status);

        const res = await axiosapi.get(`/cus/doc/${cusId}`);
        const resDocs = res.data;
        setDocs(resDocs);

        // Transform the verifydoc objects
        const transformedDocsArray = docsArray.map((doc) => ({
          ...doc,
          verifydoc: Object.fromEntries(
            Object.entries(doc.verifydoc).map(([key, value]) => [
              key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // Capitalize first letter of each word
              value,
            ])
          ),
        }));
        setDocsArray(transformedDocsArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [cusId]);

  // if (!statusCheck) {
  //   return (
  //     <StatusCheckerRender
  //       requiredStatus={requiredStatus}
  //       userStatus={userStatus}
  //       cusid={cusId}
  //     />
  //   );
  // }

  if (loading) {
    return <LoadingControler color="green" size={2} />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <Tabbar cusid={cusId} />
        <div className="_form-container mx-10 w-auto mt-5 mb-10">
          <FormSubHeading subheading="Upload Documents" />

          {docs &&
            docs.map((doc, i) => (
              <DocViewer
                key={i}
                docObj={doc}
                cusId={cusId}
                oneImageInput={doc.docname === "photo" ? true : false}
                setDocsArray={setDocsArray}
                setDocs={setDocs}
              />
            ))}

          {docsarray.map((doc, i) => (
            <DocUploader
              key={i}
              docObj={doc}
              cusId={cusId}
              docname={doc.docname}
              setDocsArray={setDocsArray}
              setDocs={setDocs}
            />
          ))}

          {/* <div className=" flex md:justify-center lg:justify-center my-10">
            <StautsUpdateBtn
              updateStatus={"upload_docs"}
              cusId={cusId}
              currentStatus={userStatus}
            />
          </div> */}
        </div>
      </div>
      <ToastComp />
    </Sidebar>
  );
}

export default DocForm;
