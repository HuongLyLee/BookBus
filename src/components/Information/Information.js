import React from 'react';

function Information() {
    return (
        <div className='min-h-[550px]'>
            <div className='border border-solid rounded-md shadow-md m-[100px] p-4'>
                <h1 className='text-center text-lg font-semibold'> TRA CỨU THÔNG TIN ĐẶT VÉ </h1>

                <div className="gap-8 container mx-auto bg-white m-8">
                    <input type="text" name="sodienthoai" placeholder=" Vui lòng nhập số điện thoại"
                        className="w-full p-2 border rounded-lg"
                    />

                    <input type="text" name="mave"
                        placeholder="Vui lòng nhập mã vé"
                        className="w-full p-2 border rounded-lg my-8"
                    />

                    <div className="text-center">
                        <button type="submit" className="bg-[#06b6d4] text-white p-2 rounded-lg hover:bg-[#7dd3fc] ">
                            Tra cứu 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information