/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import { Password } from '../global/InputFeilds';
import { Button } from 'antd';
import  { checkToken, fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import { useNavigate } from 'react-router';
import { useTheme } from '../../contexts/ThemeContext';

const ResetPassword = () => {
    const [info, setInfo] = React.useState({
        confirm: '',
        password: ''
    })
    const { branch } = useTheme();
    const navigate = useNavigate()
    // const [userInfo, setUserInfo] = React.useState<any>(null);
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    useEffect(() => {

        if (!token) {
            toast.error("Invalid password reset link");
            navigate('/login')
            return;
        }
        fetcher({
            path: '/user/check-token',
            method: 'POST',
            body: { token }
        }).then((_res: any) => {
            // setUserInfo(res.user)

        }).catch((err) => {
            toast.error(errorMessage(err));
            navigate('/login')
        })
    }, [])
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
            if (info.password !== info.confirm) {
                toast.error("Passwords do not match");
                return;
            }
            if (info.password.length < 6) {
                toast.error("Password must be at least 6 characters");
                return;
            }
            if (!token) {
                toast.error("Invalid password reset link");
                return;
            }
            await fetcher({
                path: '/user/update-pass',
                method: "POST",
                body: {
                    newPassword: info.password,
                    token
                },
            });
            window.location.pathname = "/login"
            toast.success("Password updated successfully");
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
                <h2 className='text-xl font-semibold text-center dark:text-white text-dark'>Update Password</h2>
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
                    onChange={(e: any) => setInfo({ ...info, confirm: e.target.value })}
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