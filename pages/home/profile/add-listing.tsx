import React, { useEffect, useState } from "react";
import Select from "react-select";

import { reactSelectStyles } from "../../../data/reactSelectStyles";
import PrimaryTextInput from "../../../components/widgets/PrimaryTextInput";
import { listingTypeOptions, Option, yearLevelOptions } from "../../../data/data";
import PrimaryButton from "../../../components/widgets/PrimaryButton";
import ImageDropzone from "../../../components/widgets/ImageDropzone";
import useUpdateSubjectOptions from "../../../hooks/useUpdateSubjectOptions";
import LargeTextInput from "../../../components/widgets/PrimaryTextArea";
import useSubmitAddListingForm from "../../../hooks/useSubmitAddListingForm";
import Condition from "../../../types/condition.enum";
import capitalise from "../../../utils/capitalise";
import { IoIosInformationCircle } from "react-icons/io";
import getConditionHint from "../../../utils/getConditionHint";

const AddListing: React.FC = () => {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [listingType, setListingType] = useState<Option>(null);
  const [image, setImage] = useState<{ url: string; file: File }>(null);
  const [condition, setCondition] = useState<Option>(null);
  const [conditionHint, setConditionHint] = useState(null);

  const { subjects, subjectOptions, yearLevel, setSubjects, setPreviousYearLevel, setYearLevel } =
    useUpdateSubjectOptions(null, null);
  const { isLoading, addListing } = useSubmitAddListingForm({
    listingType: listingType?.value,
    yearLevel: parseInt(yearLevel?.value),
    subject: (subjects as Option)?.value,
    image,
    condition: condition?.value as Condition,
  });
  useEffect(() => {
    if (condition) {
      setConditionHint(getConditionHint(condition.value));
    }
  }, [condition]);

  const getConditionObject = () => {
    const result: Option[] = [];
    for (const [_, value] of Object.entries(Condition)) {
      result.push({ label: capitalise(value), value });
    }
    return result;
  };

  return (
    <>
      <form className="page-container" onSubmit={addListing}>
        <h1 className="form-title">Add listing</h1>
        <section className="inputs-grid-container">
          <div>
            <PrimaryTextInput
              placeholder={"Listing name"}
              name={"name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <PrimaryTextInput
            placeholder={"Listing price"}
            name={"price"}
            isNumeric
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </section>

        <LargeTextInput
          placeholder={"Listing description"}
          name={"description"}
          height={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <section className="inputs-grid-container">
          <div>
            <p className="form-field-heading">Intended year level</p>
            <Select
              options={yearLevelOptions}
              placeholder={"Intended year level"}
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
          </div>

          <div>
            {(listingType && listingType.value === "miscellaneous") || (
              <>
                <p className="form-field-heading">Subject category</p>
                <Select
                  options={subjectOptions}
                  placeholder={"Subject category"}
                  value={subjects}
                  styles={reactSelectStyles}
                  onChange={(e: Option) => {
                    setSubjects(e);
                  }}
                  isDisabled={!yearLevel}
                />
              </>
            )}
          </div>

          <div>
            <p className="form-field-heading">Listing type</p>
            <Select
              options={listingTypeOptions}
              placeholder={"Select listing type"}
              isSearchable={false}
              value={listingType}
              onChange={(e) => {
                setListingType(e);

                if (e.value === "miscellaneous") {
                  setSubjects(null);
                }
              }}
              styles={reactSelectStyles}
            />
          </div>

          <div>
            <p className="form-field-heading">Listing condition</p>
            <Select
              options={getConditionObject()}
              value={condition}
              onChange={(e) => setCondition(e)}
              placeholder={"Listing condition"}
              styles={reactSelectStyles}
              isSearchable={false}
            />
            {condition && (
              <div className="condition-hint-container">
                <IoIosInformationCircle />
                <p className="condition-hint-text">{conditionHint}</p>
              </div>
            )}
          </div>
        </section>

        <p className="form-field-heading">Listing image</p>
        <ImageDropzone image={image} setImage={setImage} />

        <PrimaryButton text={"Submit"} mt={"30px"} buttonType={"submit"} disabled={isLoading} />
      </form>

      <style jsx>{`
        .form-title {
          margin-top: 80px;
        }

        .inputs-grid-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-column-gap: 30px;
        }

        .condition-hint-container {
          color: var(--secondaryTextColor);
          margin-top: 5px;
          font-size: 13px;
          display: flex;
          align-items: center;
        }

        .condition-hint-text {
          margin-left: 3px;
        }
      `}</style>
    </>
  );
};

export default AddListing;
