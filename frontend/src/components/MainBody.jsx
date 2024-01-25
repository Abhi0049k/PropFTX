import axios from 'axios'
import { useCallback, useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from 'recoil';
import { changingAtom, loadingAtom, tokenAtom } from '../stores/atoms';
import MovieCard from './MovieCard';
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL

const MainBody = ()=>{
    const [movies, setMovies] = useState([]);
    const token = useRecoilValue(tokenAtom);
    const [load, setLoad] = useRecoilState(loadingAtom);
    const change = useRecoilValue(changingAtom);

    const fetchMovies = useCallback(async()=>{
        try{
            const res = await axios.get(`${backendServerUrl}movie`, {
                headers: {
                    Authorization: token
                }
            })
            setMovies(res.data)
        }catch(err){
            console.log(err);
        }
    }, [])

    useEffect(()=>{
        setLoad(prev=> true);
        fetchMovies();
        setLoad(prev=> false);
    }, [change])
    return (
        <div className='flex flex-wrap gap-4 p-4'>
            {
                load ? (<p className='text-2xl text-center text-gray-600'>Loading...</p>) : movies.length ? (
                    movies.map(movie => <MovieCard key={movie._id} {...movie} />)
                ) : (<p className='text-2xl text-center text-gray-600'>No movies available. Add your first movie!</p>)
            }
        </div>
    )
}

export default MainBody