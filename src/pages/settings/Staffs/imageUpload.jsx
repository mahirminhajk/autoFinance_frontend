import { Typography } from "@material-tailwind/react";
import { BsCloudUploadFill } from "react-icons/bs";

function ImgUpload() {
  return (
    <>
      {/* card start */}
      <div className=" flex items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-40 h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-2 pb-2">
            <BsCloudUploadFill className="text-3xl " />
            <Typography className="ml-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </Typography>
            <Typography className=" ml-2 text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </Typography>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      {/* card end */}
    </>
  );
}

export default ImgUpload;
