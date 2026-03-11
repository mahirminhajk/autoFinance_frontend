
import { Typography } from "@material-tailwind/react";
import { BsCloudUploadFill } from "react-icons/bs";

function DealerFormIMG() {
  return (
    <>
      {/* Image uploader */}
      <div className="my-10 ml-10 grid justify-center m-3">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-60 h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <BsCloudUploadFill className="text-5xl " />
            <Typography className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </Typography>
            <Typography className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </Typography>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
        <Typography className="text-base font-bold text-center  text-black-700 mt-5">
          Profile Photo
        </Typography>
      </div>

      {/* Image uploader end*/}
    </>
  );
}

export default DealerFormIMG;
