export default async function servicesTypes(storedToken: string) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let app = sessionStorage.getItem("app");
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${storedToken}`,
  };

  let response = await fetch(`${urlApi}/listaServicos/${app}`, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  // console.log("DATA:", data);
  return data
}
