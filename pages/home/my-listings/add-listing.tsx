import React, { useState } from "react";
import Select from "react-select";

import { reactSelectStyles } from "../../../data/reactSelectStyles";
import PrimaryTextInput from "../../../components/widgets/PrimaryTextInput";
import { listingTypeOptions, Option, yearLevelOptions } from "../../../data/data";
import PrimaryButton from "../../../components/widgets/PrimaryButton";
import ImageDropzone from "../../../components/widgets/ImageDropzone";
import useUpdateSubjectOptions from "../../../hooks/useUpdateSubjectOptions";
import LargeTextInput from "../../../components/widgets/PrimaryTextArea";

const AddListing: React.FC = () => {
  const [listingType, setListingType] = useState<Option>(null);
  const [image, setImage] = useState<{ url: string; file: File }>(null);
  const { subjects, subjectOptions, yearLevel, setSubjects, setPreviousYearLevel, setYearLevel } =
    useUpdateSubjectOptions();

  return (
    <>
      <form className="page-container">
        <h1 className="form-title">Add listing</h1>

        <PrimaryTextInput placeholder={"Listing name"} name={"name"} />

        <p className="form-field-heading">Listing type</p>
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

        <p className="form-field-heading">Year level</p>
        <Select
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

        {(listingType && listingType.value === "miscellaneous") || (
          <>
            <p className="form-field-heading">Subject category</p>
            <Select
              options={subjectOptions}
              placeholder={"Subject category"}
              value={subjects}
              styles={reactSelectStyles}
              onChange={(e: Option) => setSubjects(e)}
              isDisabled={!yearLevel}
            />
          </>
        )}

        <LargeTextInput placeholder={"Listing description"} name={"name"} height={300} />

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
