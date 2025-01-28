"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  TbBrandSuperhuman,
  TbCircleCheck,
  TbCloudDownload,
  TbLoader2,
} from "react-icons/tb";
import { toast } from "sonner";

interface ButtonDownloadContractProps {
  proposalId: string;
  user?: UserSession;
}

const ButtonDownloadContract: React.FC<ButtonDownloadContractProps> = ({
  proposalId,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    if (!user) {
      setError("Usuário não autenticado");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contratos/v1/${proposalId}/pdf-assinado-download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `contract_${proposalId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  return (
    <div className="  ">
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={handleDownload}
        disabled={loading}
        className="text-xs font-bold rounded-2xl"
      >
        {!loading && <TbCloudDownload className="text-xl mr-2" />}
        {loading && <TbLoader2 className="animate-spin" />}
      </Button>
    </div>
  );
};

export default ButtonDownloadContract;
