"use client"

export default async function BridgeProvisioningWithWifiModel(
    positioning: string,
    clientName: string,
    clientAddress: string,
    equipmentAssets: string,
    vlan: string
) {
    return (
`configure equipment ont interface ${positioning} sw-ver-pland auto esc1 "${clientName}" desc2 "${clientAddress}"sernum ${equipmentAssets} sw-dnload-version auto pland-cfgfile1 auto dnload-cfgfile1 auto plnd-var BRIDGE
configure equipment ont interface ${positioning} admin-state up
configure equipment ont slot ${positioning}/1 planned-card-type ethernet plndnumdataports 1 plndnumvoiceports 0 admin-state up
configure qos interface ${positioning}/1/1 upstream-queue 0 bandwidth-profile name:HSI_1G_UP 
configure qos interface ${positioning}/1/1 queue 0 shaper-profile name:HSI_1G_DOWN
configure interface port uni:${positioning}/1/1 admin-up
configure bridge port ${positioning}/1/1 max-unicast-mac 64
configure bridge port ${positioning}/1/1 vlan-id ${vlan}
configure bridge port ${positioning}/1/1 pvid ${vlan}
exit all 
\n`
    );
}