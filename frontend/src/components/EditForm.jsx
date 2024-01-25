import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { changingAtom, loadingAtom, tokenAtom } from "../stores/atoms";
import axios from 'axios';
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL

const EditMovie = ({title, genre, releaseDate, director, id, setEditForm}) => {
    const [load, setload] = useRecoilState(loadingAtom);
    const setChange = useSetRecoilState(changingAtom);
    const token = useRecoilValue(tokenAtom);
    const [movie, setMovie] = useState({title, genre, releaseDate, director})

    const handleChange = (e)=>{
        const {name, value} = e.target
        setMovie({...movie, [name]: value})
    }

    const handleEdit = async()=>{
        try{
            const res = await axios.put(`${backendServerUrl}movie/${id}`, movie, {
                headers: {
                    Authorization: token
                }
            })
            setload(prev=> false);
            setChange(prev=>!prev);
        }catch(err){
            setload(prev=> false);
            console.log(err);
        }finally{
            setEditForm(prev=> false);
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setload(true);
        handleEdit();
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                <div className="absolute z-10 rounded-md shadow-md p-8 bg-white">
                    <button onClick={()=> setEditForm(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                        <FaTimes />
                    </button>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Movie</h2>
                    <form className="bg-white w-96 flex flex-col" onSubmit={handleSubmit} >
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={movie.title}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="genre" className="block text-sm font-medium text-gray-600">
                                Genre
                            </label>
                            <input
                                type="text"
                                id="genre"
                                name="genre"
                                value={movie.genre}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-600 mb-2">
                                Release Date
                            </label>
                            <input
                                type="date"
                                id="releaseDate"
                                name="releaseDate"
                                value={movie.releaseDate}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                placeholder="Select Release Date"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="director" className="block text-sm font-medium text-gray-600">
                                Director
                            </label>
                            <input
                                type="text"
                                id="director"
                                name="director"
                                value={movie.director}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                            value={load ? 'Editing Movie' : 'Edit Movie'}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditMovie;