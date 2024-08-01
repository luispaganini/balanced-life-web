import api from "../api"

export async function resetPasswordGenerateCode(idUser: number) {
    const response = await api.post(`/password/reset-code/generate`, {
        idUser
    })
    
    return response
}

export async function verifyPasswordCode(verificationCode: string) {
    const response = await api.post(`/password/reset-code/verify`, {
        verificationCode
    })

    return response
}