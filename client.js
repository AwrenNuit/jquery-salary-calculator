$(document).ready(onReady);

function onReady(){
    $('#submit-emp').on('click', addEmployee);
    $('#table-data').on('click', '.delete', deleteEmployee);
    $('.table-heading').wrapInner('<span title="sort column" />');
}

let allEmployees = [];
let subtotal = 0;
let total = 0;

function sortTable(n){
    let rows, i, x, y, shouldSwitch, switchCount = 0;
    let table = $('table')[0];
    let switching = true;
    let dir = 'asc';

    while(switching){
        switching = false;
        rows = table.rows;
        for(i=1; i< (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('td')[n];
            y = rows[i + 1].getElementsByTagName('td')[n];
            if(dir === 'asc'){
                if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
                    shouldSwitch = true;
                    break;
                }
            }
            else if(dir === 'desc'){
                if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if(shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
            allEmployees = $('tbody tr').map(function(i, row){
                let salary = row.cells[4].textContent;

                return {
                    'firstName': row.cells[0].textContent,
                    'lastName': row.cells[1].textContent,
                    'ID': +row.cells[2].textContent,
                    'title': row.cells[3].textContent,
                    'annualSalary': +salary.replace(/\$/g, '')
                }
            }).get();
        }
        else{
            if(switchCount === 0 && dir === 'asc'){
                dir = 'desc';
                switching = true;
            }
        }
    }
} //end sortTable

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