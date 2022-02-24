import { GroupBase, StylesConfig } from "react-select";
import { Option } from "./data";

export const reactSelectStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  valueContainer: (provided) => ({
    ...provided,
    padding: "17px 10px",
    fontSize: "0.8rem",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "0.8rem",
    outline: "1px solid var(--primaryBorderColor)",
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: "12px",
    border: "1px solid var(--primaryBorderColor)",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
    background: !state.isDisabled ? "var(--primaryBackgroundColor)" : "var(--secondaryBackgroundColor)",
    cursor: "pointer",
  }),
  option: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};
