const create_student_form = document.querySelector("#create_student_form");
const alertMsg = document.querySelector(".msg");
const all_student_list = document.querySelector(".all_student_list");
const singleStudentInfo = document.querySelector(".singleStudentInfo");
const edit_student_form = document.querySelector("#edit_student_form");
const msg_edit = document.querySelector(".msg_edit");

//show data

const getStudent = () => {
    const students = getDataLS("students")

    console.log(students);

    let content = ""

    if (students.length > 0) {

        students.map((student, index) => {
            content += `
        <tr>
        <th scope="row">${index + 1}</th>
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
          <button class="btn btn-sm bg-info text-light" data-bs-toggle="modal" data-bs-target="#showStudentInfo" onClick = showStudentData('${student.id}')><i class="fa-solid fa-eye" ></i></button>

          <button class="btn btn-sm bg-warning text-light"  data-bs-toggle="modal" data-bs-target="#editStudentInfo" onClick = "updateStudent('${student.id}')"><i class="fa-solid fa-edit"></i></button>
          <button class="btn btn-sm bg-danger text-light" onClick = "deleteStudent('${student.roll}')" ><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
        `
        })

    } else {
        content = `
        <tr>
        <td colspan= "8" class = "text-center" >No data found</td>
        </tr>
        `
    }
    all_student_list.innerHTML = content

}
getStudent()


// delete data
const deleteStudent = (roll) => {

    const deleteConfirm = confirm(`Are you sure, Your data will be delete`)

    if (deleteConfirm) {
        const oldStudent = getDataLS("students")
        const updatedStudate = oldStudent.filter((data) => data.roll != roll);
        sendDataLS("students", updatedStudate);
        getStudent()
    } else {
        alert(`Your data is safe`)
    }

}

// view data
const showStudentData = (id) => {
    const allStudents = getDataLS("students");
    const singleStudent = allStudents.find(item => item.id === id)

    singleStudentInfo.innerHTML = `
    <img class="w-25"
    src="${singleStudent.photo}"
    alt="" srcset="" />
  <div class="details">
    <h3><span>Name: </span>${singleStudent.name}</h3>
    <p><span>Roll: <span>${singleStudent.roll} </span> | <span>Reg: <span>${singleStudent.reg}</p>
  </div>
    `
}
// edit data
const updateStudent = (id) => {
    const oldStudent = getDataLS("students")
    const newData = oldStudent.find((item) => item.id === id)
    edit_student_form.querySelector("input[name='id']").value = newData.id
    edit_student_form.querySelector("input[name='name']").value = newData.name
    edit_student_form.querySelector("input[name='roll']").value = newData.roll
    edit_student_form.querySelector("input[name='reg']").value = newData.reg
    edit_student_form.querySelector("input[name='photo']").value = newData.photo
    edit_student_form.querySelector("img").setAttribute("src", newData.photo)

}

edit_student_form.onsubmit = (e) => {



    e.preventDefault()

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries())



    if (!data.name || !data.roll || !data.reg) {
        msg_edit.innerHTML = createAlert("Fill all input")
    } else if (!isNum(data.roll)) {
        msg_edit.innerHTML = createAlert("Invalid Roll")

    } else if (!isNum(data.reg)) {
        msg_edit.innerHTML = createAlert("Invalid Reg")

    } else {

        const getOldData = getDataLS("students")
        getOldData[getOldData.findIndex(item => item.id === data.id)] = {
            ...getOldData[getOldData.findIndex(item => item.id === data.id)],
            ...data
        }
        sendDataLS("students", getOldData)
        getStudent()
        msg_edit.innerHTML = createAlert(` Updated`, "success")
    }
}


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


        if (oldStudent.some(item => item.roll === data.roll)) {
            alertMsg.innerHTML = createAlert("Roll already registered")
            return;
        }


        if (oldStudent.some(item => item.reg === data.reg)) {
            alertMsg.innerHTML = createAlert("Reg already registered")
            return;
        }

        oldStudent.push({
            ...data,
            result: null,
            createdTime: Date.now(),
            id: randomUniqueId()

        })

        sendDataLS("students", oldStudent)
        alertMsg.innerHTML = createAlert(` <strong> ${data.name}</strong> added`, "success")
        e.target.reset()
        getStudent()

    }
})