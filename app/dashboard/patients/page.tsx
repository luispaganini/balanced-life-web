// app/dashboard/patients/page.tsx
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PatientsTable from "@/components/Tables/PatientsTable";
import IPatientInterface from "@/interfaces/User/IPatientInterface";
import { getPatients } from "@/services/user/user";

const TablesPage = async () => {
    let patients = 
    [
        {
            id: 1,
            name: "João",
            age: 25,
            isCurrentNutritionist: true,
            linkStatus: 1,
        },
        {
            id: 2,
            name: "Maria",
            age: 30,
            isCurrentNutritionist: false,
            linkStatus: 2,
        },
        {
            id: 3,
            name: "José",
            age: 35,
            isCurrentNutritionist: true,
            linkStatus: 1,
        },
        {
            id: 4,
            name: "Ana",
            age: 40,
            isCurrentNutritionist: false,
            linkStatus: 3,
        },
    ] as IPatientInterface[];
    try {
        // patients = await getPatients();

    } catch (error) {
        console.error(error);
    }

    return (
        <>
            <Breadcrumb pageName="Pacientes" />

            <div className="flex flex-col gap-10">
                <PatientsTable patients={patients} />
            </div>
        </>
    );
};

export default TablesPage;
