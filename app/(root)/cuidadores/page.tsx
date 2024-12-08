import { getCuidadoresByStatus } from "@/actions/cuidador/cuidador.actions";
import CuidadorCard from "@/components/CuidadorCard";
import CuidadorList from "@/components/CuidadorList";

const CuidadorApprovalPage = async () => {
    //Vai pegar em obersavação by default
    let cuidadores = await getCuidadoresByStatus();

    return (
        <div>
            <CuidadorList caregivers={cuidadores}></CuidadorList>
        </div>
    );
};

export default CuidadorApprovalPage;