import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <h2 className="text-6xl font-bold mb-5">404 Error</h2>
        <p className='mb-7'>The Page you are looking for doesn't exist or an other error occured.</p>
        <Link className="px-4 py-2 bg-blue-500 text-white rounded-md" href="/">Return Home</Link>
      </div>
    </div>
  )
}