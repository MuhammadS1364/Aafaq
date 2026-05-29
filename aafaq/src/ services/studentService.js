import { SupaBaseFun } from "../lib/SupaBase";

export const getStudents = async () => {
  const { data, error } = await SupaBaseFun
    .from("students")
    .select(`
      *,
      teams(name)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const createStudent = async (student) => {
  const { data, error } = await SupaBaseFun
    .from("students")
    .insert(student)
    .select();

  if (error) throw error;

  return data;
};

export const deleteStudent = async (id) => {
  const { error } = await SupaBaseFun
    .from("students")
    .delete()
    .eq("id", id);

  if (error) throw error;
};