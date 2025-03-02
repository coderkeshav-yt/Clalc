import React, { useState } from 'react';

const BasicCalculatorCard = ({ title, type }) => {
  const [values, setValues] = useState({
    length: '',
    width: '',
    height: '',
    radius: '',
    number: '',
    percentage: '',
    birthDate: '',
    startDate: '',
    endDate: '',
    hours: '',
    minutes: '',
    seconds: '',
    min: '0',
    max: '100'
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateVolume = () => {
    const length = parseFloat(values.length);
    const width = parseFloat(values.width);
    const height = parseFloat(values.height);
    const radius = parseFloat(values.radius);

    let volumes = {};

    if (length > 0 && width > 0 && height > 0) {
      volumes.cuboid = (length * width * height).toFixed(2);
    }

    if (radius > 0) {
      volumes.sphere = ((4/3) * Math.PI * Math.pow(radius, 3)).toFixed(2);
      if (height > 0) {
        volumes.cylinder = (Math.PI * Math.pow(radius, 2) * height).toFixed(2);
      }
    }

    setResult(volumes);
  };

  const calculateArea = () => {
    const length = parseFloat(values.length);
    const width = parseFloat(values.width);
    const radius = parseFloat(values.radius);

    let areas = {};

    if (length > 0) {
      if (width > 0) {
        areas.rectangle = (length * width).toFixed(2);
      }
      areas.square = (length * length).toFixed(2);
    }

    if (radius > 0) {
      areas.circle = (Math.PI * Math.pow(radius, 2)).toFixed(2);
    }

    setResult(areas);
  };

  const calculatePercentage = () => {
    const number = parseFloat(values.number);
    const percentage = parseFloat(values.percentage);

    if (number >= 0 && percentage >= 0) {
      const result = (number * percentage / 100).toFixed(2);
      const increase = (number * (1 + percentage / 100)).toFixed(2);
      const decrease = (number * (1 - percentage / 100)).toFixed(2);

      setResult({
        percentage: result,
        increase,
        decrease
      });
    }
  };

  const calculateAge = () => {
    const birthDate = new Date(values.birthDate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setResult({ age });
  };

  const calculateDaysBetween = () => {
    const start = new Date(values.startDate);
    const end = new Date(values.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setResult({ days: diffDays });
  };

  const calculateDuration = () => {
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;
    const seconds = parseInt(values.seconds) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalMinutes / 60;

    setResult({
      seconds: totalSeconds,
      minutes: totalMinutes.toFixed(2),
      hours: totalHours.toFixed(2)
    });
  };

  const generateRandomNumber = () => {
    const min = parseInt(values.min);
    const max = parseInt(values.max);
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    setResult({ number: random });
  };

  const handleCalculate = () => {
    switch (type) {
      case 'volume':
        calculateVolume();
        break;
      case 'area':
        calculateArea();
        break;
      case 'percentage':
        calculatePercentage();
        break;
      case 'age':
        calculateAge();
        break;
      case 'days':
        calculateDaysBetween();
        break;
      case 'duration':
        calculateDuration();
        break;
      case 'random':
        generateRandomNumber();
        break;
      default:
        break;
    }
  };

  const renderInputs = () => {
    switch (type) {
      case 'volume':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Length</label>
              <input
                type="number"
                name="length"
                value={values.length}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter length"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width</label>
              <input
                type="number"
                name="width"
                value={values.width}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter width"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
              <input
                type="number"
                name="height"
                value={values.height}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter height"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Radius</label>
              <input
                type="number"
                name="radius"
                value={values.radius}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter radius"
              />
            </div>
          </>
        );

      case 'area':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Length</label>
              <input
                type="number"
                name="length"
                value={values.length}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter length"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width</label>
              <input
                type="number"
                name="width"
                value={values.width}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter width"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Radius</label>
              <input
                type="number"
                name="radius"
                value={values.radius}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter radius"
              />
            </div>
          </>
        );

      case 'percentage':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number</label>
              <input
                type="number"
                name="number"
                value={values.number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Percentage</label>
              <input
                type="number"
                name="percentage"
                value={values.percentage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter percentage"
              />
            </div>
          </>
        );

      case 'age':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={values.birthDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        );

      case 'days':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={values.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </>
        );

      case 'duration':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hours</label>
              <input
                type="number"
                name="hours"
                value={values.hours}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter hours"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minutes</label>
              <input
                type="number"
                name="minutes"
                value={values.minutes}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter minutes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seconds</label>
              <input
                type="number"
                name="seconds"
                value={values.seconds}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter seconds"
              />
            </div>
          </>
        );

      case 'random':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Value</label>
              <input
                type="number"
                name="min"
                value={values.min}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter minimum value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maximum Value</label>
              <input
                type="number"
                name="max"
                value={values.max}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter maximum value"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (type) {
      case 'volume':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            {result.cuboid && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Cuboid Volume: <span className="text-blue-600 dark:text-blue-400">{result.cuboid} cubic units</span>
              </p>
            )}
            {result.sphere && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Sphere Volume: <span className="text-blue-600 dark:text-blue-400">{result.sphere} cubic units</span>
              </p>
            )}
            {result.cylinder && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Cylinder Volume: <span className="text-blue-600 dark:text-blue-400">{result.cylinder} cubic units</span>
              </p>
            )}
          </div>
        );

      case 'area':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            {result.rectangle && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Rectangle Area: <span className="text-blue-600 dark:text-blue-400">{result.rectangle} square units</span>
              </p>
            )}
            {result.square && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Square Area: <span className="text-blue-600 dark:text-blue-400">{result.square} square units</span>
              </p>
            )}
            {result.circle && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Circle Area: <span className="text-blue-600 dark:text-blue-400">{result.circle} square units</span>
              </p>
            )}
          </div>
        );

      case 'percentage':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Result: <span className="text-blue-600 dark:text-blue-400">{result.percentage}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              After Increase: <span className="text-blue-600 dark:text-blue-400">{result.increase}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              After Decrease: <span className="text-blue-600 dark:text-blue-400">{result.decrease}</span>
            </p>
          </div>
        );

      case 'age':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Age: <span className="text-blue-600 dark:text-blue-400">{result.age} years</span>
            </p>
          </div>
        );

      case 'days':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Days Between: <span className="text-blue-600 dark:text-blue-400">{result.days} days</span>
            </p>
          </div>
        );

      case 'duration':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Seconds: <span className="text-blue-600 dark:text-blue-400">{result.seconds}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Minutes: <span className="text-blue-600 dark:text-blue-400">{result.minutes}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Hours: <span className="text-blue-600 dark:text-blue-400">{result.hours}</span>
            </p>
          </div>
        );

      case 'random':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Random Number: <span className="text-blue-600 dark:text-blue-400">{result.number}</span>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">{title}</h2>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 opacity-75"></div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4 transition-all duration-300">
          {renderInputs()}
        </div>
        <button
          onClick={handleCalculate}
          className="w-full px-6 py-3 text-white text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
        >
          Calculate
        </button>
        <div className="transition-all duration-300 ease-in-out">
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default BasicCalculatorCard;