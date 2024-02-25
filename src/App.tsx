import { useState } from 'react';
import './App.css';

export interface Country {
  id: number;
  name: string;
  selected: boolean;
}

export const countriesData: Country[] = [
  { id: 1, name: 'India', selected: false },
  { id: 2, name: 'USA', selected: false },
  { id: 3, name: 'France', selected: false },
];

export const App = ()=> {
  const [countries, setCountries] = useState<Country[]>(countriesData);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setCountries(countries.map((country: Country) => ({ ...country, selected: !selectAll })));
  };

  const toggleSelectCountry = (id: number) => {
    const updatedCountries = countries.map((country: Country) =>
      country.id === id ? { ...country, selected: !country.selected } : country
    );
    setCountries(updatedCountries);
    setSelectAll(updatedCountries.every((country: Country) => country.selected));
  };

  return (
    <div className="container app-container">
      <div className='head-container'>
        <h1>Country Selector</h1>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="SelectAll"
            data-testid="selectAll"
            checked={selectAll}
            onChange={toggleSelectAll}
          />
          <label className="form-check-label" htmlFor="selectAll">
            Select All
          </label>
        </div>
      </div>
      <ul className="list-group mt-3">
        {countries.map(country => (
          <li key={country.id} className="list-group-item">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`country${country.id}`}
                data-testid={`country${country.id}`}
                checked={country.selected || false}
                onChange={() => toggleSelectCountry(country.id)}
              />
              <label className="form-check-label" htmlFor={`country${country.id}`}>
                {country.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};