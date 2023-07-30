"use client";

export default function RemoveOnuModel(positioning: string) {
return `configure bridge port ${positioning}/14/1 no vlan-id 1005
configure bridge port ${positioning}/14/1 no vlan-id 202
configure equipment ont interface ${positioning} admin-state down
exit 
no interface ${positioning}
exit all \n`;
}
