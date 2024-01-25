import { useCallback, useState } from "react"
import AddMovie from "./AddMovie"

const Navbar = () => {
    const [openForm, setForm] = useState(false);

    const handleClick = useCallback(()=>{
        setForm(true);
    }, [])

    return (
        <>
            <nav className="flex border border-gray-300 h-16 px-8 justify-between items-center bg-white shadow-md">
                <h1 className="text-3xl font-bold text-gray-800">PropFTX</h1>
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" onClick={handleClick}>
                    Add Movie
                </button>
            </nav>
            {
                openForm ? <AddMovie setForm={setForm}/> : ''
            }
        </>
    )
}

export default Navbar