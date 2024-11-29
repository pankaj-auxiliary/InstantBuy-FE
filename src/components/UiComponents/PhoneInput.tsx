import PhoneInput from "react-phone-number-input";
import { useField } from "formik";

const PhoneInputField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props?.name);

  return (
    <PhoneInput
      {...props}
      {...field}
      value={field.value}
      defaultCountry="IN"
      onChange={(value) => {
        helpers.setValue(value);
      }}
      limitMaxLength={true}
    />
  );
};

export default PhoneInputField;
