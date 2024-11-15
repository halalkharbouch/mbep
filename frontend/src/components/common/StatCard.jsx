import { motion } from 'framer-motion';
function StatCard({ name, value, imgSrc }) {
  return (
    <motion.div
      className="flex flex-col justify-between bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg p-4 rounded-xl border border-gray-700"
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-xl font-medium text-gray-400">
          <img src={imgSrc} className='mr-2 size-10' alt="Icon" />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-gray-100">{value}</p>
      </div>
    </motion.div>
  );
}

export default StatCard;
