import MathCalculatorCard from '../components/MathCalculatorCard';

const MathEngineering = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 tracking-tight">Math & Engineering Calculator</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          Advanced calculators for mathematics, engineering, and scientific computations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MathCalculatorCard title="Scientific Calculator" type="scientific" />
          <MathCalculatorCard title="Fraction Calculator" type="fraction" />
          <MathCalculatorCard title="Exponents & Roots" type="exponent" />
          <MathCalculatorCard title="Quadratic Equation" type="quadratic" />
          <MathCalculatorCard title="Matrix Operations" type="matrix" />
          <MathCalculatorCard title="Prime Factorization" type="factorization" />
          <MathCalculatorCard title="Integral Calculator" type="integral" />
          <MathCalculatorCard title="Arithmetic Series" type="series" />
          <MathCalculatorCard title="Ohm's Law" type="ohm" />
          <MathCalculatorCard title="Electric Bill" type="electric" />
        </div>
      </div>
    </div>
  );
};

export default MathEngineering;
