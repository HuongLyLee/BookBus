import React from 'react'

function Footer() {
    return (
        <div className={'flex justify-around bg-[#0891b2] h-[220px] p-8 text-white '}>
                <div className='text-lg font-semibold'>
                    <img
                        className='w-[200px] h-auto pt-4 m-auto rounded-[50%]'
                        src="./images/logo.png" alt=''
                    />
                </div>

                <div className='text-lg font-semibold'>
                    <p> TRUNG TÂM TỔNG ĐÀI & CSKH 1900 6888 </p>
                    <h1> CÔNG TY CỔ PHẦN XE KHÁCH MINH LÝ</h1>
                    <img
                        className='w-[200px] h-auto pt-4 m-auto'
                        src="./images/logo_BoCongThuong.png" alt=''
                    />
                </div>

                <div>
                    <p> Địa chỉ: Số 10 Tôn Thất Thuyết, Cầu Giấy, Hà Nội </p>
                    <p> Email: minhly@gmail.com </p>
                    <p> Điện thoại: 0987654321 </p>
                    <p> Fax : 0288835674</p>
                </div>
        </div>

    )
}

export default Footer 