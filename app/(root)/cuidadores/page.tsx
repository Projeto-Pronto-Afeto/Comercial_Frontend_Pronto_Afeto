import { getCuidadoresByStatus } from "@/actions/cuidador/cuidador.actions";
import CuidadorList from "@/components/CuidadorList";
import ButtonFilter from "@/components/main/filters/ButtonFilter";


const CuidadorApprovalPage = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined | string[] };
  }) => {
    const status =
      typeof searchParams.status === "string" ? searchParams.status : "Em_Observacao";
    //Vai pegar em obersavação by default
    let cuidadores = await getCuidadoresByStatus(0,12,status);

    return (
      <div className="admin-main">
      <section className="w-full py-6">
        <h1 className="md:text-3xl sm:text-2xl font-bold">Cuidadores</h1>
        <p className="text-dark-600 text-sm">
          Gerencie as solicitações dos seus clientes com facilidade
        </p>
      </section>
      <section className="flex flex-col gap-6 w-full ">
        <div>
          <div className="flex justify-between">
            <div className="">
              <span className="text-sm text-black-40">
                {cuidadores.length} Solicitações de cuidadores
              </span>
            </div>
            <div className="my-auto">
              <ButtonFilter baseRoute="cuidadores" approvalValue="Aprovado" pendingValue="Em_Observacao" rejectedValue="Negado"/>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 py-6">
            <CuidadorList caregivers={cuidadores}></CuidadorList>
          </div>
        </div>
      </section>
    </div>
    );
};

export default CuidadorApprovalPage;