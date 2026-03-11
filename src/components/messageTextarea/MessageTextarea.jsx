import { Textarea, Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import axiosapi from "../../helpers/axiosapi";

function MessageTextarea({
  cusid,
  heading,
  value,
  btnLabel = "Send Message",
  textareaLabel,
}) {
  const [err, setErr] = useState(null);
  const [message, setMessage] = useState(value);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async (e) => {
    try {
      setLoading(true);
      setErr(null); // Clear previous error if any
      setSuccess(null); // Clear previous success message

      await axiosapi.post(`/cus/wa/${cusid}/text`, {
        text: message,
      });

      setSuccess("Message sent successfully!"); // Set success message after successful API call
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErr(error.response.data.message); // Backend error message
      } else {
        setErr(error.message); // General error message (e.g., network issues)
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleSend = async (e) => {
  //   try {
  //     setLoading(true);
  //     await axiosapi.post(`/cus/wa/${cusid}/text`, {
  //       text: message,
  //     });
  //   } catch (error) {
  //     setErr(error.message ? error.response.data.message : error.message);
  //   }
  //   setLoading(false);
  // };

  return (
    <div className="mt-5 relative">
      <Typography className="text-sm lg:text-base font-semibold ">
        {heading}
      </Typography>
      <div className="mt-5 md:mb-5 w-80 max-w-screen-lg sm:w-96 md:mx-10 lg:mx-10">
        <Textarea
          disabled={loading}
          label={textareaLabel}
          defaultValue={value}
          value={message}
          onChange={handleTextareaChange}
        />

        {/* Display error message */}
        {err && <p className="text-red-500 text-sm mt-2">{err}</p>}

        {/* Display success message */}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <Button
          className="mt-2"
          size="sm"
          disabled={loading}
          onClick={handleSend}
        >
          {btnLabel}
        </Button>
        {loading && (
          <div className="absolute top-1/2 left-1/3">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-900"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageTextarea;
