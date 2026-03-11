import { Card, CardBody, Typography } from "@material-tailwind/react";
import ImageViewer from "../../../../components/ImageViewer";

const CustomerDocuments = ({ docs }) => {
  return (
    <>
      <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:mx-5 lg:mx-10 my-5 md:gap-3 lg:gap-5">
        {docs?.map((doc, i) => {
          if (doc?.docname !== "photo") {
            return (
              <Card key={i} className="rounded-lg w-auto m-auto">
                <Typography className="text-center uppercase text-sm lg:text-base font-semibold text-blue-700">
                  {doc?.docname}
                </Typography>
                <CardBody>
                  <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-3">
                    <div className="">
                      {doc?.img1 && (
                        <ImageViewer imageUrl={doc?.img1} alt="doc" />
                      )}
                    </div>
                    <div className="">
                      {doc?.img2 && (
                        <ImageViewer imageUrl={doc?.img2} alt="doc" />
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          }
        })}
      </div>
    </>
  );
};

export default CustomerDocuments;
