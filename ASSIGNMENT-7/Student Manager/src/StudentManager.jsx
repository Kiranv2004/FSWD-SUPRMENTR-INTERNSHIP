import { useState } from 'react'

function StudentManager() {
  const [students, setStudents] = useState([
    { name: 'Kiran', marks: [85, 90, 78] },
    { name: 'Ravi', marks: [76, 88, 82] },
    { name: 'Asha', marks: [91, 84, 89] },
  ])
  const [studentName, setStudentName] = useState('')
  const [studentMarks, setStudentMarks] = useState('')

  // Calculates the average from a marks array.
  function calculateAverage(marks) {
    const total = marks.reduce((sum, mark) => sum + mark, 0)
    return total / marks.length
  }

  // Adds a new student from input values.
  function handleAddStudent() {
    const parsedMarks = studentMarks
      .split(',')
      .map((mark) => Number(mark.trim()))
      .filter((mark) => !Number.isNaN(mark))

    if (!studentName.trim() || parsedMarks.length === 0) {
      window.alert('Enter a valid name and comma-separated marks.')
      return
    }

    const newStudent = {
      name: studentName.trim(),
      marks: parsedMarks,
    }

    setStudents((prevStudents) => [...prevStudents, newStudent])
    setStudentName('')
    setStudentMarks('')

    console.log('Added student:', newStudent)
  }

  // Calculates and stores averages for all students.
  function handleCalculateAverages() {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((student) => ({
        ...student,
        average: calculateAverage(student.marks),
      }))

      console.log('Average results:')
      updatedStudents.forEach((student) => {
        console.log(`${student.name}: ${student.average.toFixed(2)}`)
      })

      return updatedStudents
    })
  }

  return (
    <section className="student-manager">
      <h1>Student Marks Manager</h1>
      <p className="subtitle">Manage student marks and calculate averages instantly.</p>

      <div className="controls">
        <input
          type="text"
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)}
          placeholder="Student name"
        />
        <input
          type="text"
          value={studentMarks}
          onChange={(event) => setStudentMarks(event.target.value)}
          placeholder="Marks (example: 85, 90, 78)"
        />
      </div>

      <div className="actions">
        <button type="button" className="primary-btn" onClick={handleAddStudent}>
          Add Student
        </button>
        <button
          type="button"
          className="secondary-btn"
          onClick={handleCalculateAverages}
        >
          Calculate Averages
        </button>
      </div>

      <ul className="student-list">
        {students.map((student, index) => (
          <li key={`${student.name}-${index}`} className="student-card">
            <h3>{student.name}</h3>
            <p className="student-meta">Marks: {student.marks.join(', ')}</p>
            <p className="student-meta average">
              Average:{' '}
              {typeof student.average === 'number'
                ? student.average.toFixed(2)
                : 'Not calculated'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StudentManager