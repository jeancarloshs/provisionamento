"use client";
import { useState } from "react";

export default async function provisioningModel(
  clientName: string,
  clientAddress: string,
  equipmentAssets: string,
  positioning: string
) {
return `configure equipment ont interface ${positioning} sw-ver-pland disabled desc1 "${clientName}" desc2 "${clientAddress}" sernum ${equipmentAssets} sw-dnload-version disabled pland-cfgfile1 PREALCO015 dnload-cfgfile1 PREALCO015
configure equipment ont interface ${positioning} admin-state up
configure equipment ont slot ${positioning}/14 planned-card-type veip plndnumdataports 1 plndnumvoiceports 0
configure equipment ont slot ${positioning}/14 admin-state up
configure qos interface ${positioning}/14/1 upstream-queue 0 bandwidth-profile name:HSI_1G_UP
configure qos interface ${positioning}/14/1 queue 0 shaper-profile name:HSI_1G_DOWN
configure qos interface ${positioning}/14/1 upstream-queue 3 bandwidth-profile name:HSI_1M_UP
configure interface port uni:${positioning}/14/1 admin-up
configure bridge port ${positioning}/14/1 max-unicast-mac 4
configure bridge port ${positioning}/14/1 vlan-id 1005 tag single-tagged
configure bridge port ${positioning}/14/1 vlan-id 202 tag single-tagged
exit all 
\n`;
}