"use client"

export default function SearchByMac(serialNumber: string) {
    return `info configure equipment ont interface flat | match exact:${serialNumber} \n`;
}