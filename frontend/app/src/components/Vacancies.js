// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Vacancies = () => {
//   const [vacancies, setVacancies] = useState([]);

//   useEffect(() => {
//     const fetchVacancies = async () => {
//         try {
//           const response = await axios.get('http://localhost:8000/items');
//           setVacancies(response.data);
//         } catch (error) {
//           console.error('Error fetching vacancies:', error);
//         }
//       };

//       fetchVacancies();
//     }, []);
  
//     return (
//       <div>
//         <h1>Vacancies</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Salary</th>
//               <th>Skills</th>
//               <th>Employment</th>
//               <th>Workload</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vacancies.map((vacancy, index) => (
//               <tr key={index}>
//                 <td>{vacancy.title}</td>
//                 <td>{vacancy.salary}</td>
//                 <td>{vacancy.skills}</td>
//                 <td>{vacancy.employment}</td>
//                 <td>{vacancy.workload}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };
  
//   export default Vacancies;

import React, { useState } from 'react';

function Vacancies() {
  const [keyword, setKeyword] = useState('');
  const [vacancies, setVacancies] = useState([]);

  const handleSearch = async () => {
    try {
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

      const data = await response.json();
      setVacancies(data.items);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
          required
        />
        <button type="submit">Search</button>
      </form>

      <div id="results">
        {vacancies.length > 0 ? (
          vacancies.map((vacancy, index) => (
            <div key={index}>
              <h3>{vacancy.name || 'No title'}</h3>
              <p>{vacancy.salary && vacancy.salary.from ? `From: ${vacancy.salary.from}` : 'No salary info'}</p>
              <p>{vacancy.snippet && vacancy.snippet.requirement ? vacancy.snippet.requirement : 'No skills info'}</p>
              <p>Employment: {vacancy.employment ? vacancy.employment.id : 'No employment info'}</p>
              <p>Schedule: {vacancy.schedule ? vacancy.schedule.id : 'No schedule info'}</p>
            </div>
          ))
        ) : (
          <p>No vacancies found.</p>
        )}
      </div>
    </div>
  );
}

export default Vacancies;
