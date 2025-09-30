"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.getElementById("countryInput");
const button = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");
function fetchCountry(countryName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true&lang=pt`);
            if (!response.ok)
                throw new Error("País não encontrado");
            const data = yield response.json();
            return data[0];
        }
        catch (_a) {
            return null;
        }
    });
}
function renderCountry(country) {
    var _a, _b;
    if (!country) {
        resultDiv.innerHTML = `<p>❌ País não encontrado.</p>`;
        return;
    }
    const countryNamePt = country.name.common;
    resultDiv.innerHTML = `
    <h2>${countryNamePt}</h2>
    <p>Capital: ${(_b = (_a = country.capital) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "Não informada"}</p>
    <p>População: ${country.population.toLocaleString("pt-BR")}</p>
    <img src="${country.flags.svg}" alt="Bandeira de ${countryNamePt}" />
  `;
}
button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const countryName = input.value.trim();
    if (!countryName) {
        renderCountry(null);
        return;
    }
    resultDiv.innerHTML = `<p>⏳ Buscando ${countryName}...</p>`;
    const country = yield fetchCountry(countryName);
    renderCountry(country);
}));
