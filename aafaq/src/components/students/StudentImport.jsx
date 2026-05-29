

import * as XLSX from "xlsx";
import { SupaBaseFunction } from "../../lib/SupaBase.js";

export default function StudentImport({
  onImported,
}) {
  async function handleFile(e) {
    const file = e.target.files[0];

    const data =
      await file.arrayBuffer();

    const workbook =
      XLSX.read(data);

    const sheet =
      workbook.Sheets[
        workbook.SheetNames[0]
      ];

    const json =
      XLSX.utils.sheet_to_json(sheet);

    const { error } =
      await SupaBaseFunction
        .from("students")
        .insert(
          json.map((row) => ({
            chest_no: row.ChestNo,
            student_name:
              row.Student_Name,
            class: row.Class,
            category:
              row.Catogery,
          }))
        );

    if (!error) {
      onImported();
      alert("Imported");
    }
  }

  return (
    <input
      type="file"
      accept=".xlsx,.xls"
      onChange={handleFile}
    />
  );
}