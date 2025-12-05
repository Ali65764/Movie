import NotFoundImage from '../assets/notfound.jpeg'
const NotFound = () => {
  return (
    <div className='w-full h-[100vh]'>
      <img src={NotFoundImage} alt="not found" className='lg:h-full lg:w-full'/>
    </div>
  )
}

export default NotFound