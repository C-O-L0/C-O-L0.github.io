let allStudents = ["A", "B-", "C", "C-", "B", 1, 4, 5, 2];

let studentWhoPass = allStudents.filter((student) => {
  return (
    student === "A" ||
    student === "A-" ||
    student === "B" ||
    student === "B-" ||
    student === "C" ||
    student >= 3
  );
});

console.log(studentWhoPass);
