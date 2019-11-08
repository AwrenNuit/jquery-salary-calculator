$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('#submit-emp').on('click', addEmployee);
    $('#table-data').on('click', '.delete', deleteEmployee);
}

let allEmployees = [];

function addEmployee(event){
    event.preventDefault();
    let newEmployee = {
        firstName: $('#add-first').val(),
        lastName: $('#add-last').val(),
        ID: $('#add-id').val(),
        title: $('#add-title').val(),
        annualSalary: $('#add-salary').val()
    }
    allFieldsFilled(newEmployee);
    
    // $('#add-first').val('');
    // $('#add-last').val('');
    // $('#add-id').val('');
    // $('#add-title').val('');
    // $('#add-salary').val('');
}

function allFieldsFilled(newEmployee){
    if($('#add-first').val() !== '' && $('#add-last').val() !== '' && $('#add-id').val() !== '' && $('#add-title').val() !== '' && $('#add-salary').val() !== ''){
        allEmployees.push(newEmployee);
        addToTable(allEmployees);
    }
}

function addToTable(employee){
    $('#table-data').empty();
    for(let name of employee){
        $('#table-data').append(`<tr>
        <td>${name.firstName}</td>
        <td>${name.lastName}</td>
        <td>${name.ID}</td>
        <td>${name.title}</td>
        <td>${name.annualSalary}</td>
        <td><button class="delete">DELETE</button></td>
        </tr>`);
    }
}

function deleteEmployee(){
    let row = $(this).closest('tr');
    let index = $('tr').index(row);
    console.log(index);
    $(this).closest('tr').remove();
    allEmployees.splice(index - 1, 1);
}