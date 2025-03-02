import MiscCalculatorCard from '../components/MiscCalculatorCard';

const Miscellaneous = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 tracking-tight">Miscellaneous Calculators</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          A collection of useful calculators and tools for various everyday calculations and conversions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MiscCalculatorCard title="Tip Calculator" type="tip" />
          <MiscCalculatorCard title="Discount Calculator" type="discount" />
          <MiscCalculatorCard title="Grade Calculator" type="grade" />
          <MiscCalculatorCard title="Probability Calculator" type="probability" />
          <MiscCalculatorCard title="Password Generator" type="password" />
          <MiscCalculatorCard title="Color Converter" type="color" />
        </div>
      </div>
    </div>
  );
};

export default Miscellaneous;
