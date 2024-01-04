import React from 'react'

export default function removeAccentuation(text: string) {
    const mapaAcentos: any = {
        á: "a",
        é: "e",
        í: "i",
        ó: "o",
        ú: "u",
        â: "a",
        ê: "e",
        î: "i",
        ô: "o",
        û: "u",
        à: "a",
        è: "e",
        ì: "i",
        ò: "o",
        ù: "u",
        ã: "a",
        õ: "o",
        ç: "c",
        ä: "a",
        ë: "e",
        ï: "i",
        ö: "o",
        ü: "u",
        ñ: "n",
    };

    const regexAcentos = /[áéíóúâêîôûàèìòùãõçäëïöüñ]/g;

    return text.replace(
        regexAcentos,
        (match: string | number) => mapaAcentos[match] || match
    );
};

