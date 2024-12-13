import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TbCheck } from "react-icons/tb";
import AcceptForm from "../form/AcceptForm";

export const AcceptDialog = ({ proposalId }: { proposalId: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-1 text-xs text-green-700 cursor-pointer ">
          <TbCheck className="text-lg" />
          <p className="my-auto"> Aceitar</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Aceitar Proposta</DialogTitle>
          <DialogDescription className="text-black/80">
            Informe o valor e as observações da proposta para que o contrato
            seja criado
          </DialogDescription>
        </DialogHeader>
        <AcceptForm proposalId={proposalId} />
      </DialogContent>
    </Dialog>
  );
};
export default AcceptDialog;
