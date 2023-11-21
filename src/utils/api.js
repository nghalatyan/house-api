import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer testtoken'
        config.headers['accept'] = 'application/json'
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export async function getStreets() {
    return axios.get(`${backendUrl}request/streets`)
}

export async function getHouses(id) {
    return axios.get(`${backendUrl}request/houses/${id}`)
}

export async function getHousingStock(houseId, streetId) {
    return axios.get(`${backendUrl}HousingStock`,  {
        params: {
            streetId,
            houseId
        }
    })
}

export async function getClients(addressId) {
    return axios.get(`${backendUrl}HousingStock/clients`, {
        params: { addressId }
    })
}

export async function createClient(data) {
    return axios.post(`${backendUrl}HousingStock/client`, data, {
        headers: {
            "Content-Type": "application/json-patch+json"
        }
    })
}

export async function deleteClient(id) {
    return axios.delete(`${backendUrl}HousingStock/bind_client/${id}`)
}

export async function bindClient(ClientId, AddressId) {
    return axios.put(`${backendUrl}HousingStock/bind_client`, {
        AddressId,
        ClientId
    })
}
