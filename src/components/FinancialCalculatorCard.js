import React, { useState } from 'react';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: '$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: '$' },
];

const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.42,
  CNY: 6.45,
  INR: 74.23,
  CAD: 1.25,
  AUD: 1.35,
};

const FinancialCalculatorCard = ({ title, type }) => {
  const [values, setValues] = useState({
    amount: '',
    rate: '',
    years: '',
    currency: 'USD',
    targetCurrency: 'EUR',
    gstRate: '18',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateLoan = () => {
    const principal = parseFloat(values.amount);
    const rate = parseFloat(values.rate) / 100 / 12;
    const payments = parseFloat(values.years) * 12;

    if (principal > 0 && rate > 0 && payments > 0) {
      const x = Math.pow(1 + rate, payments);
      const monthly = (principal * x * rate) / (x - 1);
      setResult(monthly.toFixed(2));
    }
  };

  const calculateInvestment = () => {
    const principal = parseFloat(values.amount);
    const rate = parseFloat(values.rate) / 100;
    const years = parseFloat(values.years);

    if (principal > 0 && rate > 0 && years > 0) {
      const amount = principal * Math.pow(1 + rate, years);
      setResult(amount.toFixed(2));
    }
  };

  const calculateIncomeTax = () => {
    const income = parseFloat(values.amount);
    const deductions = parseFloat(values.rate) || 0;
    const taxableIncome = Math.max(income - deductions, 0);
    
    let tax = 0;
    if (taxableIncome <= 50000) {
      tax = taxableIncome * 0.1;
    } else if (taxableIncome <= 100000) {
      tax = 5000 + (taxableIncome - 50000) * 0.15;
    } else {
      tax = 12500 + (taxableIncome - 100000) * 0.25;
    }
    
    setResult(tax.toFixed(2));
  };

  const calculateCurrency = () => {
    const amount = parseFloat(values.amount);
    const fromRate = exchangeRates[values.currency];
    const toRate = exchangeRates[values.targetCurrency];
    const converted = (amount / fromRate) * toRate;
    setResult(converted.toFixed(2));
  };

  const calculateGST = () => {
    const amount = parseFloat(values.amount);
    const gstRate = parseFloat(values.gstRate) / 100;
    const gstAmount = amount * gstRate;
    const total = amount + gstAmount;
    setResult({
      gstAmount: gstAmount.toFixed(2),
      total: total.toFixed(2)
    });
  };

  const calculateEMI = () => {
    const principal = parseFloat(values.amount);
    const rate = parseFloat(values.rate) / 12 / 100;
    const time = parseFloat(values.years) * 12;

    if (principal > 0 && rate > 0 && time > 0) {
      const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
      const totalAmount = emi * time;
      const totalInterest = totalAmount - principal;
      setResult({
        emi: emi.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
    }
  };

  const handleCalculate = () => {
    switch (type) {
      case 'loan':
        calculateLoan();
        break;
      case 'investment':
        calculateInvestment();
        break;
      case 'tax':
        calculateIncomeTax();
        break;
      case 'currency':
        calculateCurrency();
        break;
      case 'gst':
        calculateGST();
        break;
      case 'emi':
        calculateEMI();
        break;
    }
  };

  const renderInputs = () => {
    switch (type) {
      case 'currency':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Currency</label>
              <select
                name="currency"
                value={values.currency}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Currency</label>
              <select
                name="targetCurrency"
                value={values.targetCurrency}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      case 'gst':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base Amount</label>
              <input
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GST Rate (%)</label>
              <select
                name="gstRate"
                value={values.gstRate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>
          </>
        );
      case 'emi':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Amount</label>
              <input
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter loan amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interest Rate (% per annum)</label>
              <input
                type="number"
                name="rate"
                value={values.rate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter interest rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Term (Years)</label>
              <input
                type="number"
                name="years"
                value={values.years}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter loan term"
              />
            </div>
          </>
        );
      default:
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {type === 'tax' ? 'Annual Income' : 'Principal Amount'}
              </label>
              <input
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {type === 'tax' ? 'Deductions' : 'Interest Rate (%)'}
              </label>
              <input
                type="number"
                name="rate"
                value={values.rate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {type === 'loan' ? 'Loan Term (Years)' : type === 'investment' ? 'Investment Period (Years)' : 'Tax Year'}
              </label>
              <input
                type="number"
                name="years"
                value={values.years}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter years"
              />
            </div>
          </>
        );
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (type) {
      case 'currency':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {values.amount} {values.currency} = {' '}
              <span className="text-blue-600 dark:text-blue-400">
                {result} {values.targetCurrency}
              </span>
            </p>
          </div>
        );
      case 'gst':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              GST Amount: <span className="text-blue-600 dark:text-blue-400">{result.gstAmount}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Amount: <span className="text-blue-600 dark:text-blue-400">{result.total}</span>
            </p>
          </div>
        );
      case 'emi':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Monthly EMI: <span className="text-blue-600 dark:text-blue-400">{result.emi}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Amount: <span className="text-blue-600 dark:text-blue-400">{result.totalAmount}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Interest: <span className="text-blue-600 dark:text-blue-400">{result.totalInterest}</span>
            </p>
          </div>
        );
      default:
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {type === 'loan' ? 'Monthly Payment' : type === 'investment' ? 'Final Amount' : 'Tax Amount'}: 
              <span className="text-blue-600 dark:text-blue-400">{result}</span>
            </p>
          </div>
        );
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

export default FinancialCalculatorCard;