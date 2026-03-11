import { Spinner } from "@material-tailwind/react";

function FormLoadingComp() {
  return (
    <section className="absolute top-1/2 left-1/2">
      <Spinner className="h-7 w-7" color="green" />
    </section>
  );
}

export default FormLoadingComp;
