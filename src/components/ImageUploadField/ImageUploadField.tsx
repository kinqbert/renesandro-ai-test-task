import React, { useState, useEffect } from "react";
import "./ImageUploadField.scss";
import { fileToBase64 } from "../../utils/fileToBase64";

interface ImageUploadProps {
  label: string;
  images: string[]; // Base64 strings
  setImages: (files: string[]) => void;
}

const ImageUploadField: React.FC<ImageUploadProps> = ({
  label,
  images,
  setImages,
}) => {
  const [previews, setPreviews] = useState<string[]>(images);

  // Update previews when images prop changes
  useEffect(() => {
    setPreviews(images);
  }, [images]);

  // Handle file input change
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      try {
        const base64Images = await Promise.all(files.map(fileToBase64));
        setImages(base64Images);
        setPreviews(base64Images); // Update internal previews state
      } catch (error) {
        console.error("Error converting files to Base64:", error);
      }
    }
  };

  return (
    <div className="image-upload">
      <label className="image-upload__label">{label}</label>
      <input
        className="image-upload__input"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div className="image-upload__previews">
        {previews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="image-upload__preview"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploadField;
