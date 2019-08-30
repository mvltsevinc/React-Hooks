import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './CharPicker.css';

const CharPicker = props => {
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://swapi.co/api/people')
      .then(response => {
        console.log(response);
        if (!response.status) {
          throw new Error('Failed to fetch.');
        }
        const selectedCharacters = response.data.results.slice(0, 5);
        setLoadedChars(
          selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1
          }))
        );
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  let content = <p>Loading characters...</p>;

  if (!isLoading && loadedChars && loadedChars.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {loadedChars.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!loadedChars || loadedChars.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }

  return content;
};

export default CharPicker;
