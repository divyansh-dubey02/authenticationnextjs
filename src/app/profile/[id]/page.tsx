'use client'


export default function page({params}:any){
  return(

    <div className='min-h-screen flex items-center justify-center' >
      <div className='flex flex-col w-[290px] h-[500px] bg-gray-900  rounded-lg border-2 border-white items-center py-2'>
        <h1  className=' mt-3 mb-2 text-2xl text-[#f1ef65]'>User Profile</h1>
        <h2 className="p-3 bg-green-500 rounded text-black" >{params.id}</h2>

      </div>
    </div>
  )
}