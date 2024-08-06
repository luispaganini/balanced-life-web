import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PatientsTable from "@/components/Tables/PatientsTable";
import { getPatients } from "@/services/user/user";
import { redirect } from "next/navigation";

const TablesPage = async () => {
    let patients = await getPatients()

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
