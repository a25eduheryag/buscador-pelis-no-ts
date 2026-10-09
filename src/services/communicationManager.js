const URLpelis = "http://www.omdbapi.com/?i=tt3896198&apikey=82e4d9a4&"

export async function cercar(text) {
    const url = `${URLpelis}s=${text}`
    const resposta = await fetch(url)
    const dades = await resposta.json()

    console.log(dades)

    return dades.Search
}

export async function obtenirDetallPelicula(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=82e4d9a4`
    const resposta = await fetch(url)
    const dades = await resposta.json()

    console.log(dades)

    return dades
}