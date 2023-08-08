const create_student_form = document.querySelector("#create_student_form");
const alertMsg = document.querySelector(".msg");
const all_student_list = document.querySelector(".all_student_list");

//show data

const getStudent = () => {
    const students = getDataLS("students")
    
    console.log(students);

    let content = ""

    students.map((student, index) => {
        content += `
        <tr>
        <th scope="row">${index+1}</th>
        <td>
          <img style="width: 60px; height: 60px; object-fit: cover;"
            src="${student.photo}"
            alt="${student.photo}">
        </td>
        <td>${student.name}</td>
        <td>${student.roll}</td>
        <td>${student.reg}</td>
        <td>${timeAgo(student.createdTime)}</td>
        <td>
          <button type="button" class="btn btn-primary">Add Result</button>
        </td>
        <td>
          <button class="btn btn-sm bg-info text-light"><i class="fa-solid fa-eye"></i></button>
          <button class="btn btn-sm bg-warning text-light"><i class="fa-solid fa-edit"></i></button>
          <button class="btn btn-sm bg-danger text-light"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
        `
    })
    all_student_list.innerHTML = content
}
getStudent()

create_student_form.addEventListener("submit", function (e) {
    e.preventDefault()

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries())


    if (!data.name || !data.roll || !data.reg) {
        alertMsg.innerHTML = createAlert("Fill all input")
    } else if (!isNum(data.roll)) {
        alertMsg.innerHTML = createAlert("Invalid Roll")

    } else if (!isNum(data.reg)) {
        alertMsg.innerHTML = createAlert("Invalid Reg")

    } else {

        const oldStudent = getDataLS("students")
        oldStudent.push({
            ...data,
            result: null,
            createdTime: Date.now()
        })

        sendDataLS("students", oldStudent)
        alertMsg.innerHTML = createAlert(` <strong> ${data.name}</strong> added`, "success")
        e.target.reset()
        getStudent()

    }
})