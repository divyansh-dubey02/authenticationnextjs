"use client"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Home() {
  const router =useRouter()

  const onSignup =async () =>{
    try {
   toast.success("directed to signup page  Successfully")
    router.push('/signup')
    } catch (error:any) {
      console.log("direction failed")
      toast.error(error.message)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Music App</h1>
      </div>


<button onClick={onSignup} className='border-2 border-white rounded-lg p-2  w-[140px] bg-[#0162f4] text-[#f1ef65] focus:outline-none'>
          Signup / login
        </button>

      
    </main>
  );
}
