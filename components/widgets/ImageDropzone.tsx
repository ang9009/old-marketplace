import React, { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";

type ImageType = { url: string; file: File };

interface Props {
  image: ImageType;
  setImage: Dispatch<SetStateAction<ImageType>>;
}

const ImageDropzone: React.FC<Props> = ({ image, setImage }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    setImage({ url, file: acceptedFiles[0] });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    minSize: 1024,
    maxSize: 3072000,
    multiple: false,
  });

  return (
    <>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag a file here or click to select a file</p>
        {image?.url && <p className="preview-text">Drag another image here to replace</p>}
        {image?.url && <img src={image.url} alt={image.file.name} className="image" />}
      </div>

      <style jsx>{`
        .dropzone {
          width: 100%;
          height: 400px;
          background: ${image?.file ? "black" : "var(--secondaryBackgroundColor)"};
          border: ${image?.file
            ? "1px solid var(--primaryBorderColor)"
            : "1px dashed var(--primaryBorderColor)"};
          border-spacing: 20px;
          position: relative;
          transition: 0.2s all;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        }

        .dropzone:hover {
          cursor: pointer;
          background: ${image?.file || "#dddddd"};
        }

        .dropzone input {
          position: absolute;
          inset: 0;
        }

        .image {
          position: absolute;
          border: none;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: contain;
          z-index: 2;
        }

        .dropzone p {
          position: absolute;
          top: 50%;
          left: 50%;
          text-align: center;
          transform: translate(-50%, -50%);
          font-size: 0.8rem;
          white-space: nowrap;
          color: #757575;
        }

        .preview-text {
          position: absolute;
          width: fit-content;
          font-weight: 700;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 3;
          padding: 10px 20px;
          border-radius: 12px;
          background: var(--primaryBackgroundColor);
          opacity: 0.5;
          font-size: 15px !important;
        }
      `}</style>
    </>
  );
};

export default ImageDropzone;
