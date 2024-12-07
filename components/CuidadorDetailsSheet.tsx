const CuidadorDetailsSheet = ({ cuidador }: { cuidador: Caregiver }) => {
  return (
    <div>
      <h1>{cuidador.nome}</h1>
      <p>{cuidador.endereco}</p>
      <p>{cuidador.telefone}</p>
    </div>
  );
}

export default CuidadorDetailsSheet;
