const apiUrl = 'http://192.168.16.70:3000'
const line = 131;
const birthdayMonth = 10;
const sector = 'Miscellaneous';

fetch(apiUrl)
    .then(resp => resp.text())
    .then(el => {
        console.log(el);
    });

fetch(apiUrl + `/employees/branch?value=${line}`).then(resp => resp.text()).then(element => {
    element = JSON.parse(element);
    console.log(element);
});

fetch(apiUrl + `/employees/birthday?value=${birthdayMonth}`).then(resp => resp.text()).then(element => {
    element = JSON.parse(element);
    console.log(element);
});

fetch(apiUrl + `/employees/sector?value=${sector}`).then(resp => resp.text()).then(element => {
    element = JSON.parse(element);
    console.log(element);
});