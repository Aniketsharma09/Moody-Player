import './nav.css';
const Nav = () => {
  return (
    <div className='nav flex bg-gray-100 py-2 px-10 iteam-center justify-between w-full'>
        <div className='flex items-center justify-between w-[50%] '>
            <h1 className="text-xl font-semibold tracking-wide ">Moody Player</h1>
        </div>
        <div className='flex items-center justify-between  '>
            <button className='py-2 px-4 bg-green-200 rounded-md'>login</button>
        </div>
    </div>
  )
}

export default Nav