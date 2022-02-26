import React from "react";

interface Props {
  text: string;
  onClick?: (...any: any) => any;
  buttonType?: "submit" | "reset" | "button";
  disabled?: boolean;
  width?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  margin?: string;
  background?: string;
}

const PrimaryButton: React.FC<Props> = ({
  buttonType = "button",
  text,
  onClick,
  disabled = false,
  width = "max-content",
  mt,
  mb,
  ml,
  mr,
  margin,
  background = "var(--primaryButtonColor)",
}) => {
  return (
    <>
      <button type={buttonType} onClick={onClick} disabled={disabled}>
        {text}
      </button>

      <style jsx>{`
        button {
          margin-top: ${mt};
          margin-bottom: ${mb};
          margin-left: ${ml};
          margin-right: ${mr};
          margin: ${margin};
          padding: 10px 35px;
          border-radius: 12px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          background: ${background};
          color: #fff;
          width: ${width};
        }
      `}</style>
    </>
  );
};

export default PrimaryButton;
