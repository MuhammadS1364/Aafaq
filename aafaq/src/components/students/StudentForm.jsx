


import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { createStudent } from "../../services/studentService";

export default function StudentForm({ onAdded }) {
  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    chest_no: "",
    student_name: "",
    class: "",
    category: "",
    team_id: "",
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    const { data } = await supabase
      .from("teams")
      .select("*");

    setTeams(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await createStudent(form);

    setForm({
      chest_no: "",
      student_name: "",
      class: "",
      category: "",
      team_id: "",
    });

    onAdded();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 bg-white p-4 rounded-xl shadow"
    >
      <input
        placeholder="Chest No"
        value={form.chest_no}
        onChange={(e) =>
          setForm({
            ...form,
            chest_no: e.target.value,
          })
        }
      />

      <input
        placeholder="Student Name"
        value={form.student_name}
        onChange={(e) =>
          setForm({
            ...form,
            student_name: e.target.value,
          })
        }
      />

      <input
        placeholder="Class"
        value={form.class}
        onChange={(e) =>
          setForm({
            ...form,
            class: e.target.value,
          })
        }
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      />

      <select
        value={form.team_id}
        onChange={(e) =>
          setForm({
            ...form,
            team_id: e.target.value,
          })
        }
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
        className="bg-blue-500 text-white py-2 rounded"
      >
        Add Student
      </button>
    </form>
  );
}
