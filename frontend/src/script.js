const apiUrl = 'http://192.168.15.101:3000'
const sector = 'Miscellaneous';

fetch(apiUrl + `/employees/sector?value=${sector}`).then(resp => resp.text()).then(element => {
    element = JSON.parse(element);
    console.log(element);
});
// 
// 
// 
// 
// 

loadTableOrderByBranchLine();

const sectorInput = document.querySelector('#sector-input');
const birthdayMonthSelected = document.querySelector('#birthday-option');
const btnSearch = document.querySelector('#btn-search');
let pid = 0;
const minNumberOfCharToStartTrigger = 1;

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
    triggersTheSearch(sectorInput, filterByInputName);
});

btnSearch.onclick = function () {
    const inputName = "sector";
    const inputValue = sectorInput.value;

    if (inputValue) {
        filterByInputName(inputValue, inputName);
    } else {
        alert("Digite algum valor!");
    }
}

function triggersTheSearch(_inputValue, _filterByInput) {
    const reqPart = _inputValue.value;
    const whatIsTheInputName = birthdayMonthSelected.value;

    if (reqPart.length < minNumberOfCharToStartTrigger) {
        loadFirstLineTable();
        clearTimeout(pid);
        return;
    }

    clearTimeout(pid);

    pid = setTimeout(() => {
        _filterByInput(reqPart, whatIsTheInputName);
    }, 2000);
}

function filterByInputName(_inputValue, _inputName) {
    fetch(`/search?${_inputName}=${_inputValue}`).then(resp => resp.text()).then(element => {
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

// async function loadInitialTable() {
//     const response = await fetch('/table');
//     let names = await response.json();

//     for (let i = 0; i < names.length; i++) {
//         const el = names[i];
//         document.querySelector("#table").innerHTML += `
//         <tr>
//             <td>${el.id}</td>
//             <td>${el.name}</td>
//             <td>${el.email}</td>
//         </tr>
//     `;
//     }
// }