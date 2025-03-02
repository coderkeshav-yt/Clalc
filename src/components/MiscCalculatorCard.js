import React, { useState } from 'react';

const MiscCalculatorCard = ({ title, type }) => {
  const [values, setValues] = useState({
    billAmount: '',
    tipPercentage: '',
    originalPrice: '',
    discountPercentage: '',
    assignments: ['', '', ''],
    weights: ['', '', ''],
    eventA: '',
    eventB: '',
    length: '12',
    includeNumbers: true,
    includeSymbols: true,
    includeUppercase: true,
    includeLowercase: true,
    hexColor: '#000000',
    rgbColor: 'rgb(0, 0, 0)'
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const calculateTip = () => {
    const bill = parseFloat(values.billAmount);
    const tipPercent = parseFloat(values.tipPercentage);

    if (bill > 0 && tipPercent >= 0) {
      const tipAmount = bill * (tipPercent / 100);
      const total = bill + tipAmount;

      setResult({
        tip: tipAmount.toFixed(2),
        total: total.toFixed(2)
      });
    }
  };

  const calculateDiscount = () => {
    const price = parseFloat(values.originalPrice);
    const discount = parseFloat(values.discountPercentage);

    if (price > 0 && discount >= 0) {
      const discountAmount = price * (discount / 100);
      const finalPrice = price - discountAmount;

      setResult({
        discount: discountAmount.toFixed(2),
        final: finalPrice.toFixed(2)
      });
    }
  };

  const calculateGrade = () => {
    const assignments = values.assignments.map(a => parseFloat(a));
    const weights = values.weights.map(w => parseFloat(w));

    if (assignments.every(a => !isNaN(a)) && weights.every(w => !isNaN(w))) {
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      if (Math.abs(totalWeight - 100) < 0.01) {
        const weightedSum = assignments.reduce((sum, grade, i) => sum + (grade * weights[i] / 100), 0);
        setResult({ grade: weightedSum.toFixed(2) });
      }
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const calculateProbability = () => {
    const probA = parseFloat(values.eventA);
    const probB = parseFloat(values.eventB);

    if (probA >= 0 && probA <= 1 && probB >= 0 && probB <= 1) {
      const union = probA + probB - (probA * probB);
      const intersection = probA * probB;

      setResult({
        union: union.toFixed(4),
        intersection: intersection.toFixed(4)
      });
    }
  };

  const generatePassword = () => {
    const length = parseInt(values.length);
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';

    let chars = '';
    if (values.includeNumbers) chars += numbers;
    if (values.includeSymbols) chars += symbols;
    if (values.includeUppercase) chars += uppercase;
    if (values.includeLowercase) chars += lowercase;

    if (chars && length > 0) {
      let password = '';
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setResult({ password });
    }
  };

  const convertColor = () => {
    if (values.hexColor.match(/^#[0-9A-F]{6}$/i)) {
      const r = parseInt(values.hexColor.slice(1, 3), 16);
      const g = parseInt(values.hexColor.slice(3, 5), 16);
      const b = parseInt(values.hexColor.slice(5, 7), 16);
      setResult({ rgb: `rgb(${r}, ${g}, ${b})` });
    } else if (values.rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)) {
      const [r, g, b] = values.rgbColor.match(/\d+/g).map(Number);
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      setResult({ hex: hex.toUpperCase() });
    }
  };

  const handleCalculate = () => {
    switch (type) {
      case 'tip':
        calculateTip();
        break;
      case 'discount':
        calculateDiscount();
        break;
      case 'grade':
        calculateGrade();
        break;
      case 'probability':
        calculateProbability();
        break;
      case 'password':
        generatePassword();
        break;
      case 'color':
        convertColor();
        break;
      default:
        break;
    }
  };

  const renderInputs = () => {
    switch (type) {
      case 'tip':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bill Amount</label>
              <input
                type="number"
                name="billAmount"
                value={values.billAmount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter bill amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tip Percentage</label>
              <input
                type="number"
                name="tipPercentage"
                value={values.tipPercentage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter tip percentage"
              />
            </div>
          </>
        );

      case 'discount':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={values.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter original price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Percentage</label>
              <input
                type="number"
                name="discountPercentage"
                value={values.discountPercentage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter discount percentage"
              />
            </div>
          </>
        );

      case 'probability':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Probability of Event A</label>
              <input
                type="number"
                name="eventA"
                value={values.eventA}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter probability (0-1)"
                min="0"
                max="1"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Probability of Event B</label>
              <input
                type="number"
                name="eventB"
                value={values.eventB}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter probability (0-1)"
                min="0"
                max="1"
                step="0.01"
              />
            </div>
          </>
        );

      case 'password':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password Length</label>
              <input
                type="number"
                name="length"
                value={values.length}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                min="4"
                max="64"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="includeNumbers"
                  checked={values.includeNumbers}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Include Numbers</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="includeSymbols"
                  checked={values.includeSymbols}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Include Symbols</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="includeUppercase"
                  checked={values.includeUppercase}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Include Uppercase</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="includeLowercase"
                  checked={values.includeLowercase}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Include Lowercase</label>
              </div>
            </div>
          </>
        );

      case 'color':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HEX Color</label>
              <input
                type="text"
                name="hexColor"
                value={values.hexColor}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter HEX color (e.g., #FF0000)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">RGB Color</label>
              <input
                type="text"
                name="rgbColor"
                value={values.rgbColor}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter RGB color (e.g., rgb(255, 0, 0))"
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
      case 'tip':
        return (
          <div className="mt-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300">Tip Amount: ${result.tip}</p>
            <p className="text-gray-700 dark:text-gray-300">Total Amount: ${result.total}</p>
          </div>
        );
      case 'discount':
        return (
          <div className="mt-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300">Discount Amount: ₹{result.discount}</p>
            <p className="text-gray-700 dark:text-gray-300">Final Price: ₹{result.final}</p>
          </div>
        );
      case 'grade':
        return (
          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assignment {index + 1} Score</label>
                  <input
                    type="number"
                    value={values.assignments[index]}
                    onChange={(e) => {
                      const newAssignments = [...values.assignments];
                      newAssignments[index] = e.target.value;
                      setValues(prev => ({ ...prev, assignments: newAssignments }));
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                    placeholder="Enter score (0-100)"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (%)</label>
                  <input
                    type="number"
                    value={values.weights[index]}
                    onChange={(e) => {
                      const newWeights = [...values.weights];
                      newWeights[index] = e.target.value;
                      setValues(prev => ({ ...prev, weights: newWeights }));
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                    placeholder="Enter weight"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            ))}
            {result && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Final Grade: <span className="text-blue-600 dark:text-blue-400">{result.grade}%</span>
                </p>
              </div>
            )}
          </div>
        );
      case 'probability':
        return (
          <div className="mt-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300">Union (A ∪ B): {result.union}</p>
            <p className="text-gray-700 dark:text-gray-300">Intersection (A ∩ B): {result.intersection}</p>
          </div>
        );
      case 'password':
        return (
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-gray-700 dark:text-gray-300">Generated Password: {result.password}</p>
              <button
                onClick={() => copyToClipboard(result.password)}
                className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Copy
              </button>
            </div>
          </div>
        );
      case 'color':
        return (
          <div className="mt-4 space-y-2">
            {result.rgb && <p className="text-gray-700 dark:text-gray-300">RGB: {result.rgb}</p>}
            {result.hex && <p className="text-gray-700 dark:text-gray-300">HEX: {result.hex}</p>}
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
          {type === 'password' ? 'Generate' : 'Calculate'}
        </button>
        <div className="transition-all duration-300 ease-in-out">
          {renderResult()}
        </div>
      </div>
    </div>
  );
};

export default MiscCalculatorCard;