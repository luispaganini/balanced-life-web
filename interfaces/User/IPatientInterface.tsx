import StatusNutritionistEnum from "@/enums/StatusNutritionistEnum";

export default interface IPatientInterface {
    id: number;
    name: string;
    isCurrentNutritionist: boolean;
    linkStatus: StatusNutritionistEnum
    age: number;
}