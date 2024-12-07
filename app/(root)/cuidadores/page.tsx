import { getCuidadoresByStatus } from "@/actions/cuidador/cuidador.actions";
import CuidadorCard from "@/components/CuidadorCard";

const CuidadorApprovalPage = async () => {
    //Vai pegar em obersavação by default
    let cuidadores = await getCuidadoresByStatus();

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 py-6">
            {" "}
            {cuidadores.map((item: Caregiver) => (
              <CuidadorCard caregiver={item} />
            ))}
          </div>
        </div>
    );
};

export default CuidadorApprovalPage;