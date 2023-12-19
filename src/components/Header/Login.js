import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDoc } from 'firebase/firestore';
import { userDocRef } from '../../firebase/userRef';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user.atom';
import { useHistory } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function Login() {

    const auth = getAuth();
    const [user, setUser] = useAtom(userAtom)
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getUserById = async (userId) => {
        try {
            const userDoc = await getDoc(userDocRef(userId));

            if (userDoc.exists()) {
                const userData = userDoc.data();    // Lấy dữ liệu của người dùng từ document
                console.log(userData);
                return userData;
            } else {
                console.log('Người dùng không tồn tại');
                return null;
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            return null;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;

                const userInfo = await getUserById(uid)    //lấy tt của một người dùng dựa trên userId
                setUser(userInfo);
                history.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Lỗi đăng nhập:", errorCode, errorMessage);
            })
    }

    return (

        <div>
            {user ? (
                <div>
                    <Home />
                </div>
            ) : (
                <div className='m-16 h-[calc(100vh-450px)]'>
                    <div className='md:m-auto md:w-[600px] shadow-xl'>
                        <div className='border border-solid border-black rounded-md p-8 '>
                            <div className='pb-6 grid grid-cols-3 '>
                                <label> Email: </label>
                                <input
                                    type="text"
                                    className='border border-solid border-current rounded-lg col-span-2 pl-4'
                                    placeholder='Email đã đăng ký'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className='pb-6 grid grid-cols-3'>
                                <label> Mật khẩu : </label>
                                <input
                                    type="password"
                                    className='border border-solid border-current rounded-lg col-span-2 pl-4'
                                    placeholder='Nhập mật khẩu'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='text-xl font-bold text-center pt-5'>
                                <button className='hover:text-blue-500' onClick={handleLogin} >
                                    Đăng nhập
                                </button>
                            </div>

                            <p className='text-center pt-6'>
                                Bạn chưa có tài khoản, <Link to="/register" className='underline hover:text-cyan-600 font-medium'> ĐĂNG KÝ NGAY </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Login;