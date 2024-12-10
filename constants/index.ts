export const GenderOptions = ["Masculino", "Feminino", "Outro"];

export const CivilStates = ["Casado(a)", "Solteiro(a)", "Viúvo(a)"];

export const Cuidadores = [
  {
    id: 1,
    nome: "João Silva",
    nomeApresentacao: "João",
    avaliacoes: 5,
    formacao: "Enfermagem",
    sobreMim: "Tenho 10 anos de experiência em cuidados com idosos.",
    endereco: {
      cidade: "São Paulo",
    },
    tempoExperiencia: 10,
    experiencia: [
      { id: 1, descricao: "Trabalho em clínica de repouso" },
      { id: 2, descricao: "Atendimento domiciliar" },
    ],
    habilidades: [
      { id: 1, descricao: "Cuidados paliativos" },
      { id: 2, descricao: "Administração de medicamentos" },
    ],
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    nomeApresentacao: "Maria",
    avaliacoes: 4,
    formacao: "Fisioterapia",
    sobreMim: "Especialista em reabilitação de idosos.",
    endereco: {
      cidade: "Rio de Janeiro",
    },
    tempoExperiencia: 8,
    experiencia: [
      { id: 1, descricao: "Reabilitação pós-cirúrgica" },
      { id: 2, descricao: "Atendimento em casas de repouso" },
    ],
    habilidades: [
      { id: 1, descricao: "Exercícios de mobilidade" },
      { id: 2, descricao: "Terapia ocupacional" },
    ],
  },
  {
    id: 3,
    nome: "Maria Oliveira",
    nomeApresentacao: "Maria",
    avaliacoes: 4,
    formacao: "Fisioterapia",
    sobreMim: "Especialista em reabilitação de idosos.",
    endereco: {
      cidade: "Rio de Janeiro",
    },
    tempoExperiencia: 8,
    experiencia: [
      { id: 1, descricao: "Reabilitação pós-cirúrgica" },
      { id: 2, descricao: "Atendimento em casas de repouso" },
    ],
    habilidades: [
      { id: 1, descricao: "Exercícios de mobilidade" },
      { id: 2, descricao: "Terapia ocupacional" },
    ],
  },
  {
    id: 4,
    nome: "Maria Oliveira",
    nomeApresentacao: "Maria",
    avaliacoes: 4,
    formacao: "Fisioterapia",
    sobreMim: "Especialista em reabilitação de idosos.",
    endereco: {
      cidade: "Rio de Janeiro",
    },
    tempoExperiencia: 8,
    experiencia: [
      { id: 1, descricao: "Reabilitação pós-cirúrgica" },
      { id: 2, descricao: "Atendimento em casas de repouso" },
    ],
    habilidades: [
      { id: 1, descricao: "Exercícios de mobilidade" },
      { id: 2, descricao: "Terapia ocupacional" },
    ],
  },

  // Adicione mais cuidadores conforme necessário
];

export const StatusIcon = {
  Aprovada: "/assets/icons/check.svg",
  Pendente: "/assets/icons/pending.svg",
  Observacao: "/assets/icons/pending.svg",
  Negada: "/assets/icons/cancelled.svg",
};



export const perfisComerciais: PerfilComercial[] = [
  {
    id: 1,
    nome: "João Silva",
    fotoUrl: "/assets/images/profile.png",
    telefone: "(11) 1234-5678",
    email: "exemplo@hotmail.com",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    fotoUrl: "/assets/images/profile.png",
    telefone: "(21) 8765-4321",
    email: "exemplo@hotmail.com",
  },
  {
    id: 3,
    nome: "Carlos Souza",
    fotoUrl: "/assets/images/profile.png",
    telefone: "(31) 2345-6789",
    email: "exemplo@hotmail.com",
  },
  {
    id: 4,
    nome: "Ana Pereira",
    fotoUrl: "/assets/images/profile.png",
    telefone: "(41) 9876-5432",
    email: "exemplo@hotmail.com",
  },
  // Adicione mais perfis conforme necessário
];