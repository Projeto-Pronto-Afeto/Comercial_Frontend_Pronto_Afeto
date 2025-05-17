import Image from "next/image";
import { useState } from "react";

interface ProfileImageProps {
  nome: string;
  fotoUrl?: string;
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ nome, fotoUrl, size = 50 }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return !imageError && fotoUrl ? (
    <Image
      src={fotoUrl}
      alt={nome}
      width={size}
      height={size}
      className="rounded-full"
      onError={() => setImageError(true)}
    />
  ) : (
    <div
      className="rounded-full flex items-center justify-center bg-gray-100 text-purple-800 font-medium"
      style={{ width: size, height: size, fontSize: size / 4 }}
    >
      {getInitials(nome || "A")}
    </div>
  );
};

export default ProfileImage;