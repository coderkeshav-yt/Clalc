import React, { useState } from 'react';

const MathCalculatorCard = ({ title, type }) => {
  const [values, setValues] = useState({
    expression: '',
    numerator1: '',
    denominator1: '',
    numerator2: '',
    denominator2: '',
    base: '',
    exponent: '',
    a: '',
    b: '',
    c: '',
    matrix1: [['', ''], ['', '']],
    matrix2: [['', ''], ['', '']],
    number: '',
    lowerLimit: '',
    upperLimit: '',
    firstTerm: '',
    commonDifference: '',
    numberOfTerms: '',
    voltage: '',
    current: '',
    resistance: '',
    units: '',
    rate: '',
    days: ''
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMatrixChange = (matrixNum, row, col, value) => {
    setValues(prev => {
      const newMatrix = [...prev[`matrix${matrixNum}`]];
      newMatrix[row][col] = value;
      return {
        ...prev,
        [`matrix${matrixNum}`]: newMatrix
      };
    });
  };

  const calculateScientific = () => {
    try {
      const result = eval(values.expression);
      setResult({ value: result.toFixed(8) });
    } catch (error) {
      setResult({ error: 'Invalid expression' });
    }
  };

  const calculateFraction = () => {
    const n1 = parseInt(values.numerator1);
    const d1 = parseInt(values.denominator1);
    const n2 = parseInt(values.numerator2);
    const d2 = parseInt(values.denominator2);

    if (d1 === 0 || d2 === 0) {
      setResult({ error: 'Division by zero' });
      return;
    }

    const sum = (n1 * d2 + n2 * d1) / (d1 * d2);
    const difference = (n1 * d2 - n2 * d1) / (d1 * d2);
    const product = (n1 * n2) / (d1 * d2);
    const quotient = (n1 * d2) / (d1 * n2);

    setResult({
      sum: sum.toFixed(4),
      difference: difference.toFixed(4),
      product: product.toFixed(4),
      quotient: quotient.toFixed(4)
    });
  };

  const calculateExponent = () => {
    const base = parseFloat(values.base);
    const exponent = parseFloat(values.exponent);

    const power = Math.pow(base, exponent);
    const root = Math.pow(base, 1/exponent);

    setResult({
      power: power.toFixed(4),
      root: root.toFixed(4)
    });
  };

  const calculateQuadratic = () => {
    const a = parseFloat(values.a);
    const b = parseFloat(values.b);
    const c = parseFloat(values.c);

    const discriminant = b * b - 4 * a * c;
    let root1, root2;

    if (discriminant > 0) {
      root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      setResult({
        root1: root1.toFixed(4),
        root2: root2.toFixed(4),
        type: 'Real and distinct roots'
      });
    } else if (discriminant === 0) {
      root1 = -b / (2 * a);
      setResult({
        root1: root1.toFixed(4),
        type: 'Real and equal roots'
      });
    } else {
      const realPart = (-b / (2 * a)).toFixed(4);
      const imaginaryPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
      setResult({
        realPart,
        imaginaryPart,
        type: 'Complex roots'
      });
    }
  };

  const calculateMatrix = () => {
    const matrix1 = values.matrix1.map(row => row.map(val => parseFloat(val) || 0));
    const matrix2 = values.matrix2.map(row => row.map(val => parseFloat(val) || 0));

    const resultMatrix = [
      [0, 0],
      [0, 0]
    ];

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 2; k++) {
          resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
        }
      }
    }

    setResult({ matrix: resultMatrix });
  };

  const calculateFactorization = () => {
    const number = parseInt(values.number);
    const factors = [];
    let n = number;

    for (let i = 2; i <= Math.sqrt(n); i++) {
      while (n % i === 0) {
        factors.push(i);
        n = n / i;
      }
    }

    if (n > 1) {
      factors.push(n);
    }

    setResult({ factors });
  };

  const calculateIntegral = () => {
    // Simple trapezoidal rule for demonstration
    const f = (x) => Math.sin(x); // Example function
    const a = parseFloat(values.lowerLimit);
    const b = parseFloat(values.upperLimit);
    const n = 1000; // Number of intervals
    const h = (b - a) / n;
    let sum = 0.5 * (f(a) + f(b));

    for (let i = 1; i < n; i++) {
      sum += f(a + i * h);
    }

    const integral = h * sum;
    setResult({ value: integral.toFixed(6) });
  };

  const calculateSeries = () => {
    const a = parseFloat(values.firstTerm);
    const d = parseFloat(values.commonDifference);
    const n = parseInt(values.numberOfTerms);

    const sum = (n/2) * (2*a + (n-1)*d);
    const terms = [];

    for (let i = 0; i < n; i++) {
      terms.push(a + i * d);
    }

    setResult({
      sum: sum.toFixed(2),
      terms
    });
  };

  const calculateOhm = () => {
    const v = parseFloat(values.voltage);
    const i = parseFloat(values.current);
    const r = parseFloat(values.resistance);

    if (v && i) setResult({ resistance: (v/i).toFixed(2) });
    else if (v && r) setResult({ current: (v/r).toFixed(2) });
    else if (i && r) setResult({ voltage: (i*r).toFixed(2) });
  };

  const calculateElectricBill = () => {
    const units = parseFloat(values.units);
    const rate = parseFloat(values.rate);
    const days = parseInt(values.days);

    const totalBill = units * rate;
    const dailyAverage = units / days;

    setResult({
      totalBill: totalBill.toFixed(2),
      dailyAverage: dailyAverage.toFixed(2)
    });
  };

  const handleCalculate = () => {
    switch (type) {
      case 'scientific':
        calculateScientific();
        break;
      case 'fraction':
        calculateFraction();
        break;
      case 'exponent':
        calculateExponent();
        break;
      case 'quadratic':
        calculateQuadratic();
        break;
      case 'matrix':
        calculateMatrix();
        break;
      case 'factorization':
        calculateFactorization();
        break;
      case 'integral':
        calculateIntegral();
        break;
      case 'series':
        calculateSeries();
        break;
      case 'ohm':
        calculateOhm();
        break;
      case 'electric':
        calculateElectricBill();
        break;
    }
  };

  const renderInputs = () => {
    switch (type) {
      case 'scientific':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expression</label>
            <input
              type="text"
              name="expression"
              value={values.expression}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
              placeholder="Enter mathematical expression"
            />
          </div>
        );

      case 'fraction':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Numerator 1</label>
                <input
                  type="number"
                  name="numerator1"
                  value={values.numerator1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Denominator 1</label>
                <input
                  type="number"
                  name="denominator1"
                  value={values.denominator1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Numerator 2</label>
                <input
                  type="number"
                  name="numerator2"
                  value={values.numerator2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Denominator 2</label>
                <input
                  type="number"
                  name="denominator2"
                  value={values.denominator2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      case 'exponent':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base</label>
              <input
                type="number"
                name="base"
                value={values.base}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter base number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exponent</label>
              <input
                type="number"
                name="exponent"
                value={values.exponent}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter exponent"
              />
            </div>
          </div>
        );

      case 'quadratic':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">a (x²)</label>
              <input
                type="number"
                name="a"
                value={values.a}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter coefficient a"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">b (x)</label>
              <input
                type="number"
                name="b"
                value={values.b}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter coefficient b"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">c (constant)</label>
              <input
                type="number"
                name="c"
                value={values.c}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:text-white"
                placeholder="Enter coefficient c"
              />
            </div>
          </div>
        );

      case 'matrix':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Result Matrix:</p>
            <div className="grid grid-cols-2 gap-2">
              {result.matrix.map((row, i) => (
                <div key={`result-${i}`} className="flex space-x-2">
                  {row.map((val, j) => (
                    <div
                      key={`result-${i}-${j}`}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-center text-blue-600 dark:text-blue-400"
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'factorization':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Prime Factors: <span className="text-blue-600 dark:text-blue-400">{result.factors.join(' × ')}</span>
            </p>
          </div>
        );

      case 'integral':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Definite Integral: <span className="text-blue-600 dark:text-blue-400">{result.value}</span>
            </p>
          </div>
        );

      case 'series':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Terms: <span className="text-blue-600 dark:text-blue-400">{result.terms.join(', ')}</span>
            </p>
          </div>
        );

      case 'ohm':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
there are many error coming in " math-engineering " page so remove this page full code replace its code with work in progess ood nad proffesional looking 

              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      case 'electric':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Total Bill: <span className="text-blue-600 dark:text-blue-400">{result.totalBill}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Daily Average: <span className="text-blue-600 dark:text-blue-400">{result.dailyAverage} units/day</span>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (type) {
      case 'scientific':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {result.error ? (
                <span className="text-red-500">{result.error}</span>
              ) : (
                <>Result: <span className="text-blue-600 dark:text-blue-400">{result.value}</span></>
              )}
            </p>
          </div>
        );

      case 'fraction':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Difference: <span className="text-blue-600 dark:text-blue-400">{result.difference}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Product: <span className="text-blue-600 dark:text-blue-400">{result.product}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Quotient: <span className="text-blue-600 dark:text-blue-400">{result.quotient}</span>
            </p>
          </div>
        );

      case 'exponent':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Power: <span className="text-blue-600 dark:text-blue-400">{result.power}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Root: <span className="text-blue-600 dark:text-blue-400">{result.root}</span>
            </p>
          </div>
        );

      case 'quadratic':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Type: <span className="text-blue-600 dark:text-blue-400">{result.type}</span>
            </p>
            {result.root1 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 1: <span className="text-blue-600 dark:text-blue-400">{result.root1}</span>
              </p>
            )}
            {result.root2 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 2: <span className="text-blue-600 dark:text-blue-400">{result.root2}</span>
              </p>
            )}
            {result.realPart && (
              <>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Real Part: <span className="text-blue-600 dark:text-blue-400">{result.realPart}</span>
                </p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Imaginary Part: <span className="text-blue-600 dark:text-blue-400">±{result.imaginaryPart}i</span>
                </p>
              </>
            )}
          </div>
        );

      case 'matrix':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Result Matrix:</p>
            <div className="grid grid-cols-2 gap-2">
              {result.matrix.map((row, i) => (
                <div key={`result-${i}`} className="flex space-x-2">
                  {row.map((val, j) => (
                    <div
                      key={`result-${i}-${j}`}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-center text-blue-600 dark:text-blue-400"
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'factorization':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Prime Factors: <span className="text-blue-600 dark:text-blue-400">{result.factors.join(' × ')}</span>
            </p>
          </div>
        );

      case 'integral':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Definite Integral: <span className="text-blue-600 dark:text-blue-400">{result.value}</span>
            </p>
          </div>
        );

      case 'series':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Terms: <span className="text-blue-600 dark:text-blue-400">{result.terms.join(', ')}</span>
            </p>
          </div>
        );

      case 'ohm':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      case 'electric':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (type) {
      case 'scientific':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {result.error ? (
                <span className="text-red-500">{result.error}</span>
              ) : (
                <>Result: <span className="text-blue-600 dark:text-blue-400">{result.value}</span></>
              )}
            </p>
          </div>
        );

      case 'fraction':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Difference: <span className="text-blue-600 dark:text-blue-400">{result.difference}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Product: <span className="text-blue-600 dark:text-blue-400">{result.product}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Quotient: <span className="text-blue-600 dark:text-blue-400">{result.quotient}</span>
            </p>
          </div>
        );

      case 'exponent':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Power: <span className="text-blue-600 dark:text-blue-400">{result.power}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Root: <span className="text-blue-600 dark:text-blue-400">{result.root}</span>
            </p>
          </div>
        );

      case 'quadratic':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Type: <span className="text-blue-600 dark:text-blue-400">{result.type}</span>
            </p>
            {result.root1 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 1: <span className="text-blue-600 dark:text-blue-400">{result.root1}</span>
              </p>
            )}
            {result.root2 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 2: <span className="text-blue-600 dark:text-blue-400">{result.root2}</span>
              </p>
            )}
            {result.realPart && (
              <>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Real Part: <span className="text-blue-600 dark:text-blue-400">{result.realPart}</span>
                </p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Imaginary Part: <span className="text-blue-600 dark:text-blue-400">±{result.imaginaryPart}i</span>
                </p>
              </>
            )}
          </div>
        );

      case 'matrix':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Result Matrix:</p>
            <div className="grid grid-cols-2 gap-2">
              {result.matrix.map((row, i) => (
                <div key={`result-${i}`} className="flex space-x-2">
                  {row.map((val, j) => (
                    <div
                      key={`result-${i}-${j}`}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-center text-blue-600 dark:text-blue-400"
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'factorization':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Prime Factors: <span className="text-blue-600 dark:text-blue-400">{result.factors.join(' × ')}</span>
            </p>
          </div>
        );

      case 'integral':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Definite Integral: <span className="text-blue-600 dark:text-blue-400">{result.value}</span>
            </p>
          </div>
        );

      case 'series':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Terms: <span className="text-blue-600 dark:text-blue-400">{result.terms.join(', ')}</span>
            </p>
          </div>
        );

      case 'ohm':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      case 'electric':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (type) {
      case 'scientific':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {result.error ? (
                <span className="text-red-500">{result.error}</span>
              ) : (
                <>Result: <span className="text-blue-600 dark:text-blue-400">{result.value}</span></>
              )}
            </p>
          </div>
        );

      case 'fraction':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Difference: <span className="text-blue-600 dark:text-blue-400">{result.difference}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Product: <span className="text-blue-600 dark:text-blue-400">{result.product}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Quotient: <span className="text-blue-600 dark:text-blue-400">{result.quotient}</span>
            </p>
          </div>
        );

      case 'exponent':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Power: <span className="text-blue-600 dark:text-blue-400">{result.power}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Root: <span className="text-blue-600 dark:text-blue-400">{result.root}</span>
            </p>
          </div>
        );

      case 'quadratic':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Type: <span className="text-blue-600 dark:text-blue-400">{result.type}</span>
            </p>
            {result.root1 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 1: <span className="text-blue-600 dark:text-blue-400">{result.root1}</span>
              </p>
            )}
            {result.root2 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 2: <span className="text-blue-600 dark:text-blue-400">{result.root2}</span>
              </p>
            )}
            {result.realPart && (
              <>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Real Part: <span className="text-blue-600 dark:text-blue-400">{result.realPart}</span>
                </p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Imaginary Part: <span className="text-blue-600 dark:text-blue-400">±{result.imaginaryPart}i</span>
                </p>
              </>
            )}
          </div>
        );

      case 'matrix':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Result Matrix:</p>
            <div className="grid grid-cols-2 gap-2">
              {result.matrix.map((row, i) => (
                <div key={`result-${i}`} className="flex space-x-2">
                  {row.map((val, j) => (
                    <div
                      key={`result-${i}-${j}`}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-center text-blue-600 dark:text-blue-400"
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'factorization':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Prime Factors: <span className="text-blue-600 dark:text-blue-400">{result.factors.join(' × ')}</span>
            </p>
          </div>
        );

      case 'integral':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Definite Integral: <span className="text-blue-600 dark:text-blue-400">{result.value}</span>
            </p>
          </div>
        );

      case 'series':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Terms: <span className="text-blue-600 dark:text-blue-400">{result.terms.join(', ')}</span>
            </p>
          </div>
        );

      case 'ohm':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      case 'electric':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (type) {
      case 'scientific':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {result.error ? (
                <span className="text-red-500">{result.error}</span>
              ) : (
                <>Result: <span className="text-blue-600 dark:text-blue-400">{result.value}</span></>
              )}
            </p>
          </div>
        );

      case 'fraction':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Difference: <span className="text-blue-600 dark:text-blue-400">{result.difference}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Product: <span className="text-blue-600 dark:text-blue-400">{result.product}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Quotient: <span className="text-blue-600 dark:text-blue-400">{result.quotient}</span>
            </p>
          </div>
        );

      case 'exponent':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Power: <span className="text-blue-600 dark:text-blue-400">{result.power}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Root: <span className="text-blue-600 dark:text-blue-400">{result.root}</span>
            </p>
          </div>
        );

      case 'quadratic':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Type: <span className="text-blue-600 dark:text-blue-400">{result.type}</span>
            </p>
            {result.root1 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 1: <span className="text-blue-600 dark:text-blue-400">{result.root1}</span>
              </p>
            )}
            {result.root2 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 2: <span className="text-blue-600 dark:text-blue-400">{result.root2}</span>
              </p>
            )}
            {result.realPart && (
              <>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Real Part: <span className="text-blue-600 dark:text-blue-400">{result.realPart}</span>
                </p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Imaginary Part: <span className="text-blue-600 dark:text-blue-400">±{result.imaginaryPart}i</span>
                </p>
              </>
            )}
          </div>
        );

      case 'matrix':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Result Matrix:</p>
            <div className="grid grid-cols-2 gap-2">
              {result.matrix.map((row, i) => (
                <div key={`result-${i}`} className="flex space-x-2">
                  {row.map((val, j) => (
                    <div
                      key={`result-${i}-${j}`}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-center text-blue-600 dark:text-blue-400"
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'factorization':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Prime Factors: <span className="text-blue-600 dark:text-blue-400">{result.factors.join(' × ')}</span>
            </p>
          </div>
        );

      case 'integral':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Definite Integral: <span className="text-blue-600 dark:text-blue-400">{result.value}</span>
            </p>
          </div>
        );

      case 'series':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Terms: <span className="text-blue-600 dark:text-blue-400">{result.terms.join(', ')}</span>
            </p>
          </div>
        );

      case 'ohm':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      case 'electric':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (type) {
      case 'scientific':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {result.error ? (
                <span className="text-red-500">{result.error}</span>
              ) : (
                <>Result: <span className="text-blue-600 dark:text-blue-400">{result.value}</span></>
              )}
            </p>
          </div>
        );

      case 'fraction':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Difference: <span className="text-blue-600 dark:text-blue-400">{result.difference}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Product: <span className="text-blue-600 dark:text-blue-400">{result.product}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Quotient: <span className="text-blue-600 dark:text-blue-400">{result.quotient}</span>
            </p>
          </div>
        );

      case 'exponent':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Power: <span className="text-blue-600 dark:text-blue-400">{result.power}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Root: <span className="text-blue-600 dark:text-blue-400">{result.root}</span>
            </p>
          </div>
        );

      case 'quadratic':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Type: <span className="text-blue-600 dark:text-blue-400">{result.type}</span>
            </p>
            {result.root1 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 1: <span className="text-blue-600 dark:text-blue-400">{result.root1}</span>
              </p>
            )}
            {result.root2 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 2: <span className="text-blue-600 dark:text-blue-400">{result.root2}</span>
              </p>
            )}
            {result.realPart && (
              <>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Real Part: <span className="text-blue-600 dark:text-blue-400">{result.realPart}</span>
                </p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Imaginary Part: <span className="text-blue-600 dark:text-blue-400">±{result.imaginaryPart}i</span>
                </p>
              </>
            )}
          </div>
        );

      case 'matrix':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Result Matrix:</p>
            <div className="grid grid-cols-2 gap-2">
              {result.matrix.map((row, i) => (
                <div key={`result-${i}`} className="flex space-x-2">
                  {row.map((val, j) => (
                    <div
                      key={`result-${i}-${j}`}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-center text-blue-600 dark:text-blue-400"
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'factorization':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Prime Factors: <span className="text-blue-600 dark:text-blue-400">{result.factors.join(' × ')}</span>
            </p>
          </div>
        );

      case 'integral':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Definite Integral: <span className="text-blue-600 dark:text-blue-400">{result.value}</span>
            </p>
          </div>
        );

      case 'series':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Terms: <span className="text-blue-600 dark:text-blue-400">{result.terms.join(', ')}</span>
            </p>
          </div>
        );

      case 'ohm':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      case 'electric':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>
              </p>
            )}
            {result.current && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Current: <span className="text-blue-600 dark:text-blue-400">{result.current} A</span>
              </p>
            )}
            {result.resistance && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resistance: <span className="text-blue-600 dark:text-blue-400">{result.resistance} Ω</span>
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (type) {
      case 'scientific':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {result.error ? (
                <span className="text-red-500">{result.error}</span>
              ) : (
                <>Result: <span className="text-blue-600 dark:text-blue-400">{result.value}</span></>
              )}
            </p>
          </div>
        );

      case 'fraction':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Difference: <span className="text-blue-600 dark:text-blue-400">{result.difference}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Product: <span className="text-blue-600 dark:text-blue-400">{result.product}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Quotient: <span className="text-blue-600 dark:text-blue-400">{result.quotient}</span>
            </p>
          </div>
        );

      case 'exponent':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Power: <span className="text-blue-600 dark:text-blue-400">{result.power}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Root: <span className="text-blue-600 dark:text-blue-400">{result.root}</span>
            </p>
          </div>
        );

      case 'quadratic':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Type: <span className="text-blue-600 dark:text-blue-400">{result.type}</span>
            </p>
            {result.root1 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 1: <span className="text-blue-600 dark:text-blue-400">{result.root1}</span>
              </p>
            )}
            {result.root2 && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Root 2: <span className="text-blue-600 dark:text-blue-400">{result.root2}</span>
              </p>
            )}
            {result.realPart && (
              <>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Real Part: <span className="text-blue-600 dark:text-blue-400">{result.realPart}</span>
                </p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Imaginary Part: <span className="text-blue-600 dark:text-blue-400">±{result.imaginaryPart}i</span>
                </p>
              </>
            )}
          </div>
        );

      case 'matrix':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Result Matrix:</p>
            <div className="grid grid-cols-2 gap-2">
              {result.matrix.map((row, i) => (
                <div key={`result-${i}`} className="flex space-x-2">
                  {row.map((val, j) => (
                    <div
                      key={`result-${i}-${j}`}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-center text-blue-600 dark:text-blue-400"
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 'factorization':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Prime Factors: <span className="text-blue-600 dark:text-blue-400">{result.factors.join(' × ')}</span>
            </p>
          </div>
        );

      case 'integral':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Definite Integral: <span className="text-blue-600 dark:text-blue-400">{result.value}</span>
            </p>
          </div>
        );

      case 'series':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Sum: <span className="text-blue-600 dark:text-blue-400">{result.sum}</span>
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Terms: <span className="text-blue-600 dark:text-blue-400">{result.terms.join(', ')}</span>
            </p>
          </div>
        );

      case 'ohm':
        return (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {result.voltage && (
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Voltage: <span className="text-blue-600 dark:text-blue-400">{result.voltage} V</span>