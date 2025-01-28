export default function Settings() {
  return (
    <div className='flex items-center justify-center min-h-screen text-white'>
      <div className='text-center space-y-4'>
        <h1 className='text-4xl font-bold text-gray-200'>Settings</h1>
        <p className='text-lg text-gray-400'>
          This page is{" "}
          <span className='text-yellow-400 font-semibold'>
            under development
          </span>
          .
        </p>
        <div className='flex justify-center'>
          <div className='w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></div>
        </div>
      </div>
    </div>
  );
}
