import React, { useState, useEffect, useRef } from 'react';
import { Airport, searchAirports } from '../../data/airports';
import { MapPin } from 'lucide-react';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function LocationAutocomplete({
  value,
  onChange,
  name,
  label,
  placeholder = "Start typing city or airport code",
  required = false
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [inputValue, setInputValue] = useState(value);
  const [touched, setTouched] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTouched(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    setTouched(true);
    
    if (query.length >= 2) {
      const newSuggestions = searchAirports(query);
      setSuggestions(newSuggestions);
      setIsOpen(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    
    onChange(query);
  };

  const handleSelectSuggestion = (airport: Airport) => {
    const formattedValue = `${airport.city}, ${airport.country} (${airport.code})`;
    setInputValue(formattedValue);
    onChange(formattedValue);
    setIsOpen(false);
    setTouched(true);
  };

  const handleFocus = () => {
    if (inputValue.length >= 2) {
      const newSuggestions = searchAirports(inputValue);
      setSuggestions(newSuggestions);
      setIsOpen(newSuggestions.length > 0);
    }
  };

  const isValid = !touched || (touched && suggestions.some(airport => 
    `${airport.city}, ${airport.country} (${airport.code})` === inputValue
  ));

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          required={required}
          className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 sm:text-sm ${
            !isValid
              ? 'border-red-300 text-red-900 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`}
          placeholder={placeholder}
          autoComplete="off"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={isOpen ? `${name}-suggestions` : undefined}
        />
      </div>
      
      {touched && !isValid && (
        <p className="mt-1 text-sm text-red-600">
          Please select a valid location from the suggestions
        </p>
      )}
      
      {isOpen && suggestions.length > 0 && (
        <ul
          id={`${name}-suggestions`}
          role="listbox"
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          {suggestions.map((airport) => (
            <li
              key={airport.code}
              role="option"
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => handleSelectSuggestion(airport)}
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  {airport.city}, {airport.country} ({airport.code})
                </span>
                <span className="text-sm text-gray-500">
                  {airport.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}