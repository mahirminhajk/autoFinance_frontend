import { Button, Spinner } from "@material-tailwind/react";
import axiosapi from "../../helpers/axiosapi";
import { useEffect, useState } from "react";

//example of templateInfo
// const templateInfo = [
//     {
//       "templateName": "template1",
//       "btnLable": "template 1",
//       "send": false,

function MessageBtn({ cusId, templateInfo }) {
  const [err, setErr] = useState(null);
  const [template, setTemplate] = useState(templateInfo);
  const [loading, setLoading] = useState(false);

  const fetchMessSendInfo = async () => {
    try {
      const res = await axiosapi.get(`/cus/${cusId}/field/messSendInfo`);
      return res.data;
    } catch (error) {
      return Promise.reject(
        error.message ? error.message : error.response.data.message
      );
    }
  };

  useEffect(() => {
    setLoading(true)
    fetchMessSendInfo()
      .then((data) => {
        //* check data is empty or not
        if (data.length !== 0) {
          //* check templateinfo templateName is equal any data templateName, if it true then make the send to true
          template.forEach((temp) => {
            data.forEach((data) => {
              if (temp.templateName === data.name) {
                setTemplate((prev) => {
                  return prev.map((temp) => {
                    if (temp.templateName === data.name) {
                      return {
                        ...temp,
                        send: true,
                      };
                    }
                    return temp;
                  });
                });
              }
            });
          });
        }
      })
      .catch((err) => {
        setErr(err);
      });
      setLoading(false);
  }, []);

  const handleSend = async (templateName) => {
    try {
      setLoading(true);
      await axiosapi.get(`/cus/wa/${cusId}?template=${templateName}`);
      //* make the send to true
      setTemplate((prev) => {
        return prev.map((temp) => {
          if (temp.templateName === templateName) {
            return {
              ...temp,
              send: true,
            };
          }
          return temp;
        });
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex lg:justify-center lg:grow mt-5 md:mt-0 lg:mt-5 gap-2 md:gap-4 lg:gap-5 md:mx-10 lg:mx-10 relative">
      {template.map((template) => (
        <Button
          key={template.templateName}
          onClick={() => handleSend(template.templateName)}
          color={template.send ? "green" : "blue"}
          size="sm"
          style={
            template.send
              ? { cursor: "not-allowed"}
              : {}
          }
          disabled={loading}
        >
          {template.btnLable}
        </Button>
      ))}
      {loading &&
        <div className="absolute">
          <Spinner color="orange" className="w-8 h-8" />
        </div>
      }
    </div>
  );
}

export default MessageBtn;
