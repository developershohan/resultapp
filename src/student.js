const search_form = document.querySelector("#search_form")
const student_result = document.querySelector(".student_result")


search_form.onsubmit = (e) =>{
    e.preventDefault()


    const oldData = getDataLS("students")

    
    const formData = new FormData(e.target)
    const searchFormData = Object.fromEntries(formData.entries())

    console.log(searchFormData);

    const studentResult = oldData.find(item => item.roll === searchFormData.roll && item.reg === searchFormData.reg )

    console.log(studentResult);
    let content;

        content = `
        <h3>${studentResult.name}</h3>
        `

    student_result.innerHTML = content
}