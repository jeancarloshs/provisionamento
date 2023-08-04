"use client"

export default async function CreateVlanModel(
    vlan: string,
    vlanName: string,
) {
    return (
`configure service vpls ${vlan} customer 1 v-vpls vlan ${vlan} create							
configure service vpls ${vlan} description "${vlanName}-${vlan}"							
configure service vpls ${vlan} sap nt-a:eth:1:${vlan} create							
configure service vpls ${vlan} sap lt:1/1/1:${vlan} create							
configure service vpls ${vlan} sap lt:1/1/2:${vlan} create							
configure service vpls ${vlan} sap lt:1/1/3:${vlan} create							
configure service vpls ${vlan} sap lt:1/1/4:${vlan} create							
configure service vpls ${vlan} no shutdown							
configure vlan id ${vlan} mode residential-bridge name  "${vlanName}-${vlan}" in-qos-prof-name name:HSI 
\n`
    );
}