const input = document.getElementById("countryInput") as HTMLInputElement;
const button = document.getElementById("searchBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

type Country = {
  name: { common: string; nativeName?: Record<string, { common: string }> };
  capital?: string[];
  population: number;
  flags: { svg: string };
};

async function fetchCountry(countryName: string): Promise<Country | null> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true&lang=pt`);
    if (!response.ok) throw new Error("País não encontrado");
    const data: Country[] = await response.json();
    return data[0];
  } catch {
    return null;
  }
}

function renderCountry(country: Country | null) {
  if (!country) {
    resultDiv.innerHTML = `<p>❌ País não encontrado.</p>`;
    return;
  }

  const countryNamePt = country.name.common;

  resultDiv.innerHTML = `
    <h2>${countryNamePt}</h2>
    <p>Capital: ${country.capital?.[0] ?? "Não informada"}</p>
    <p>População: ${country.population.toLocaleString("pt-BR")}</p>
    <img src="${country.flags.svg}" alt="Bandeira de ${countryNamePt}" />
  `;
}

button.addEventListener("click", async () => {
  const countryName = input.value.trim();

  if (!countryName) {
    renderCountry(null);
    return;
  }

  resultDiv.innerHTML = `<p>⏳ Buscando ${countryName}...</p>`;

  const country = await fetchCountry(countryName);
  renderCountry(country);
});
