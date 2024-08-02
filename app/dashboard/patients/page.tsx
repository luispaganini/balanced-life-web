import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableFour from "@/components/Tables/TableFour";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pacientes - Balanced Life",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Pacientes" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default TablesPage;
