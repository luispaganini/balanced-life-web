import IUserInterface from "../User/IUserInterface";
import ITokenInterface from "./ITokenInterface";

export default interface ISessionAuthInterface {
    auth: ITokenInterface
    user: IUserInterface
}