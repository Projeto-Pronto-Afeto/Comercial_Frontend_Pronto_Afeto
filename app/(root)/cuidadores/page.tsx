"use client";
import { useState, useEffect } from "react";
import { getCuidadoresByStatus } from "@/actions/cuidador/cuidador.actions";
import CuidadorList from "@/components/CuidadorList";
import ButtonFilter from "@/components/main/filters/ButtonFilter";

const CuidadorApprovalPage = ({ searchParams }: { searchParams: { [key: string]: string | undefined | string[] } }) => {
  const status = typeof searchParams.status === "string" ? searchParams.status : "Em_Observacao";

  const [cuidadores, setCuidadores] = useState<Caregiver[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCuidadores = async (page: number) => {
    try {
      const response = await getCuidadoresByStatus(page, 12, status);
      console.log("Resposta da API:", response);

      setCuidadores(response.content || []); // Garante que cuidadores seja sempre um array.
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Erro ao buscar cuidadores:", error);
      setCuidadores([]); // Em caso de erro, inicializa como array vazio.
    }
  };

  useEffect(() => {
    fetchCuidadores(currentPage);
  }, [currentPage, status]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="admin-main">
      <section className="w-full py-6">
        <h1 className="md:text-3xl sm:text-2xl font-bold">Cuidadores</h1>
        <p className="text-dark-600 text-sm">Gerencie as solicitações dos seus clientes com facilidade</p>
      </section>
      <section className="flex flex-col gap-6 w-full">
        <div>
          <div className="flex justify-between">
            <div>
              <span className="text-sm text-black-40">
              {cuidadores ? `${cuidadores.length} Solicitações de cuidadores` : "Carregando..."}
              </span>
            </div>
            <div className="my-auto">
              <ButtonFilter baseRoute="cuidadores" approvalValue="Aprovado" pendingValue="Em_Observacao" rejectedValue="Negado" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 py-6">
            <CuidadorList caregivers={cuidadores}></CuidadorList>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`btn ${currentPage === 0 ? "btn-disabled" : ""}`}
            >
              Anterior
            </button>
            <span className="text-sm">
              Página {currentPage + 1} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className={`btn ${currentPage >= totalPages - 1 ? "btn-disabled" : ""}`}
            >
              Próxima
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CuidadorApprovalPage;
