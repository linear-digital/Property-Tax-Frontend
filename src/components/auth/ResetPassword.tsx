/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import {  Password } from '../global/InputFeilds';
import { Button } from 'antd';
import { checkToken, fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { useTheme } from '../../contexts/ThemeContext';

const ResetPassword = () => {
    const [info, setInfo] = React.useState({
        email: '',
        password: ''
    })
    const { branch } = useTheme();
    const navigate = useNavigate()
    useEffect(() => {
        (
            async () => {
                const user = await checkToken();
                if (user) {
                    navigate('/')
                }
            }
        )()
    }, [])
    const loginUser = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetcher({
                path: '/user/login',
                method: "POST",
                body: info,
                
            })
            if (!res.token) {
                toast.error("Invalid Credentials");
                return;
            }
            Cookies.set("token", res.token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }); // expires in 1 day
            window.location.pathname = "/"
            toast.success(res.message);
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }
    return (
        <div className='w-full h-screen   flex justify-center items-center'>
            <form className='dark:bg-[#2F3349] w-[400px] rounded-lg shadow-xl px-5 pt-6 pb-10 flex flex-col gap-y-4'
                onSubmit={loginUser}
            >
                <img src={branch.logo} alt=""
                    className='w-[100px] h-[100px] mx-auto object-cover rounded-full'
                />
                <Password
                    label='Password'
                    name='password'
                    type='password'
                    onChange={(e: any) => setInfo({ ...info, password: e.target.value })}
                    required
                />
                <Password
                    label='Confirm Password'
                    name='confirm_password'
                    type='password'
                    onChange={(e: any) => setInfo({ ...info, password: e.target.value })}
                    required
                />
                <Button type='primary' htmlType='submit'>
                    Update Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;