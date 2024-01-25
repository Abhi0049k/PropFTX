import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { changingAtom, loadingAtom, tokenAtom } from "../stores/atoms";
import axios from 'axios';
import EditMovie from "./EditForm";
import { useState } from "react";
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const MovieCard = ({ _id, genre, director, title, releaseDate }) => {
    const [load, setLoad] = useRecoilState(loadingAtom);
    const setchange = useSetRecoilState(changingAtom);
    const [openEditForm, setEditForm] = useState(false);
    const token = useRecoilValue(tokenAtom);

    const handleDelete = async () => {
        try {
            setLoad(true);
            const res = await axios.delete(`${backendServerUrl}movie/${_id}`, {
                headers: {
                    Authorization: token
                }
            })
            setLoad(false);
            setchange(prev => !prev);
        } catch (err) {
            setLoad(false);
            console.log(err);
        }
    }
    
    const handleChange = ()=>{
        setEditForm(prev=>!prev);
    }

    const handleEdits = ()=>{
        console.log({_id, genre, director, title, releaseDate})
        setEditForm(prev=> true);
    }

    return (
        <>
            <div className="rounded w-fit shadow-lg p-10">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-lg">Genre: {genre}</p>
                <p className="text-gray-700 text-lg">Director: {director}</p>
                <p className="text-gray-700 text-lg">Release Date: {releaseDate}</p>
                <div className="flex gap-2">
                    <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 ">{load ? 'Deleting' : 'Delete'}</button>
                    <button onClick={handleEdits} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Edit</button>
                </div>
            </div>
            {
                openEditForm && <EditMovie setEditForm={handleChange} title={title} genre={genre} director={director} releaseDate={releaseDate} id={_id}/>
            }

        </>
    );
};

export default MovieCard;