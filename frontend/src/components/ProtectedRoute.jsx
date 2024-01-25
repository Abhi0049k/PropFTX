import { useRecoilValue } from "recoil"
import { tokenAtom } from "../stores/atoms"
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children})=>{
    const token = useRecoilValue(tokenAtom);
    return (token ? children : <Navigate to={'/login'}/>)
}

export default ProtectedRoute