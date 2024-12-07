import { getCuidadoresByStatus } from "@/actions/cuidador/cuidador.actions";
import CuidadorCard from "@/components/CuidadorCard";

const CuidadorApprovalPage = async () => {
    //Vai pegar em obersavação by default
    let cuidadores = await getCuidadoresByStatus();

    return (
        <div>
            <CuidadorCard></CuidadorCard>
            <CuidadorCard></CuidadorCard>
            <CuidadorCard></CuidadorCard>
        </div>
    );
};

export default CuidadorApprovalPage;