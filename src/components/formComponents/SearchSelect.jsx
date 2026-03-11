import { useEffect, useState } from "react";
import Select from "react-select";

const SearchSelect = ({
  options,
  defaultInputValue,
  name,
  setValue,
  setDealerPhoneNoUsingDealerId,
}) => {
  const [loading, setLoading] = useState(true);
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    const setOptionsToState = async () => {
      setLoading(true);
      //* map the options and set the options state
      setSelectOptions(
        options.map((option) => ({
          label: `${option.name} - ${
            option.shopname !== "" ? option.shopname : option.place
          }`,
          value: option._id,
        }))
      );
      setLoading(false);
    };

    setOptionsToState();
  }, [options]);

  return (
    <Select
      options={selectOptions}
      defaultInputValue={defaultInputValue || ""}
      isLoading={loading}
      isClearable
      isSearchable
      placeholder="Select Dealer"
      name={name}
      onChange={(e) => {
        setValue(name, e.value);
        if (setDealerPhoneNoUsingDealerId) {
          setDealerPhoneNoUsingDealerId(e); // Call the additional function if it's passed in
        }
      }}
    />
  );
};

export default SearchSelect;
