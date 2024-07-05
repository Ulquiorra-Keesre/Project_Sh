// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css'; 
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// document.getElementById("submitButton").addEventListener("click", function() {
//   const keyword = document.getElementById("keywordSelect").value;

//   fetch("http://localhost:8000/items", {
//     method: "POST",
//     headers: {
//       "Content-Type": "text/plain"
//     },
//     body: keyword
//   })

//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();

//   })
//   .then(data => {
//     const resultsDiv = document.getElementById("results");
//     resultsDiv.innerHTML = "";

//     data.forEach(vacancy => {
//       const div = document.createElement("div");
//       div.textContent = `Title: ${vacancy.title}, Salary: ${vacancy.salary}, Skills: ${vacancy.skills}, Employment: ${vacancy.employment}, Workload: ${vacancy.workload}`;
//       resultsDiv.appendChild(div);
//     });
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// });


// document.getElementById("submitButton").addEventListener("click", function() {
//   const keyword = document.getElementById("keywordSelect").value;

//   fetch("http://localhost:8000/items", {
//     method: "POST",
//     headers: {
//       "Content-Type": "text/plain"
//     },
//     body: keyword
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response;
//   })
//   .then(data => {
//     const resultsDiv = document.getElementById("results");
//     resultsDiv.innerHTML = "";

//     data.forEach(vacancy => {
//       const div = document.createElement("div");
//       div.textContent = `Title: ${vacancy.title}, Salary: ${vacancy.salary}, Skills: ${vacancy.skills}, Employment: ${vacancy.employment}, Workload: ${vacancy.workload}`;
//       resultsDiv.appendChild(div);
//     });
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// });

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

document.getElementById("submitButton").addEventListener("click", async function() {
  const keyword = document.getElementById("keywordSelect").value;

  try {
    // Отправка POST запроса на сервер
    const response = await fetch("http://localhost:8000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ keyword: keyword, per_page: 20 })  
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Получение данных с сервера с помощью GET запроса
    const data = await fetch("http://localhost:8000/items")
      .then(response => response.json());

    // Обработка полученных данных
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    data.items.forEach(vacancy => {
      const div = document.createElement("div");
      const title = vacancy.title || 'No title';
      const salary = vacancy.salary || 'No salary from info';
      const skills = vacancy.skills || 'No skills from info';
      const employment = vacancy.employment || 'No employment info';
      const schedule = vacancy.workload || 'No schedule info';

      div.innerHTML = `
        <h3>${title}</h3>
        <p>${salary}</p>
        <p>${skills}</p>
        <p>Employment: ${employment}</p>
        <p>Schedule: ${schedule}</p>
      `;
      resultsDiv.appendChild(div);
    });

  } catch (error) {
    console.error('Error:', error);
  }
});
