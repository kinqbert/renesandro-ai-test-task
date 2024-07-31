import React, { useEffect } from "react";
import "./ImageUploadField.scss";

interface ImageUploadProps {
  label: string;
  images: File[];
  setImages: (files: File[]) => void;
  previews?: string[];
  setPreviews?: (urls: string[]) => void;
}

const ImageUploadField: React.FC<ImageUploadProps> = ({
  label,
  images,
  setImages,
  previews = [],
  setPreviews = () => {},
}) => {
  useEffect(() => {
    if (setPreviews && images.length > 0) {
      const newPreviews = images.map((file) => {
        try {
          return URL.createObjectURL(file);
        } catch (error) {
          console.error("Invalid file for preview generation:", file, error);
          return "";
        }
      });
      setPreviews(newPreviews.filter((url) => url !== ""));

      return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [images, setPreviews]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
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
