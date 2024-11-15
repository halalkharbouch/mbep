import { motion } from 'framer-motion';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 text-gray-200 relative">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete this partner? This action is irreversible.
        </p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DeleteConfirmationModal;
