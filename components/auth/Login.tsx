import login from '@/axios/api/login'
import setCookie from '@/utils/cookies'
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

const Login = () => {

    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [loading, setisLoading] = useState<boolean>(false)
    const router = useRouter()

    async function submitHandler(e: FormEvent) {
        e.preventDefault()

        if (email && password) {
            setisLoading(true)
            const response = await login({ email, password });

            if (response) {
                router.push('/dashboard')
                setCookie(response.token)
                localStorage.setItem('user', response.user._id)
                toast.success(response.message)
            }

            setisLoading(false)
        }
        else toast.error('All fields are required!')
    }

    return (
        <>
            <form action="" onSubmit={submitHandler}>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='my-3'>Email*</label>
                    <input type="text" name="email" id="email"
                        placeholder='Enter your email'
                        className='p-4 bg-slate-100 text-slate-500 outline-none'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="pass" className='my-3'>Password*</label>
                    <input type="text" name="pass" id="pass" placeholder='Enter your Password' className='p-4 bg-slate-100 text-slate-500 outline-none'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex justify-center'>
                    <button
                        className={`bg-[#5a51be] text-stone-100 w-full py-2 text-lg font-semibold my-4 cursor-${loading ? 'not-allowed': 'pointer'}`}
                    >
                        {loading ? 'Logging...' : 'Login'}
                    </button>
                </div>
            </form>
            <p className='text-stone-500 underline cursor-pointer'>Forgot Password?</p>
        </>
    )
}

export default Login

