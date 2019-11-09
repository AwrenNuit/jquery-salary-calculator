$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('#submit-emp').on('click', addEmployee);
    $('#table-data').on('click', '.delete', deleteEmployee);
}

let allEmployees = [];
let subtotal = 0;
let total = 0;

function addEmployee(event){
    event.preventDefault();
    let newEmployee = {
        firstName: $('#add-first').val(),
        lastName: $('#add-last').val(),
        ID: $('#add-id').val(),
        title: $('#add-title').val(),
        annualSalary: parseInt($('#add-salary').val())
    }
    allFieldsFilled(newEmployee);
    subtotal += newEmployee.annualSalary / 12;
    total = Math.round(subtotal * 100)/100;
    updateMonthlyTotal(total);
    // $('#add-first').val('');
    // $('#add-last').val('');
    // $('#add-id').val('');
    // $('#add-title').val('');
    // $('#add-salary').val('');
} //end addEmployee

function allFieldsFilled(newEmployee){
    if($('#add-first').val() !== '' && $('#add-last').val() !== '' && $('#add-id').val() !== '' && $('#add-title').val() !== '' && $('#add-salary').val() !== ''){
        allEmployees.push(newEmployee);
        addToTable(allEmployees);
    }
} //end allFieldsFilled

function addToTable(employee){
    $('#table-data').empty();
    for(let name of employee){
        $('#table-data').append(`<tr>
        <td>${name.firstName}</td>
        <td>${name.lastName}</td>
        <td>${name.ID}</td>
        <td>${name.title}</td>
        <td>$${name.annualSalary}</td>
        <td><button class="delete">DELETE</button></td>
        </tr>`);
    }
} //end addToTable

function confirmAlert(event){
    if (confirm(`Are you sure you want to delete ${allEmployees.firstName} ${allEmployees.lastName}?`)){
        deleteEmployee();
    }
    else{
    }
}

function deleteEmployee(event){
    let row = $(this).closest('tr');
    let index = $('tr').index(row);
    let minusSalary = allEmployees[index - 1].annualSalary;
    
    if (confirm(`Are you sure you want to delete ${allEmployees.firstName} ${allEmployees.lastName}?`)){
        console.log('in yes');
    $(this).closest('tr').remove();
    allEmployees.splice(index - 1, 1);
    subtotal -= minusSalary / 12;
    total = Math.round(subtotal * 100)/100;
    updateMonthlyTotal(total);
    }
    else{ }
} //end deleteEmployee

function updateMonthlyTotal(total){
        $('#total-monthly').empty();
        if(total > 20000){
        $('#total-monthly').append(`<span id="total">$${total}</span>`);
        }
        else{
            $('#total-monthly').append(`<span>$${total}</span>`);
        }
} //end updateMonthlyTotal