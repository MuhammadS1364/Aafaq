import { SupaBaseFunction } from "../lib/SupaBase";

export async function getStudents() {
  const { data, error } = await SupaBaseFunction
    .from("students")
    .select(`
      *,
      teams(name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function createStudent(student) {
  const { data, error } = await SupaBaseFunction
    .from("students")
    .insert([student])
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function deleteStudent(id) {
  const { error } = await SupaBaseFunction
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
}

console.log("studentService loaded");