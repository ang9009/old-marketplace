import React, { useCallback } from "react";
import PrimaryTextInput from "../../../components/widgets/PrimaryTextInput";
import Select from "react-select";
import { listingTypeOptions, yearLevelOptions } from "../../../data/data";
import { useDropzone } from "react-dropzone";

const addListing: React.FC = () => {
  return (
    <>
      <form className="page-container">
        <h1 className="form-title">Add listing</h1>
        <p className="form-field-heading">Type</p>
        <Select
          className="basic-single"
          // options={listingTypeOptions}
          placeholder={"Select listing type"}
          value={"test"}
          isSearchable={false}
        />
        <PrimaryTextInput placeholder={"Listing name"} name={"Listing name"} />
        <p className="form-field-heading">Profile picture</p>
        <div className="dropzone">
          <input />
          <p>Drag files here or click to select files</p>
        </div>
        <p className="form-field-heading">Subject category</p>
        <Select
          className="basic-single"
          // options={listingTypeOptions}
          placeholder={"Subject category"}
          value={"test"}
          isSearchable={false}
        />
        <p className="form-field-heading">Year level</p>
        <Select
          className="basic-single"
          // options={yearLevelOptions}
          placeholder={"Subject category"}
          value={"test"}
          isSearchable={false}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default addListing;
