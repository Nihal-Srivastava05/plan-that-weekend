import { motion, AnimatePresence } from "framer-motion";
import { FileUpload } from "./FileUpload";
import AddHolidays from "./AddHolidays";
import { Card } from "./ui/Card";
import { YearSelector } from "./shared/YearSelector";
import { CountryPresets } from "./features/holidays/CountryPresets";
import { useHolidays } from "../hooks/useHolidays";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { holidays, removeHoliday, clearAllHolidays } = useHolidays();
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
          fixed lg:static
          top-0 left-0 bottom-0
          w-80
          bg-neutral-50 dark:bg-neutral-900
          border-r border-neutral-200 dark:border-neutral-700
          overflow-y-auto
          z-40
          lg:!transform-none
        `.trim().replace(/\s+/g, ' ')}
      >
        <div className="p-4 space-y-4">
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <Card>
            <YearSelector />
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Quick Load
            </h3>
            <CountryPresets />
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Import CSV
            </h3>
            <FileUpload />
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Add Holiday
            </h3>
            <AddHolidays />
          </Card>

          {holidays.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Your Holidays ({holidays.length})
                </h3>
                <button
                  onClick={clearAllHolidays}
                  className="text-xs text-error-600 dark:text-error-400 hover:underline"
                >
                  Clear All
                </button>
              </div>
              <motion.div
                className="space-y-2 max-h-96 overflow-y-auto"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {holidays.map((holiday, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-neutral-900 dark:text-neutral-100 flex-1">
                      {holiday}
                    </span>
                    <button
                      onClick={() => removeHoliday(holiday)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error-100 dark:hover:bg-error-900/30 rounded"
                      aria-label="Remove holiday"
                    >
                      <svg className="w-4 h-4 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          )}
        </div>
      </motion.aside>
    </>
  );
}
