import CalculatorCard from '../components/CalculatorCard';
import BasicCalculatorCard from '../components/BasicCalculatorCard';

const BasicCalculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 tracking-tight">Basic Calculator</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          A comprehensive suite of calculators for everyday calculations, from basic arithmetic to specialized calculations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2 lg:col-span-3">
            <CalculatorCard />
          </div>
          <BasicCalculatorCard title="Volume Calculator" type="volume" />
          <BasicCalculatorCard title="Area Calculator" type="area" />
          <BasicCalculatorCard title="Percentage Calculator" type="percentage" />
          <BasicCalculatorCard title="Age Calculator" type="age" />
          <BasicCalculatorCard title="Days Between Dates" type="days" />
          <BasicCalculatorCard title="Time Duration Calculator" type="duration" />
          <BasicCalculatorCard title="Random Number Generator" type="random" />
        </div>
      </div>
    </div>
  );
};

export default BasicCalculator;
