import React from 'react'

function Footer() {
    return (
        <div className={'flex justify-around bg-[#0891b2] h-[170px] p-4 text-white '}>
                <div className='text-lg font-semibold'>
                    <img
                        className='w-[150px] h-auto pt-4 m-auto rounded-[50%]'
                        src="./images/logo.png" alt=''
                    />
                </div>

                <div className='text-base font-medium'>
                    <p> TRUNG TÂM TỔNG ĐÀI & CSKH 1900 6888 </p>
                    <h2> CÔNG TY CỔ PHẦN XE KHÁCH MINH LÝ</h2>
                    <img
                        className='w-[150px] h-auto pt-4 m-auto'
                        src="./images/logo_BoCongThuong.png" alt=''
                    />
                </div>

                <div className='text-sm'>
                    <p> Địa chỉ: Số 688 Giải Phóng, Hà Nội </p>
                    <p> Email: minhly@gmail.com </p>
                    <p> Điện thoại: 0987654321 </p>
                    <p> Fax : 0288835674</p>
                </div>
        </div>

    )
}

export default Footer 