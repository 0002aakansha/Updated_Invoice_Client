import axios from 'axios'
import React, { useEffect } from 'react'

const Login = () => {

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios({
                url: 'http://localhost:5000/api/v1/user/forget/password',
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                data: { "email": "accounts@gammaedge.io" }
            })
        }
        fetchData()
    }, [])

    return (
        <>
            <form action="">
                <div className='flex flex-col'>
                    <label htmlFor="email" className='my-3'>Email*</label>
                    <input type="text" name="email" id="email" placeholder='Enter your email' className='p-4 bg-slate-100 text-slate-500 outline-none' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="pass" className='my-3'>Password*</label>
                    <input type="text" name="pass" id="pass" placeholder='Enter your Password' className='p-4 bg-slate-100 text-slate-500 outline-none' />
                </div>
                <div className='flex justify-center'>
                    <button className='bg-purple-700 text-stone-100 w-full py-2 text-lg font-semibold my-4'>Login</button>
                </div>
            </form>
            <p className='text-stone-500 underline cursor-pointer'>Forgot Password?</p>
        </>
    )
}

export default Login

