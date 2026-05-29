



export default function StudentTable({
    students,
  }) {
    return (
      <table className="w-full border">
        <thead>
          <tr>
            <th>Chest</th>
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
    );
  }
  