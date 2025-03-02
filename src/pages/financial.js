import FinancialCalculatorCard from '../components/FinancialCalculatorCard';

const FinancialCalculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 tracking-tight">Financial Calculators</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          Make informed financial decisions with our suite of calculators. Whether you&apos;re planning a loan, calculating investments, or managing your finances.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FinancialCalculatorCard title="Loan Calculator" type="loan" />
          <FinancialCalculatorCard title="Investment Calculator" type="investment" />
          <FinancialCalculatorCard title="Income Tax Calculator" type="tax" />
          <FinancialCalculatorCard title="Currency Converter" type="currency" />
          <FinancialCalculatorCard title="GST Calculator" type="gst" />
          <FinancialCalculatorCard title="EMI Calculator" type="emi" />
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;
