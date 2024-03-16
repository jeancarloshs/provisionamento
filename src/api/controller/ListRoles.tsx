import app from "../helpers/storageHelper";

export default async function listRoles(storedToken: string) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${storedToken}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(`${urlApi}/listaCargo/${app}`, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
//   console.log(data);
  return data
}
