export default async function deleteUser(storedToken: string, userId: string) {
  let urlApi = process.env.NEXT_PUBLIC_URL_API;
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${storedToken}`,
    "Content-Type": "application/json"
   }
   
   let response = await fetch(`${urlApi}/deletarUsuario/${userId}`, { 
     method: "DELETE",
     headers: headersList
   });
   
   let data = await response.json();
  //  console.log(data);
   return data;   
}