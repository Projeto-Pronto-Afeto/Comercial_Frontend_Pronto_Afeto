declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "Feminino" | "Masculino" | "Outro";
  declare type Status = "Pendente" | "Rejeitado" | "Assinado";

  declare interface Proposal {
    id: number;
    status: Status;
    data: string;
    dataSolicitacao: string;
    dias: string[];
    turnos: string[];
    valor: number;
    endereco: {
      rua: string;
      numero: number;
      bairro: string;
      cidade: string;
      estado: string;
      cep: string;
    };
    observacoes?: string;
  };