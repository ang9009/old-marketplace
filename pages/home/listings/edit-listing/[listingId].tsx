import React, { useState } from "react";
import Select from "react-select";

import { reactSelectStyles } from "../../../../data/reactSelectStyles";
import { listingTypeOptions, Option, yearLevelOptions } from "../../../../data/data";
import Condition from "../../../../types/condition.enum";
import PrimaryTextInput from "../../../../components/widgets/PrimaryTextInput";
import PrimaryButton from "../../../../components/widgets/PrimaryButton";
import ImageDropzone from "../../../../components/widgets/ImageDropzone";
import useUpdateSubjectOptions from "../../../../hooks/useUpdateSubjectOptions";
import PrimaryTextArea from "../../../../components/widgets/PrimaryTextArea";
import capitalise from "../../../../utils/capitalise";
import getListing from "../../../../utils/getListing";
import { GetServerSideProps } from "next";
import Listing from "../../../../types/listing.interface";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import useSubmitEditListingForm from "../../../../hooks/useSubmitEditListingForm";

interface Props {
  listingData: Listing;
  listingImgUrl: string;
}

const EditListing: React.FC<Props> = ({ listingData, listingImgUrl }) => {
  const [name, setName] = useState(listingData.name);
  const [price, setPrice] = useState(listingData.price);
  const [condition, setCondition] = useState({
    label: capitalise(listingData.condition),
    value: listingData.condition,
  } as Option);
  const [type, setType] = useState<Option>({
    label: capitalise(listingData.type),
    value: listingData.type,
  } as Option);
  const [image, setImage] = useState<{ url: string; file: File }>({ url: listingImgUrl, file: null });
  const [description, setDescription] = useState(listingData.description);

  const subjectInitialState = {
    label: listingData.subject,
    value: listingData.subject,
  } as Option;
  const yearLevelInitialState = {
    label: `Y${listingData.yearLevel}`,
    value: `${listingData.yearLevel}`,
  } as Option;
  const { subjects, subjectOptions, yearLevel, setSubjects, setPreviousYearLevel, setYearLevel } =
    useUpdateSubjectOptions(subjectInitialState, yearLevelInitialState);

  const { isLoading, addListing } = useSubmitEditListingForm({
    listingType: type?.value,
    yearLevel: parseInt(yearLevel?.value),
    subject: (subjects as Option)?.value,
    image,
    condition: condition?.value as Condition,
    listingId: listingData.id,
  });

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
        <h1 className="form-title">Edit listing</h1>
        <div className="inputs-grid-container">
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

          <div>
            <p className="form-field-heading">Listing type</p>
            <Select
              options={listingTypeOptions}
              placeholder={"Select listing type"}
              isSearchable={false}
              value={type}
              onChange={(e) => {
                setType(e);

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
          </div>

          <div>
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
          </div>

          <div>
            {(type && type.value === "miscellaneous") || (
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
        </div>

        <PrimaryTextArea
          placeholder={"Listing description"}
          name={"description"}
          height={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

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
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listingId = context.query.listingId as string;
  const { listingData } = await getListing(listingId);
  const listingImgUrl = await getDownloadURL(ref(getStorage(), listingId));

  return { props: { listingData, listingImgUrl } };
};

export default EditListing;
