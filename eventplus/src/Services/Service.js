import axios from 'axios'

//Módulo para trabalhar com apis, Disponobiliza


export const eventsResource = '/Evento'

export const nextEventResource = '/Evento/ListarProximos'

export const eventsTypeResource = '/TiposEvento'

export const myEventsResource = '/PresencaEvento/ListarMinhas'

export const commentaryEventsResource = '/ComentariosEvento'

export const presencesEventsResource = '/PresencaEvento'

export const loginResource = "/Login"




// export const eventsTypeResource


// const apiPort = '7118'
// const localApiUrl = `https://localhost:${apiPort}/api`
const externalApiUri = `https://eventwebapi-eduardo.azurewebsites.net`
// const externalApiUrl = null


const api = axios.create({
    baseURL: externalApiUri
})

export default api

