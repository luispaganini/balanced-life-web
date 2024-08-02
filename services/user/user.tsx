import IUserInterface from "@/interfaces/User/IUserInterface"
import api from "../api"
import IErrorInterface from "@/interfaces/IErrorInterface"
import IPatientInterface from "@/interfaces/User/IPatientInterface"

export async function patchUser(user: IUserInterface, idUser: number): Promise<IUserInterface | IErrorInterface> {
    const response = await api.patch(`/user/${idUser}`, user)
    if (response.status !== 200)
        return response.data

    return response.data
}

export async function getPatients(): Promise<IPatientInterface[]> {
    const response = await api.get("/user/patients")
    if (response.status !== 200)
        return []

    return response.data
}