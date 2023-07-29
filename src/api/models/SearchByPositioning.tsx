"use client"

export default function SearchByPositioning(positioning: string) {
    return `show vlan bridge-port-fdb ${positioning}/14/1 \n`;
}