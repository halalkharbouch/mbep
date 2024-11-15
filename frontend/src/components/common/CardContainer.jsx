import { motion } from 'framer-motion';
function CardContainer({ children, title, isFullWidth = false, isFullHeight = false }) {
  return (
    <motion.div
      className={`bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg p-6 rounded-xl border border-gray-700 ${isFullWidth ? 'lg:col-span-2' : ''} ${isFullHeight ? 'lg:row-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
      <div className="h-80">{children}</div>
    </motion.div>
  );
}

export default CardContainer;
