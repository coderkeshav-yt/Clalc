import HealthCalculatorCard from '../components/HealthCalculatorCard';

const HealthCalculator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 tracking-tight">Health Calculators</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          Track your health and fitness goals with our comprehensive suite of calculators. Monitor your BMI, calculate calories, track steps, and plan your workouts effectively.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <HealthCalculatorCard title="BMI Calculator" type="bmi" />
          <HealthCalculatorCard title="Calorie Calculator" type="calories" />
          <HealthCalculatorCard title="Step to Distance" type="steps" />
          <HealthCalculatorCard title="Running Pace Calculator" type="pace" />
          <HealthCalculatorCard title="Sleep Calculator" type="sleep" />
        </div>
      </div>
    </div>
  );
};

export default HealthCalculator;
