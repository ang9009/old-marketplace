import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

import { reactSelectStyles } from "../../../data/reactSelectStyles";
import PrimaryTextInput from "../../../components/widgets/PrimaryTextInput";
import { listingTypeOptions, Option, yearLevelOptions } from "../../../data/data";
import PrimaryButton from "../../../components/widgets/PrimaryButton";
import ImageDropzone from "../../../components/widgets/ImageDropzone";
import useUpdateSubjectOptions from "../../../hooks/useUpdateSubjectOptions";

const AddListing: React.FC = () => {
  const [listingType, setListingType] = useState(null);
  const [subject, setSubject] = useState(null);
  const [image, setImage] = useState<{ url: string; file: File }>(null);
  const { subjects, subjectOptions, yearLevel, setSubjects, setPreviousYearLevel, setYearLevel } =
    useUpdateSubjectOptions();

  return (
    <>
      <form className="page-container">
        <h1 className="form-title">Add listing</h1>

        <PrimaryTextInput placeholder={"Listing name"} name={"Listing name"} />

        <p className="form-field-heading">Year level</p>
        <Select
          className="basic-single"
          options={yearLevelOptions}
          placeholder={"Year level"}
          value={yearLevel}
          isSearchable={false}
          styles={reactSelectStyles}
          onChange={(e) => {
            setYearLevel((prev) => {
              setPreviousYearLevel(prev);
              return e;
            });
          }}
        />

        <p className="form-field-heading">Type</p>
        <Select
          options={listingTypeOptions}
          placeholder={"Select listing type"}
          isSearchable={false}
          value={listingType}
          onChange={(e) => {
            setListingType(e);
          }}
          styles={reactSelectStyles}
        />

        <p className="form-field-heading">Subject category</p>
        <Select
          isMulti
          className="basic-multi-select"
          options={subjectOptions}
          placeholder={"Subject category"}
          value={subjects}
          styles={reactSelectStyles}
          onChange={(e: MultiValue<Option>) => setSubjects(e)}
          isDisabled={!yearLevel}
        />

        <p className="form-field-heading">Listing image</p>
        <ImageDropzone image={image} setImage={setImage} />

        <PrimaryButton text={"Submit"} mt={"30px"} buttonType={"submit"} />
      </form>

      <style jsx>{`
        .form-title {
          margin-top: 80px;
        }
      `}</style>
    </>
  );
};

export default AddListing;
