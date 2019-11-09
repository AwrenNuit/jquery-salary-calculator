$(document).ready(onReady);

function onReady(){
    $('#submit-emp').on('click', addEmployee);
    $('#table-data').on('click', '.delete', deleteEmployee);
}

let allEmployees = [];
let subtotal = 0;
let total = 0;

function addEmployee(event){
    event.preventDefault();

    if($('#add-first').val() !== '' && $('#add-last').val() !== '' && $('#add-id').val() !== '' && $('#add-title').val() !== '' && $('#add-salary').val() !== ''){
        let newEmployee = {
            firstName: $('#add-first').val(),
            lastName: $('#add-last').val(),
            ID: +$('#add-id').val(),
            title: $('#add-title').val(),
            annualSalary: +$('#add-salary').val()
        }
        addEmployeeToArray(newEmployee);
        addToTotal(newEmployee);
    }
    $('#add-first').val('');
    $('#add-last').val('');
    $('#add-id').val('');
    $('#add-title').val('');
    $('#add-salary').val('');
} //end addEmployee

function addEmployeeToArray(newEmployee){
        allEmployees.push(newEmployee);
        addToTable(allEmployees);
} //end addEmployeeToArray

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

function addToTotal(cost){
    if(Number.isInteger(cost.annualSalary)){
        subtotal += cost.annualSalary / 12;
        total = Math.round(subtotal * 100)/100;
        updateMonthlyTotal(total);
    }
} //end addToTotal

function deleteEmployee(event){
    let row = $(this).closest('tr');
    let index = $('tr').index(row);
    let minusSalary = allEmployees[index - 1].annualSalary;
    
    if (confirm(`Are you sure you want to delete ${allEmployees[index - 1].firstName} ${allEmployees[index - 1].lastName}?`)){
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