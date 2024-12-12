import CuidadorCard from "./CuidadorCard";
import { setCuidadorStatus } from "@/actions/cuidador/cuidador.actions";
import CuidadorDetailsSheet from "./CuidadorDetailsSheet";

interface CuidadorListProps {
  caregivers: Caregiver[];
}

const CuidadorList: React.FC<CuidadorListProps> = ({ caregivers }) => {
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 py-6 ">
      {" "}
      {caregivers.map((item: Caregiver) => (
        <CuidadorCard caregiver={item} />
      ))}
    </div>
  );
};

export default CuidadorList;
