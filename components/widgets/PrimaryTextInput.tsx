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
  isNumeric?: boolean;
  inputType?: HTMLInputTypeAttribute;
  register?: any;
  boxShadow?: string;
  value?: any;
  onChange?: (e) => any;
  error?: {
    message?: string;
  };
}

const PrimaryTextInput: React.FC<Props> = ({
  placeholder,
  name,
  value = "",
  backgroundColor = "var(--primaryBackgroundColor)",
  border = "1px solid var(--primaryBorderColor);",
  padding = "17px 10px",
  margin = "0",
  borderRadius = "12px",
  onChange = () => {},
  isNumeric = false,
  fontSize = "0.8rem",
  width = "100%",
  minWidth = "0",
  required = true,
  inputType = "text",
  boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
  register,
  error,
}) => {
  return (
    <>
      <div>
        <p className="form-field-heading">{placeholder}</p>
        <input
          value={value}
          className={error?.message && "invalid"}
          type={inputType}
          name={name}
          id={name}
          placeholder={placeholder}
          required={required}
          onChange={(e) => {
            if (isNumeric) {
              e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
            }

            onChange(e);
          }}
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
          outline: ${border};
          border: none;
          padding: ${padding};
          border-radius: ${borderRadius};
          font-size: ${fontSize};
          box-shadow: ${boxShadow};
          transition: all 0.05s;
          width: 100%;
        }

        input:focus {
          outline: 1px solid #2683ff;
          outline-offset: 0;
        }

        input.invalid {
          outline-color: var(--errorColor);
        }

        .err-msg {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default PrimaryTextInput;
