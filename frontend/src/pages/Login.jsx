import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingAtom, tokenAtom } from "../stores/atoms";
import Modal from "../components/Modal";
import {useNavigate} from 'react-router-dom';
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL

const Login = () => {
    const setToken = useSetRecoilState(tokenAtom);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [load, setLoad] = useRecoilState(loadingAtom);
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoad(prev => true);
            const res = await axios.post(`${backendServerUrl}user/login`, user)
            setToken(prev => res.data.token);
            setLoad(prev => false);
            setOpenModal(prev=> true);
            setTimeout(()=>{
                navigate('/');
            }, 1000);
        } catch (err) {
            setLoad(prev => false);
            console.log(err);
        }
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="rounded-md shadow-md p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login</h2>
                    <form className="bg-white w-96 flex flex-col" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                            value={load ? 'Logging in' : 'Login'}
                        />
                        <p className="mt-4 text-gray-600 text-lg">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-500 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            {
                openModal ? <Modal color={'text-green-600'} setChange={setOpenModal} body={'Login Successful!'}/> : ''
            }
        </>
    )
}

export default Login;