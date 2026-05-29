



import { useEffect, useState } from "react";

import StudentForm from "../components/students/StudentForm";
import StudentImport from "../components/students/StudentImport";
import StudentTable from "../components/students/StudentTable";

import {
  getStudents,
} from "../services/studentService";

export default function Students() {
  const [students, setStudents] =
    useState([]);

  async function loadStudents() {
    const data =
      await getStudents();

    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="space-y-6">

      <StudentForm
        onAdded={loadStudents}
      />

      <StudentImport
        onImported={loadStudents}
      />

      <StudentTable
        students={students}
      />

    </div>
  );
}
