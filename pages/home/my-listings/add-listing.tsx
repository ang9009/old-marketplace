import React, { useCallback, useState } from "react";
import PrimaryTextInput from "../../../components/widgets/PrimaryTextInput";
import Select from "react-select";
import { listingTypeOptions, yearLevelOptions } from "../../../data/data";
import { useDropzone } from "react-dropzone";

const AddListing: React.FC = () => {
  const [listingType, setListingType] = useState(null);
  const [subject, setSubject] = useState(null);

  return (
    <>
      <form className="page-container">
        <h1 className="form-title">Add listing</h1>

        <p className="form-field-heading">Type</p>
        <Select
          options={listingTypeOptions}
          placeholder={"Select listing type"}
          isSearchable={false}
          value={listingType}
          onChange={(e) => {
            setListingType(e);
          }}
        />

        <PrimaryTextInput placeholder={"Listing name"} name={"Listing name"} />

        <p className="form-field-heading">Profile picture</p>
        <div className="dropzone">
          <input />
          <p>Drag files here or click to select files</p>
        </div>

        <p className="form-field-heading">Subject category</p>
        <Select options={listingTypeOptions} placeholder={"Subject category"} isSearchable={false} />

        <p className="form-field-heading">Year level</p>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddListing;
