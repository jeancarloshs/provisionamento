import axios from "axios";

const URL_API = process.env.NEXT_PUBLIC_URL_API_SHEETS_DB;

export default async function saveDbModel(
  clientName: string,
  externalTechnician: string,
  serialNumber: string,
  positioning: string,
  equipmentAssets: string,
  servicesType: string,
  internalTechnician: string
) {
  try {
    const response = await axios.post(
    `${URL_API}/f8t5fv0yuh1xs`,
      {
        data: {
          "CLIENTES": clientName,
          "TÉCNICO 1": externalTechnician,
          "SN": serialNumber,
          "POSICIONAMENTO": positioning,
          "PATRIMONIO": equipmentAssets,
          "TIPO DE ATIVAÇÃO": servicesType,
          "TÉCNICO": internalTechnician,
        },
      },
      {
        auth: {
          username: "LOGIN",
          password: "SENHA",
        },
      }
    );

    // Verifica se a requisição foi bem-sucedida
    if (response.status === 201) {
      alert("Dados enviados para Planilha");
    } else {
      console.error("Erro ao salvar dados na planilha:", response.data);
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}