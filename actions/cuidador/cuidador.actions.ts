export async function getCuidadoresByStatus(page:number = 0, limit:number = 12,status ='Em_Observacao'):Promise<CaregiverDtoGet>{
    const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1/order_by_stats?page=${page}&limit=${limit}&status=${status}`
    );
    const stringUrl = url.toString();
    console.log("🚀 ~ stringUrl", stringUrl) ;
    try {
        const response = await fetch(stringUrl,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    
        console.log("🚀 ~ data", data);
        return data;
      } catch (error) {
        console.error("Failed to fetch propostas:", error);
        throw error; // Re-throw the error after logging it
    }
}

export function setCuidadorStatus(id:number, status:'Negado'|'Em_Observacao'|'Aprovado'){
    console.log(`Respondendo cuidador ID: ${id}`);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1/atualizar_status_cuidador/${id}`
    );

    const payload = {
      statusCuidador: status
    }

    //Por algum motivo isso aqui dá problema de CORS no preflight. A mesma chamada funciona no insomnia.
    fetch(url.toString(),{
        method: 'PATCH',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log("🚀 ~ res", res)
    }).catch(err => {
        console.error("Falha de alterar status do cuidador:", err);
        throw err; 
    });
}