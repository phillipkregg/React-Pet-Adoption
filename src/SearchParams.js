import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';
import Results from './Results';

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);

    console.log(animals);
  }

  useEffect(() => {

    setBreeds([]);
    setBreed("");

    // API call
    pet.breeds(animal).then((apiBreeds) => {
      const breedStrings = apiBreeds.breeds.map(({ name }) => name);
      setBreeds(breedStrings);

    }, console.error);
  }, [animal, setBreed, setBreeds]) // run useEffect when these change


  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets();

      }}>
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={e => setLocation(e.target.value)}
            onBlur={e => setLocation(e.target.value)}
          >
          </input>
        </label>

        <AnimalDropdown/>
        <BreedDropdown/>


        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  )
};

export default SearchParams;