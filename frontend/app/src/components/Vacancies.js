import React, { useState, useEffect } from 'react';

function Vacancies() {
  const [keyword, setKeyword] = useState('');
  const [vacancies, setVacancies] = useState([]);

  const handleSearch = async () => {
    try {
      // Отправка POST запроса на сервер для поиска вакансий
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

      // Получение данных с сервера с помощью GET запроса
      const getResponse = await fetch("http://localhost:8000/items");
      if (!getResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await getResponse.json();
      setVacancies(data.items);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Загрузка вакансий при загрузке компонента
  useEffect(() => {
    handleSearch();
  }, []);

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
              <h3>{vacancy.title || 'No title'}</h3>
              <p>{vacancy.salary || 'No salary from info'}</p>
              <p>{vacancy.skills || 'No skills from info'}</p>
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