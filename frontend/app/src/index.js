document.getElementById("submitButton").addEventListener("click", function() {
  const keyword = document.getElementById("keywordSelect").value;

  fetch("http://localhost:8000/items", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ keyword: keyword })
  })
  .then(response => response.json())
  .then(() => {
      fetch("http://localhost:8000/items")
          .then(response => response.json())
          .then(data => {
              const resultsDiv = document.getElementById("results");
              resultsDiv.innerHTML = ""; 

              data.forEach(vacancy => {
                  const div = document.createElement("div");
                  div.textContent = `Title: ${vacancy.title}, Salary: ${vacancy.salary}, Skills: ${vacancy.skills}, Employment: ${vacancy.employment}, Workload: ${vacancy.workload}`;
                  resultsDiv.appendChild(div);
              });
          })
          .catch(error => console.error('Error:', error));
  })
  .catch(error => console.error('Error:', error));
});