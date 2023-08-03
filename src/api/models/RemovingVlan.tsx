"use client"

export default async function RemovingVlanModel(vlan: string) {
    return (`
no configure service vpls ${vlan}
no configure vlan id ${vlan} \n`
    );
}