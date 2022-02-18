import React, { HTMLInputTypeAttribute } from "react";

interface Props {
  placeholder: string;
  name: string;
  backgroundColor?: string;
  border?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  fontSize?: string;
  width?: string;
  minWidth?: string;
  required?: boolean;
  inputType?: HTMLInputTypeAttribute;
  register?: any;
  boxShadow?: string;
  error?: {
    message?: string;
  };
}

const PrimaryTextInput: React.FC<Props> = ({
  placeholder,
  name,
  backgroundColor = "var(--secondaryBackgroundColor)",
  border = "none",
  padding = "17px 25px",
  margin = "0",
  borderRadius = "12px",
  fontSize = "0.8rem",
  width = "100%",
  minWidth = "0",
  required = true,
  inputType = "text",
  boxShadow = "0px 4px 8px rgba(103, 103, 103, 0.25)",
  register,
  error,
}) => {
  return (
    <>
      <div>
        <input
          className={error?.message && "invalid"}
          type={inputType}
          name={name}
          placeholder={placeholder}
          required={required}
          {...(register && register(name))}
        />
        <p className="err-msg">{error?.message}</p>
      </div>

      <style jsx>{`
        div {
          margin: ${margin};
          width: ${width};
          min-width: ${minWidth};
        }
        input {
          background: ${backgroundColor};
          border: ${border};
          padding: ${padding};
          border-radius: ${borderRadius};
          font-size: ${fontSize};
          box-shadow: ${boxShadow};
          width: 100%;
        }
        input.invalid {
          border-color: var(--errorColor);
        }
        .err-msg {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default PrimaryTextInput;
