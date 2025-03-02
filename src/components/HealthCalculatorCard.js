import React, { useState } from 'react';

const HealthCalculatorCard = ({ title, type }) => {
  const [values, setValues] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'sedentary',
    steps: '',
    strideLength: '2.2',
    distance: '',
    pace: '',
    bedtime: '',
    wakeTime: ''
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateBMI = () => {
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height) / 100; // Convert cm to m
    
    if (weight > 0 && height > 0) {
      const bmi = weight / (height * height);
      let category = '';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setResult({
        bmi: bmi.toFixed(1),
        category
      });
    }
  };

  const calculateCalories = () => {
    const weight = parseFloat(values.weight);
    const height = parseFloat(values.height);
    const age = parseInt(values.age);
    
    if (weight > 0 && height > 0 && age > 0) {
      // Harris-Benedict equation
      let bmr;
      if (values.gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      
      // Activity multipliers
      const multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      };
      
      const dailyCalories = bmr * multipliers[values.activityLevel];
      setResult({
        maintenance: Math.round(dailyCalories),
        weightLoss: Math.round(dailyCalories * 0.8),
        weightGain: Math.round(dailyCalories * 1.2)
      });
    }
  };

  const calculateStepsToDistance = () => {
    const steps = parseInt(values.steps);
    const strideLength = parseFloat(values.strideLength);
    
    if (steps > 0 && strideLength > 0) {
      const distanceInMeters = steps * strideLength * 0.01; // Convert cm to m
      const distanceInKm = distanceInMeters / 1000;
      const distanceInMiles = distanceInKm * 0.621371;
      
      setResult({
        kilometers: distanceInKm.toFixed(2),
        miles: distanceInMiles.toFixed(2)
      });
    }
  };

  const calculatePace = () => {
    const distance = parseFloat(values.distance);
    const pace = parseFloat(values.pace);
    
    if (distance > 0 && pace > 0) {
      const totalMinutes = distance * pace;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);
      const pacePerKm = pace.toFixed(2);
      const pacePerMile = (pace * 1.60934).toFixed(2);
      
      setResult({
        totalTime: `${hours}:${minutes.toString().padStart(2, '0')}`,
        pacePerKm,
        pacePerMile
      });
    }
  };

  const calculateSleep = () => {
    const bedtime = new Date(`2000-01-01T${values.bedtime}`);
    const cycles = 6; // Recommended sleep cycles
    const cycleLength = 90; // Minutes per sleep cycle
    
    const sleepCycles = [];
    let currentTime = new Date(bedtime);
    
    for (let i = 1; i <= cycles; i++) {
      currentTime = new Date(currentTime.getTime() + cycleLength * 60000);
      sleepCycles.push(currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    }
    
    setResult({
      cycles: sleepCycles,
      totalSleep: `${(cycles * cycleLength) / 60} hours`
    });
  };

  const handleCalculate = () => {
    switch (type) {
      case 'bmi':
        calculateBMI();
        break;
      case 'calories':
        calculateCalories();
        break;
      case 'steps':
        calculateStepsToDistance();
        break;
      case 'pace':
        calculatePace();
        break;
      case 'sleep':
        calculateSleep();
        break;
    }
  };

  const renderInputs = () => {
    switch (type) {
      case 'bmi':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={values.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={values.height}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter height"
              />
            </div>
          </>
        );
      
      case 'calories':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={values.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
              <select
                name="gender"
                value={values.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Activity Level</label>
              <select
                name="activityLevel"
                value={values.activityLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Exercise</option>
                <option value="moderate">Moderate Exercise</option>
                <option value="active">Active</option>
                <option value="veryActive">Very Active</option>
              </select>
            </div>
          </>
        );
      
      case 'steps':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Steps</label>
              <input
                type="number"
                name="steps"
                value={values.steps}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter number of steps"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stride Length (cm)</label>
              <input
                type="number"
                name="strideLength"
                value={values.strideLength}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter stride length"
              />
            </div>
          </>
        );
      
      case 'pace':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Distance (km)</label>
              <input
                type="number"
                name="distance"
                value={values.distance}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter distance"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pace (minutes/km)</label>
              <input
                type="number"
                name="pace"
                value={values.pace}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter pace"
              />
            </div>
          </>
        );
      
      case 'sleep':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bedtime</label>
              <input
                type="time"
                name="bedtime"
                value={values.bedtime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
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
      case 'bmi':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              BMI: <span className="text-blue-600 dark:text-blue-400">{result.bmi}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Category: <span className="text-blue-600 dark:text-blue-400">{result.category}</span>
            </p>
          </div>
        );

      case 'calories':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Maintenance Calories: <span className="text-blue-600 dark:text-blue-400">{result.maintenance}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Weight Loss: <span className="text-blue-600 dark:text-blue-400">{result.weightLoss}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Weight Gain: <span className="text-blue-600 dark:text-blue-400">{result.weightGain}</span>
            </p>
          </div>
        );

      case 'steps':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Distance: <span className="text-blue-600 dark:text-blue-400">{result.kilometers} km ({result.miles} miles)</span>
            </p>
          </div>
        );

      case 'pace':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Time: <span className="text-blue-600 dark:text-blue-400">{result.totalTime}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Pace per km: <span className="text-blue-600 dark:text-blue-400">{result.pacePerKm} min/km</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Pace per mile: <span className="text-blue-600 dark:text-blue-400">{result.pacePerMile} min/mile</span>
            </p>
          </div>
        );

      case 'sleep':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Recommended Wake Times:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {result.cycles.map((time, index) => (
                <div key={index} className="p-2 bg-gray-100 dark:bg-gray-600 rounded">
                  <p className="text-center text-gray-700 dark:text-gray-300">{time}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Sleep: <span className="text-blue-600 dark:text-blue-400">{result.totalSleep}</span>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white via-gray-100 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-indigo-900 rounded-2xl shadow-xl space-y-6 border border-gray-200/50 dark:border-gray-700/50 backdrop-filter backdrop-blur-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 tracking-tight group-hover:scale-[1.02] transition-transform duration-300">{title}</h2>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 dark:from-indigo-400 dark:to-blue-500 opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110"></div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4 transition-all duration-300">
          {renderInputs()}
        </div>
        <button
          onClick={handleCalculate}
          className="w-full px-6 py-3.5 text-white text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl relative overflow-hidden group/btn"
        >
          <span className="relative z-10">Calculate</span>
          <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out"></div>
        </button>
        <div className="transition-all duration-300 ease-in-out">
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default HealthCalculatorCard;