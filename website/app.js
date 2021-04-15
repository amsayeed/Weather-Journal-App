/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const key = 'd5bcf6cab24d0b553afc87c29c88e8f9&units=imperial';

// Create a new date instance dynamically with JS
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let newDate = mm+'.'+ dd+'.'+ yyyy;


document.getElementById('generate').addEventListener('click', generate);

function generate(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getWeatherData(baseURL, zip, key)
        .then(function (data){
            if(data.cod != 200)
            {
                errorUI();
            }
            else
            {
                // Add data to POST request
                console.log(newDate)
                postData('/add', {temperature: data.list[0].main.temp, date: newDate, user_response: feelings } )
                    // Function which updates UI
                    .then(function() {
                        updateUI()
                    })
            }

        })
}

// Async GET
const getWeatherData = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+'&appid='+key)
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        console.log(data.cod)
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}


// Async POST
const postData = async (url = '', data = {}) => {
    const postReq = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postReq;
        console.log(newData)
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

const updateUI = async () => {
    const request = await fetch('/data');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date is ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature is ${allData.temperature}`;
        document.getElementById('content').innerHTML = `I Feel : ${allData.user_response}`;
    }
    catch (error) {
        console.log('error', error);
    }
}

const errorUI = async () => {
    console.log('Error Invalid ZIP Code')
    document.getElementById('error').style.display = "block";
    document.getElementById('error').innerHTML = 'Error Invalid ZIP Code';
}