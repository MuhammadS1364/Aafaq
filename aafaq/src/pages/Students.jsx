import { useEffect, useState } from "react";
import StudentForm from "../components/students/StudentForm";
import { createStudent } from "../../services/studentService.js";

export default function Students() {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    try {
      const data = await getStudents();
      setStudents(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <StudentForm
        onAdded={loadStudents}
      />

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4">
          Students
        </h2>

        <table className="w-full border">
          <thead>
            <tr>
              <th>Chest No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Category</th>
              <th>Team</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.chest_no}</td>
                <td>{student.student_name}</td>
                <td>{student.class}</td>
                <td>{student.category}</td>
                <td>
                  {student.teams?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}