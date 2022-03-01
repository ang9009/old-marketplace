import React from "react";

interface Props {
  name: string;
  placeholder: string;
  height: number;
  required?: boolean;
  defaultValue?: string;
  maxLength?: number;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  margin?: string;
  value?: string;
  onChange?: (e) => any;
}

const PrimaryTextArea: React.FC<Props> = ({
  name,
  placeholder,
  height,
  required = true,
  defaultValue = "",
  maxLength = 4000,
  mt,
  mb,
  ml,
  mr,
  margin,
  value = "",
  onChange = (e) => {},
}) => {
  return (
    <React.Fragment>
      <p className="form-field-heading">{placeholder}</p>
      <textarea
        placeholder={placeholder}
        name={name}
        required={required}
        defaultValue={defaultValue}
        maxLength={maxLength}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
      />

      <style jsx>{`
        textarea {
          margin-top: ${mt};
          margin-bottom: ${mb};
          margin-left: ${ml};
          margin-right: ${mr};
          margin: ${margin};
          resize: none;
          width: 100%;
          height: ${height}px;
          color: #2b2b2b;
          background: var(--primaryBackgroundColor);
          outline: 1px solid var(--primaryBorderColor);
          border: none;
          border-radius: 12px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
          font-size: 0.8rem;
          padding: 15px;
          transition: all 0.05s;
        }

        textarea:focus {
          outline: 1px solid #2683ff;
          outline-offset: 0;
        }
      `}</style>
    </React.Fragment>
  );
};

export default PrimaryTextArea;
