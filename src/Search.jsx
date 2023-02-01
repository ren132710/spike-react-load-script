import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const options = {
  //types: ['(cities)'],
  types: ['geocode'],
  //componentRestrictions: { country: 'us' },
  fields: ['name', 'geometry.location'],
};

function handlePlaceSelection(place) {
  const param = {
    id: uuidv4(),
    location: place.name,
    lat: place.geometry.location.lat(),
    long: place.geometry.location.lng(),
  };
  console.log('getWeather with param', param);
}

export default function Search() {
  console.log('Search rendered!');
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    console.log('useEffect autoComplete');
    autoCompleteRef.current =
      new window.google.maps.places.Autocomplete(
        inputRef.current,
        options,
      );

    console.log('autoCompleteRef.current', autoCompleteRef.current);

    autoCompleteRef.current.addListener('place_changed', () => {
      const place = autoCompleteRef.current.getPlace();
      console.log('place', place);
      if (!place.geometry) return;
      handlePlaceSelection(place);
    });
  }, []);

  // async if needed
  // autoCompleteRef.current.addListener(
  //   'place_changed',
  //   async function () {
  //     const place = await autoCompleteRef.current.getPlace();
  //     if (!place.geometry) return;
  //     handleSelect(place);
  //   },
  // );

  // clear the input field with the user clicks away
  useEffect(() => {
    console.log('useEffect click away');
    const clearInput = () => {
      inputRef.current.value = '';
    };
    window.addEventListener('click', clearInput);
    return () => {
      console.log('useEffect click away - cleanup');
      window.removeEventListener('click', clearInput);
    };
  }, []);

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Weather at your places"
      ref={inputRef}
      data-testid="place-search"
    />
  );
}
