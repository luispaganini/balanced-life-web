import IUserInterface from '@/interfaces/User/IUserInterface'
import api from '../api'
import ITokenInterface from '@/interfaces/Login/ITokenInterface'

export async function loginVerifyCPF(cpf: string): Promise<IUserInterface> {
    const response = await api.post('/login/verify', { cpf })
    if (response.status !== 200 && response.status !== 204)
        throw new Error(response.data.message)

    return response.data
}

export async function login(cpf: string, password: string): Promise<ITokenInterface> {
    const response = await api.post('/login', { cpf, password })

    if (response.status == 401) 
        return {
            success: false,
            accessToken: null,
            refreshToken: null
        }

    return response.data
}

export async function createAccount(user: IUserInterface): Promise<IUserInterface> {
    const response = await api.post('/user', user)
    if (response.status !== 201)
        return response.data.message

    return response.data
}