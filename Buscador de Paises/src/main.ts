const input = document.getElementById("nomePais") as HTMLInputElement;
const button = document.getElementById("botaoBuscar") as HTMLButtonElement;
const resultDiv = document.getElementById("respostaPais") as HTMLDivElement;

type Pais = {
  name: { common: string; nativeName?: Record<string, { common: string }> };
  capital?: string[];
  population: number;
  flags: { svg: string };
};

async function buscarPais(nomePais: string): Promise<Pais | null> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${nomePais}?fullText=true&lang=pt`);
    if (!response.ok) throw new Error("País não encontrado");
    const dados: Pais[] = await response.json();
    return dados[0];
  } catch {
    return null;
  }
}

function exibirPais(pais: Pais | null) {
  if (!pais) {
    resultDiv.innerHTML = `<p>❌ País não encontrado.</p>`;
    return;
  }

  const nomeExibicao = pais.name.common;

  resultDiv.innerHTML = `
    <h2>${nomeExibicao}</h2>
    <p>Capital: ${pais.capital?.[0] ?? "Não informada"}</p>
    <p>População: ${pais.population.toLocaleString("pt-BR")}</p>
    <img src="${pais.flags.svg}" alt="Bandeira de ${nomeExibicao}" />
  `;
}

button.addEventListener("click", async () => {
  const nomePais = input.value.trim();

  if (!nomePais) {
    exibirPais(null);
    return;
  }

  resultDiv.innerHTML = `<p>⏳ Buscando ${nomePais}...</p>`;

  const pais = await buscarPais(nomePais);
  exibirPais(pais);
});
