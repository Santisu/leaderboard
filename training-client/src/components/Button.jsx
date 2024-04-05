export default function Button({text, onClick, disabled}) {

    const handleClick = () => {
        onClick()
    }
  return (
    <button 
    className={`bg-reddy-green text-reddy-white p-4 m-3 rounded-md transition-colors hover:bg-reddy-green-200 hover:cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
     onClick={handleClick} disabled={disabled ? true : false}>{text}</button>
  )
}
