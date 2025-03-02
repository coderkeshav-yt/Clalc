import UnitConverterCard from '../components/UnitConverterCard';

const UnitConverters = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 tracking-tight">Unit Converters</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
          Convert between different units of measurement with precision and ease.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UnitConverterCard title="Length Converter" type="meters-to-feet" />
          <UnitConverterCard title="Weight Converter" type="kg-to-lbs" />
          <UnitConverterCard title="Volume Converter" type="liters-to-gallons" />
          <UnitConverterCard title="Temperature Converter" type="c-to-f" />
          <UnitConverterCard title="Energy Converter" type="joules-to-cal" />
          <UnitConverterCard title="Power Converter" type="w-to-kw" />
          <UnitConverterCard title="Time Converter" type="hours-to-min-sec" />
          <UnitConverterCard title="Distance Converter" type="km-to-miles" />
          <UnitConverterCard title="Temperature Scale" type="k-to-cf" />
        </div>
      </div>
    </div>
  );
};

export default UnitConverters;
