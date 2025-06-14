import { SignInButton } from "@clerk/clerk-react"

function Home () {
  return (
    <>
      <header className='text-center mb-12 min-h-screen flex justify-center items-center overflow-hidden'>
        <div className="outline p-4 overflow-hidden">
          <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3'>
            Magic Background Remover
          </h1>
          <p className='text-gray-600 max-w-lg mx-auto'>
            Remove backgrounds from your images instantly with AI-powered
            processing. Just upload an image and download the result!
          </p>
          <div><div className="underline text-indigo-600 px-4 py-2 rounded-xl mt-4"><SignInButton/></div></div>
        </div>
      </header>
    </>
  )
}

export default Home
