import { useState } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute top-5">
      <div className="relative flex justify-center items-center w-24 h-24">
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex justify-center items-center w-full h-full rounded-full bg-gray-200 border-[0.2rem] border-white overflow-hidden"
        >
          {image ? (
            <Image
              src={image}
              alt="Uploaded profile"
              layout="fill"
              className="object-cover rounded-full border-[0.2rem] border-white hover:opacity-50"
            />
          ) : (
            <FiUpload className="text-gray-500 text-3xl" />
          )}
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
