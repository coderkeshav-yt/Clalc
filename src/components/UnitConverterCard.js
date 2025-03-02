import React, { useState, useEffect } from 'react';

const UnitConverterCard = ({ title, type }) => {
  const [values, setValues] = useState({
    input: '',
    output: '',
    kelvinToCelsius: '',
    kelvinToFahrenheit: '',
    hoursToMinutes: '',
    hoursToSeconds: '',
    daysToHours: '',
    daysToMinutes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (values.input === '') {
      setValues(prev => ({
        ...prev,
        output: '',
        kelvinToCelsius: '',
        kelvinToFahrenheit: '',
        hoursToMinutes: '',
        hoursToSeconds: '',
        daysToHours: '',
        daysToMinutes: ''
      }));
      return;
    }

    const input = parseFloat(values.input);
    let result;

    switch (type) {
      // Length Conversions
      case 'meters-to-feet':
        result = input * 3.28084;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} ft (${Math.floor(result)}' ${((result % 1) * 12).toFixed(1)}\")` }));
        break;
      case 'km-to-miles':
        result = input * 0.621371;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} miles` }));
        break;
      case 'cm-to-inches':
        result = input * 0.393701;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} inches` }));
        break;
      case 'yards-to-meters':
        result = input * 0.9144;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} meters` }));
        break;

      // Mass Conversions
      case 'kg-to-lbs':
        result = input * 2.20462;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} lbs` }));
        break;
      case 'grams-to-oz':
        result = input * 0.035274;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} oz` }));
        break;
      case 'ton-to-kg':
        result = input * 1000;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} kg` }));
        break;

      // Volume Conversions
      case 'liters-to-gallons':
        result = input * 0.264172;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} gallons` }));
        break;
      case 'ml-to-floz':
        result = input * 0.033814;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} fl oz` }));
        break;
      case 'm3-to-ft3':
        result = input * 35.3147;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} cubic feet` }));
        break;

      // Temperature Conversions
      case 'c-to-f':
        result = (input * 9/5) + 32;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)}°F` }));
        break;
      case 'f-to-c':
        result = (input - 32) * 5/9;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)}°C` }));
        break;
      case 'k-to-cf':
        const celsius = input - 273.15;
        const fahrenheit = (celsius * 9/5) + 32;
        setValues(prev => ({
          ...prev,
          kelvinToCelsius: `${celsius.toFixed(2)}°C`,
          kelvinToFahrenheit: `${fahrenheit.toFixed(2)}°F`
        }));
        break;

      // Energy and Power Conversions
      case 'joules-to-cal':
        result = input * 0.239006;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} calories` }));
        break;
      case 'w-to-kw':
        result = input / 1000;
        setValues(prev => ({ ...prev, output: `${result.toFixed(3)} kW` }));
        break;
      case 'hp-to-w':
        result = input * 745.7;
        setValues(prev => ({ ...prev, output: `${result.toFixed(2)} watts` }));
        break;

      // Time Conversions
      case 'hours-to-min-sec':
        const minutes = input * 60;
        const seconds = minutes * 60;
        setValues(prev => ({
          ...prev,
          hoursToMinutes: `${minutes.toFixed(0)} minutes`,
          hoursToSeconds: `${seconds.toFixed(0)} seconds`
        }));
        break;
      case 'days-to-hours-min':
        const hours = input * 24;
        const mins = hours * 60;
        setValues(prev => ({
          ...prev,
          daysToHours: `${hours.toFixed(0)} hours`,
          daysToMinutes: `${mins.toFixed(0)} minutes`
        }));
        break;
    }
  }, [values.input, type]);

  const renderInput = () => {
    let inputLabel = '';
    switch (type) {
      // Length
      case 'meters-to-feet': inputLabel = 'Meters'; break;
      case 'km-to-miles': inputLabel = 'Kilometers'; break;
      case 'cm-to-inches': inputLabel = 'Centimeters'; break;
      case 'yards-to-meters': inputLabel = 'Yards'; break;
      // Mass
      case 'kg-to-lbs': inputLabel = 'Kilograms'; break;
      case 'grams-to-oz': inputLabel = 'Grams'; break;
      case 'ton-to-kg': inputLabel = 'Tons'; break;
      // Volume
      case 'liters-to-gallons': inputLabel = 'Liters'; break;
      case 'ml-to-floz': inputLabel = 'Milliliters'; break;
      case 'm3-to-ft3': inputLabel = 'Cubic Meters'; break;
      // Temperature
      case 'c-to-f': inputLabel = 'Celsius'; break;
      case 'f-to-c': inputLabel = 'Fahrenheit'; break;
      case 'k-to-cf': inputLabel = 'Kelvin'; break;
      // Energy and Power
      case 'joules-to-cal': inputLabel = 'Joules'; break;
      case 'w-to-kw': inputLabel = 'Watts'; break;
      case 'hp-to-w': inputLabel = 'Horsepower'; break;
      // Time
      case 'hours-to-min-sec': inputLabel = 'Hours'; break;
      case 'days-to-hours-min': inputLabel = 'Days'; break;
      default: inputLabel = 'Input';
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{inputLabel}</label>
        <input
          type="number"
          name="input"
          value={values.input}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
          placeholder={`Enter ${inputLabel.toLowerCase()}`}
        />
      </div>
    );
  };

  const renderResult = () => {
    if (!values.input) return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
        {type === 'k-to-cf' ? (
          <>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Celsius: <span className="text-blue-600 dark:text-blue-400">{values.kelvinToCelsius}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Fahrenheit: <span className="text-blue-600 dark:text-blue-400">{values.kelvinToFahrenheit}</span>
            </p>
          </>
        ) : type === 'hours-to-min-sec' ? (
          <>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Minutes: <span className="text-blue-600 dark:text-blue-400">{values.hoursToMinutes}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Seconds: <span className="text-blue-600 dark:text-blue-400">{values.hoursToSeconds}</span>
            </p>
          </>
        ) : type === 'days-to-hours-min' ? (
          <>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Hours: <span className="text-blue-600 dark:text-blue-400">{values.daysToHours}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Minutes: <span className="text-blue-600 dark:text-blue-400">{values.daysToMinutes}</span>
            </p>
          </>
        ) : (
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Result: <span className="text-blue-600 dark:text-blue-400">{values.output}</span>
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">{title}</h2>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 opacity-75"></div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4 transition-all duration-300">
          {renderInput()}
        </div>
        <div className="transition-all duration-300 ease-in-out">
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default UnitConverterCard;