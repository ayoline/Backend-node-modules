const apiUrl = 'http://192.168.15.101:3000'

loadTableOrderByBranchLine();

const btnAddEmployee = document.querySelector('#btn-add-employee');
btnAddEmployee.onclick = function () { showForms() };

const inputAddName = document.querySelector('#add-name-input');
const inputAddBranch = document.querySelector('#add-branch-input');
const inputAddEmail = document.querySelector('#add-email-input');
const inputAddSector = document.querySelector('#add-sector-input');
const inputAddDate = document.querySelector('#add-date-input');

const btnAddConfirm = document.querySelector('#btn-add-confirm');
btnAddConfirm.onclick = function () {
    if (inputAddName.value && inputAddBranch.value && inputAddEmail.value && inputAddSector.value && inputAddDate.value) {
        saveNewEmployee();
    } else {
        alert('Please fill in all fields!');
    }
}
const btnCloseAddForms = document.querySelector('#btn-in-close-add-forms');
btnCloseAddForms.innerHTML = "X";
btnCloseAddForms.onclick = function () { closeForms() }

const addEmployeeForms = document.querySelector('#add-employee-forms');

const sectorInput = document.querySelector('#sector-input');
const birthdayMonthSelected = document.querySelector('#birthday-option');
const btnSearch = document.querySelector('#btn-search');
let pid = 0;
const minNumberOfCharToStartTrigger = 1;

function saveNewEmployee() {
    const element = {};
    const dateFormated = new Date(inputAddDate.value).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    element.name = inputAddName.value;
    element.branch = inputAddBranch.value;
    element.email = inputAddEmail.value;
    element.sector = inputAddSector.value;
    element.birthday = dateFormated;

    saveEmployeeOnServer(element);
}

function saveEmployeeOnServer(_element) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(_element)
    };

    fetch(apiUrl + '/save/savedata', requestOptions).then(resp => resp.text()).then(el => {
        el = JSON.parse(el);
        console.log(el);
        if (!el.error) {
            const addedEmployee = [];

            closeForms();
            addedEmployee.push(el)
            loadFilteredTable(addedEmployee);
        } else {
            console.log('damn!');
        }
    });
}

function loadTableOrderByBranchLine() {
    const line = true;

    fetch(apiUrl + `/employees/branch?value=${true}`).then(resp => resp.text()).then(element => {
        element = JSON.parse(element);

        loadFilteredTable(element);
    });
}

birthdayMonthSelected.onchange = function () {
    sectorInput.value = "";
    const birthdayMonth = birthdayMonthSelected.value;

    fetch(apiUrl + `/employees/birthday?value=${birthdayMonth}`).then(resp => resp.text()).then(element => {
        element = JSON.parse(element);

        loadFilteredTable(element);
    });

}

sectorInput.addEventListener('input', function () {
    triggersTheSearch(sectorInput, filterByInput);
});

btnSearch.onclick = function () {
    const inputValue = sectorInput.value;

    if (inputValue) {
        filterByInput(inputValue, inputName);
    } else {
        alert("Digite algum valor!");
    }
}

function triggersTheSearch(_inputValue, _filterByInput) {
    const reqPart = _inputValue.value;

    if (reqPart.length < minNumberOfCharToStartTrigger) {
        loadFirstLineTable();
        clearTimeout(pid);
        return;
    }

    clearTimeout(pid);

    pid = setTimeout(() => {
        _filterByInput(reqPart);
    }, 1000);
}

function filterByInput(_inputValue) {
    fetch(apiUrl + `/employees/sector?value=${_inputValue}`).then(resp => resp.text()).then(element => {
        element = JSON.parse(element);
        loadFilteredTable(element);
    });
}

function loadFilteredTable(_element) {
    loadFirstLineTable();

    if (!_element.error) {
        for (let i = 0; i < _element.length; i++) {
            const el = _element[i];
            document.querySelector("#table").innerHTML += `
            <tr>
                <td>${el.id}</td>
                <td>${el.name}</td>
                <td>${el.branch}</td>
                <td>${el.email}</td>
                <td>${el.sector}</td>
                <td>${el.birthday}</td>
            </tr>
            `;
        }
    } else {
        errorMsg(_element.msg);
    }
}

function loadFirstLineTable() {
    document.querySelector("#table").innerHTML = `
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Branch-line</th>
        <th>Email</th>
        <th>Sector</th>
        <th>Birthday</th>
    </tr>
    `;
}

function errorMsg(_str) {
    document.querySelector("#table").innerHTML += `
    <tr>
        <td>${_str}</td>
        <td></td>
        <td></td>
    </tr>
    `;
}

function showForms() {
    addEmployeeForms.style.display = "block";
    addEmployeeForms.style.visibility = "visible";
    addEmployeeForms.style.opacity = "1";
}

function closeForms() {
    addEmployeeForms.style.visibility = "hidden";
    addEmployeeForms.style.opacity = "0";
}