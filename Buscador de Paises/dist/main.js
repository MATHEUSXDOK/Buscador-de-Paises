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
const input = document.getElementById("nomePais");
const button = document.getElementById("botaoBuscar");
const resultDiv = document.getElementById("respostaPais");
function buscarPais(nomePais) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://restcountries.com/v3.1/name/${nomePais}?fullText=true&lang=pt`);
            if (!response.ok)
                throw new Error("País não encontrado");
            const dados = yield response.json();
            return dados[0];
        }
        catch (_a) {
            return null;
        }
    });
}
function exibirPais(pais) {
    var _a, _b;
    if (!pais) {
        resultDiv.innerHTML = `<p>❌ País não encontrado.</p>`;
        return;
    }
    const nomeExibicao = pais.name.common;
    resultDiv.innerHTML = `
    <h2>${nomeExibicao}</h2>
    <p>Capital: ${(_b = (_a = pais.capital) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "Não informada"}</p>
    <p>População: ${pais.population.toLocaleString("pt-BR")}</p>
    <img src="${pais.flags.svg}" alt="Bandeira de ${nomeExibicao}" />
  `;
}
button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const nomePais = input.value.trim();
    if (!nomePais) {
        exibirPais(null);
        return;
    }
    resultDiv.innerHTML = `<p>⏳ Buscando ${nomePais}...</p>`;
    const pais = yield buscarPais(nomePais);
    exibirPais(pais);
}));
