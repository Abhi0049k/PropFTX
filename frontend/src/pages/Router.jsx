import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader';
import ProtectedRoute from '../components/ProtectedRoute';
const Login = lazy(()=> import('./Login'))
const Register = lazy(()=> import('./Register'))
const Home = lazy(()=> import('./Home'))
const PageNotFound = lazy(()=> import('./PageNotFound'))

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRoute><Suspense fallback={<Loader/>}><Home/></Suspense></ProtectedRoute>} />
            <Route path='/register' element={<Suspense fallback={<Loader/>}><Register/></Suspense>} />
            <Route path='/login' element={<Suspense fallback={<Loader/>}><Login/></Suspense>} />
            <Route path='/*' element={<Suspense fallback={<Loader/>}><PageNotFound/></Suspense>} />
        </Routes>
    )
}

export default Router;