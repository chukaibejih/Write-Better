import React from "react";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  return (
    <div >
      <label >{props.label}</label>
      <input
        {...props}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

Input.defaultProps = {
  className: "",
  value: "",
  label: "Label",
};

export default Input;
