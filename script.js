
function getSettings() {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const responseField = document.getElementById('responseField'); 
            responseField.textContent = JSON.stringify(data, null, 2); 
        })
        .catch(error => {
            console.error('Error fetching account settings:', error);
        });
}


function getStateInstance() {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;

    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const responseField = document.getElementById('responseField');
            responseField.textContent = `Account state: ${data.stateInstance}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function sendMessage() {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const messageText = document.getElementById('messageText').value;

    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const payload = {
        chatId: `${phoneNumber}@c.us`,
        message: `${messageText}`
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseField").innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error("Error sending message:", error);
    });
}


function sendFileByUrl() {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const phoneNumber = document.getElementById('phoneNumber2').value;
    const url = document.getElementById('url').value;

    const chatId = phoneNumber + '@c.us';

    const fileName = url.substring(url.lastIndexOf('/') + 1);

    const payload = {
        chatId: chatId,
        urlFile: url,
        fileName: fileName,
    };

    fetch(`https://api.green-api.com/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseField').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error sending file:', error);
        document.getElementById('responseField').innerText = 'Error sending file. Please check console for details.';
    });
}
