import { useEffect, useState } from "react";
import { SupaBaseFunction } from "../../lib/SupaBase";


import { createStudent } from "/../services/studentService.js";

export default function StudentForm({ onAdded }) {
  const [teams, setTeams] = useState([]);

  const [formData, setFormData] = useState({
    chest_no: "",
    student_name: "",
    class: "",
    category: "",
    team_id: "",
  });

  useEffect(() => {
    loadTeams();
  }, []);

  async function loadTeams() {
    const { data, error } = await SupaBaseFunction
      .from("teams")
      .select("*")
      .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setTeams(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createStudent(formData);

      setFormData({
        chest_no: "",
        student_name: "",
        class: "",
        category: "",
        team_id: "",
      });

      if (onAdded) {
        onAdded();
      }

      alert("Student Added Successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-4">
        Add Student
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3"
      >
        <input
          type="text"
          placeholder="Chest No"
          value={formData.chest_no}
          onChange={(e) =>
            setFormData({
              ...formData,
              chest_no: e.target.value,
            })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Student Name"
          value={formData.student_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              student_name: e.target.value,
            })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Class"
          value={formData.class}
          onChange={(e) =>
            setFormData({
              ...formData,
              class: e.target.value,
            })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
          className="border p-2 rounded"
          required
        />

        <select
          value={formData.team_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              team_id: e.target.value,
            })
          }
          className="border p-2 rounded"
          required
        >
          <option value="">
            Select Team
          </option>

          {teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
            >
              {team.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}