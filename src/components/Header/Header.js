import * as React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user.atom';

function Header() {
    const [user, setUser] = useAtom(userAtom)

    return (
        <div className='bg-[#06b6d4] h-[150px] p-6'>

            <div className='flex justify-end p-4'>
                <div className='border border-solid border-black bg-white rounded-xl p-2'>
                    {!user ? (
                        <a href="/login">
                            <LoginIcon /> Đăng nhập / Đăng ký
                        </a>
                    ) : (
                        <a href="/register">
                            <LogoutIcon /> Đăng xuất
                        </a>

                    )}
                </div>
            </div>

            <div className='flex gap-6 justify-around text-white text-base font-bold'>
                <a href="/"> Trang chủ </a>
                <a href="/schedule"> Lịch trình </a>
                <a href="/information"> Tra cứu vé </a>
                <a href="/blogs"> Tin tức </a>
                <a href="/contact"> Về chúng tôi </a>
            </div>

        </div>
    );
}

export default Header