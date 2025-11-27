import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

function MaintenancePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useSelector((state) => state.auth)
  
  // Get custom message from route state
  const customMessage = location.state?.message

  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center"
      >
        {/* Robot Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            {/* Robot Body */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            >
              {/* Robot Head */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mx-auto mb-2 relative shadow-lg">
                {/* Eyes */}
                <motion.div
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-3 left-3 w-2 h-2 bg-white rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                  className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"
                />
                {/* Antenna */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-400 rounded-full"
                />
              </div>

              {/* Robot Body */}
              <div className="w-20 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg mx-auto relative shadow-lg">
                {/* Control Panel */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gray-700 rounded">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1 h-1 bg-green-400 rounded-full absolute top-1 left-1"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-1 h-1 bg-blue-400 rounded-full absolute top-1 right-1"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-1 h-1 bg-yellow-400 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2"
                  />
                </div>
              </div>

              {/* Robot Arms */}
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute top-16 -left-2 w-6 h-2 bg-gray-400 rounded-full origin-right"
              />
              <motion.div
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute top-16 -right-2 w-6 h-2 bg-gray-400 rounded-full origin-left"
              />

              {/* Tools */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  x: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-14 -left-8 w-4 h-4"
              >
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ 
                  rotate: [0, -360],
                  x: [0, -5, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-14 -right-8 w-4 h-4"
              >
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Sparks/Effects */}
            <motion.div
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: 0.5
              }}
              className="absolute top-8 left-8 w-2 h-2 bg-yellow-400 rounded-full"
            />
            <motion.div
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                delay: 1
              }}
              className="absolute top-12 right-6 w-1 h-1 bg-orange-400 rounded-full"
            />
            <motion.div
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 1.5
              }}
              className="absolute bottom-8 left-12 w-1 h-1 bg-blue-400 rounded-full"
            />
          </div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
          >
            {customMessage || 'Robot Đang Sửa Chữa'}
          </motion.h2>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleGoBack}
            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay Lại
          </button>
          
          <button
            onClick={handleGoHome}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {'Về Trang Chủ'}
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
        
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`gear-${i}`}
            className="absolute text-gray-300 text-2xl"
            animate={{ rotate: 360 }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              right: `${5 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
          >
            ⚙️
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MaintenancePage