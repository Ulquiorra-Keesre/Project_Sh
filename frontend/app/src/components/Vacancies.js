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

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Vacancies = () => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/items');
        setVacancies(response.data);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };

    fetchVacancies();
  }, []);

  return (
    <div>
      <h1>Vacancies</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Salary</th>
            <th>Skills</th>
            <th>Employment</th>
            <th>Workload</th>
          </tr>
        </thead>
        <tbody>
          {vacancies.map((vacancy, index) => (
            <tr key={index}>
              <td>{vacancy.title}</td>
              <td>{vacancy.salary}</td>
              <td>{vacancy.skills}</td>
              <td>{vacancy.employment}</td>
              <td>{vacancy.workload}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vacancies;

