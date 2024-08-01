import React, { useState, useEffect } from "react";
import { fileToBase64 } from "../../utils/fileToBase64";
import { compressImage } from "../../utils/compressImage";
import "./ImageUploadField.scss";

interface ImageUploadProps {
  label: string;
  images: string[]; // Base64 images
  onChange: (files: string[]) => void;
}

const ImageUploadField: React.FC<ImageUploadProps> = ({
  label,
  images,
  onChange,
}) => {
  const [previews, setPreviews] = useState<string[]>(images);

  useEffect(() => {
    setPreviews(images);
  }, [images]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files) as File[]; 
  
      const compressedFiles = await Promise.all(
        files.map((file) => compressImage(file))
      );

      const base64Images = await Promise.all(
        compressedFiles.map((blob) => fileToBase64(blob as File)) 
      );

      setPreviews(base64Images);
      onChange(base64Images)
    }
  };

  const handleOnImageClick = (index: number) => {
    const updatedImages = previews.filter((_, i) => i !== index);
    setPreviews(updatedImages);
  };

  return (
    <div className="image-upload">
      <label className="image-upload__label small-text">{label}</label>
      <label
        htmlFor="image-upload__upload"
        className="image-upload__upload-label small-text"
      >
        Upload files
      </label>
      <input
        id="image-upload__upload"
        className="image-upload__upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div className="image-upload__previews">
        {previews.map((src, index) => (
          <div className="image-upload__preview" key={index}>
            <img
              className="image-upload__preview-image"
              src={src}
              alt={`Preview ${index}`}
              onClick={() => handleOnImageClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadField;
