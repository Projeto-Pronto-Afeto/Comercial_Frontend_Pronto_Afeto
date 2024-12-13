import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TbPlus } from "react-icons/tb";
import Image from "next/image";
import FormCreateUser from "../form/FormCreateUser";
const CreateUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="bg-black text-xs text-white pr-5 rounded-xl "
        >
          <TbPlus className="text-xs" />
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px] p-0 bg-white">
        <FormCreateUser />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
