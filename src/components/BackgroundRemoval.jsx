// src/components/BackgroundRemoval.jsx
import { useState, useRef } from 'react'
import { useUser } from '@clerk/clerk-react'
import { removeBackground } from '@imgly/background-removal'
import { FiUpload, FiDownload, FiTrash2, FiImage } from 'react-icons/fi'


const BackgroundRemoval = () => {
  const { user } = useUser()
  const [originalImage, setOriginalImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)




  // Configuration
  const MAX_FILE_SIZE_MB = 5
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

  // Validate uploaded file
  const validateFile = file => {
    if (!file) throw new Error('No file selected')

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error('Only JPG, PNG, and WEBP images are allowed')
    }

    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      throw new Error(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`)
    }

    return true
  }

  // Handle file processing
  const processFile = async file => {
    try {
      validateFile(file)

      setIsProcessing(true)
      setError(null)

      // Create preview of original image
      setOriginalImage(URL.createObjectURL(file))

      // Process with IMG.LY
      const blob = await removeBackground(file)
      setProcessedImage(URL.createObjectURL(blob))
    } catch (err) {
      console.error('Processing error:', err)
      setError(err.message)
      setOriginalImage(null)
      setProcessedImage(null)
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle file input change
  const handleFileInput = async e => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0])
    }
  }

  // Handle drag and drop events
  const handleDragOver = e => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async e => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0])
    }
  }

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  // Reset the state
  const resetAll = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setError(null)
  }

  return (
    <div className='max-w-5xl mx-auto mt-20'>
      <div className='bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Background Removal Tool</h2>
            <p className='opacity-90'>
              Welcome back, {user.firstName || user.username}!
            </p>
          </div>
          <div className='mt-4 md:mt-0'>
            <div className='flex items-center bg-indigo-700 rounded-full px-4 py-2'>
              <div className='bg-white bg-opacity-20 rounded-full p-2 mr-2'>
                <FiImage className='text-xl' />
              </div>
              <div>
                <div className='text-xs opacity-80'>Premium Plan</div>
                <div className='text-sm font-medium'>Unlimited Removals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 mb-8 text-center transition-all
          ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-300'
          }
          ${originalImage ? 'max-w-2xl mx-auto' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!originalImage ? (
          <>
            <div className='flex justify-center mb-5'>
              <div className='w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center'>
                <FiUpload className='text-indigo-600 text-2xl' />
              </div>
            </div>

            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              {isDragging ? 'Drop your image here' : 'Drag & drop your image'}
            </h3>

            <p className='text-gray-500 mb-5'>or click to browse files</p>

            <button
              onClick={triggerFileInput}
              disabled={isProcessing}
              className={`px-6 py-3 rounded-lg font-medium text-white shadow-md transition-opacity ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:opacity-90'
              }`}
            >
              Select Image
            </button>

            <p className='text-sm text-gray-500 mt-5'>
              Supports JPG, PNG, WEBP • Max {MAX_FILE_SIZE_MB}MB
            </p>

            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileInput}
              accept={ALLOWED_FILE_TYPES.join(',')}
              className='hidden'
              disabled={isProcessing}
            />
          </>
        ) : (
          <div className='flex flex-col items-center'>
            <div className='flex justify-center mb-5'>
              <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center'>
                <FiImage className='text-green-600 text-2xl' />
              </div>
            </div>

            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Image Processing Complete!
            </h3>

            <div className='flex gap-4 mt-6'>
              <button
                onClick={triggerFileInput}
                className='px-5 py-2.5 bg-white border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center gap-2'
              >
                <FiUpload className='text-lg' />
                Upload New
              </button>

              <button
                onClick={resetAll}
                className='px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2'
              >
                <FiTrash2 className='text-lg' />
                Reset All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results section */}
      {originalImage && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          {/* Original Image */}
          <div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
            <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-4'>
              <h2 className='text-lg font-semibold text-white'>
                Original Image
              </h2>
            </div>
            <div className='p-4'>
              <div className='aspect-square flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden'>
                <img
                  src={originalImage}
                  alt='Original'
                  className='w-full h-auto max-h-[400px] object-contain'
                />
              </div>
            </div>
          </div>

          {/* Processed Image */}
          <div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
            <div className='bg-gradient-to-r from-green-500 to-emerald-600 p-4'>
              <h2 className='text-lg font-semibold text-white'>
                Background Removed
              </h2>
            </div>
            <div className='p-4'>
              <div className='aspect-square flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden'>
                {processedImage ? (
                  <img
                    src={processedImage}
                    alt='Background Removed'
                    className='w-full h-auto max-h-[400px] object-contain'
                  />
                ) : (
                  <div className='text-center p-8'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4'></div>
                    <p className='text-gray-600'>Removing background...</p>
                  </div>
                )}
              </div>
            </div>

            {processedImage && (
              <div className='p-4 border-t border-gray-100'>
                <a
                  href={processedImage}
                  download='background-removed.png'
                  className='w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md'
                >
                  <FiDownload className='text-lg' />
                  Download Result
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className='fixed bottom-6 right-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg max-w-sm'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>
              <svg
                className='h-6 w-6 text-red-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-red-700'>{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Processing overlay */}
      {isProcessing && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-2xl shadow-xl max-w-md text-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-6'></div>
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>
              Processing Your Image
            </h3>
            <p className='text-gray-600 mb-6'>
              AI is working its magic to remove the background...
            </p>
            <div className='h-1.5 bg-gray-200 rounded-full overflow-hidden'>
              <div
                className='h-full bg-indigo-600 animate-pulse'
                style={{ width: '70%' }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundRemoval
