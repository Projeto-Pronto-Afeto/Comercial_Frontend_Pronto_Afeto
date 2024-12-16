/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
declare type Session = {
  userName: string;
  isAuthenticated: boolean;
  issuedAt: number;
  expiresAt: number;
  accessToken: string;
  refreshToken: string;
  perfil?: PerfilComercial;
};
interface UserSession extends Session {
  userId: number;

  email: string;
  roles: string[];
}

declare type Gender = "Feminino" | "Masculino";
declare type Status =
  | "Pendente"
  | "Negada"
  | "Aprovada"
  | "Observacao"
  | "Em_Observacao";

  declare type ContractStatus = "Criado" | "Assinado";

  declare interface Patology {
    id: number;
    nome: string;
  }

  declare interface Dispositives {
    id: number;
    nome: string;
  }

  declare interface Caregiver {
    cuidadorId: number;
    fotoUrl: string;
    nome: string;
    nomeApresentacao: string;
    telefone: string;
    rg: string;
    endereco: Address;
    nomePai: string;
    nomeMae: string;
    dataNascimento: [number, number, number]; // [ano, mês, dia]
    peso: number;
    altura: number;
    escolaridade: string; //tipo específico para os níveis de escolaridade
    titulacao: string;
    tempoExperiencia: number;
    experiencias: Experience[];
    habilidades: Hability[];
    apresentacao: string;
    statusCuidador: string; //Deveria ser um enum?
  }

  interface Address {
    rua: string;
    cidade: string;
    estado: string;
    cep: string;
    bairro: string;
    numero: number;
    complemento: string;
    pontoReferencia?: string;
  }

  declare interface Proposal {
    id: number;
    statusProposta: Status;

    dataDeInicio: number[];
    dataHoraInicioPlantao: number[];
    cliente: Client;

    plantao: Plantao;
    cuidado: Cuidado;
    cuidadores: Caregiver[];
    saude: Health;
    localAtendimento: Address;
    observacao?: string;
  }

  declare interface MinimalProposal {
    id: number;
    telefone: string;
    nomeCliente: string;
    nomeCuidado: string;
    dataProposta: number[];
    dataInicioPlantao: ñumber[];
    clienteId: number;
    cuidadoId: number;
    statusProposta: Status;
  }

  interface Pageable<T> {
    content: T[];
    pageable: {
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalElements: number;
    totalPages: number;
  }

  interface ProposalDTOGet extends Pageable<MinimalProposal> {}
  interface PatologyDtoGet extends Pageable<Patology> {}
  interface CaregiverDtoGet extends Pageable<Caregiver> {
    length: ReactNode;
  }
  interface ContratoDTOGet extends Pageable<Contrato> {}
  interface ComercialDTOGet extends Pageable<PerfilComercial> {}

  declare interface Cuidado {
    cpf: string;
    nome: string;
    nomeApresentacao: string;
    dataNascimento: [number, number, number];
    peso: number;
    patologias: Patology[];
    dispositivos: Dispositives[];
  }

  // Reutilização das interfaces existentes
  interface PerfilComercial {
    id: number;
    nome: string;
    email: string;
    fotoUrl: string;
    telefone: string;
  }
  interface Client {
    id: number;
    cpf: string;
    nome: string;
    nomeApresentacao: string;
    telefone: string;
    rg: string;
    endereco: Address;
    nacionalidade: string;
    estadoCivil: string;
  }

  interface Health {
    patologias: Patology[]; // Assumindo que a interface Patology já foi declarada
    alimentacao: string | null;
    EspectorHumor: string | null;
    comentarios: string;
    dispositivos: Dispositives[]; // Assumindo que a interface Dispositives já foi declarada
    hidratacao: string | null;
  }

  interface Plantao {
    turno: string[];
    diasDaSemana: string[]; // Tipagem como array de strings para dias da semana
    alimentacaoFornecida: boolean;
    dataHoraInicioPlantao: [number, number, number, number, number]; // [ano, mês, dia, hora, minuto]
    observacoes: string;
  }

  interface ServiceLocation extends Address {} // LocalAtendimento possui a mesma estrutura que Address

  // Nova tipagem para o objeto completo
  interface Contrato {
    id: number;
    enderecoPrestacao: Address;
    periodo: [number, number, number][]; // Array de datas [ano, mês, dia]
    horarios: [number, number][]; // Array de horários [hora, minuto]
    alimentacaoFornecida: boolean;
    status: ContractStatus;
    valor: number;
    cliente: Client;
    cuidadores: Caregiver[];
    cuidado: Cuidado;
  }

declare interface Hability {
  id: number;
  nome: string;
}
declare interface Experience {
  id: number;
  nome: string;
}

declare interface HabilityDTOGet {
  content: Hability[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
}
