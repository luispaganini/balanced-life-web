import IUserInterface from "@/interfaces/User/IUserInterface"
import api from "../api"
import IErrorInterface from "@/interfaces/IErrorInterface"

export async function patchUser(user: IUserInterface, idUser: number): Promise<IUserInterface | IErrorInterface> {
    const response = await api.patch(`/user/${idUser}`, user)
    if (response.status !== 200)
        return response.data

    return response.data
}