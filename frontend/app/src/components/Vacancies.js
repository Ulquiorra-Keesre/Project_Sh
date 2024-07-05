import React, { useState } from 'react';

function Vacancies() {
  const [keyword, setKeyword] = useState('');
  const [vacancies, setVacancies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
     
      const postResponse = await fetch("http://localhost:8000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ keyword: keyword, per_page: 20 })
      });

      if (!postResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const getResponse = await fetch("http://localhost:8000/items");
      if (!getResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await getResponse.json();
      setVacancies(data.items);
      setError(null); 
    } catch (error) {
      setError(error.message); 
      setVacancies([]); 
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
        {error && <p>Error: {error}</p>}
        {vacancies.length > 0 ? (
          vacancies.map((vacancy, index) => (
            <div key={index}>
              <h3>{vacancy.title || 'No title'}</h3>
              <p>{vacancy.salary ? `From: ${vacancy.salary}` : 'No salary info'}</p>
              <p>{vacancy.skills ? vacancy.skills : 'No skills info'}</p>
              <p>Employment: {vacancy.employment || 'No employment info'}</p>
              <p>Schedule: {vacancy.workload || 'No schedule info'}</p>
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
