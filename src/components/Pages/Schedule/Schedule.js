import React from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

function Schedule() {
    return (
        <div className='min-h-[580px]'>
                <div className='border border-solid rounded-md shadow-md m-[50px] p-4'>
                    <div className="flex gap-8 container mx-auto mt-6 bg-white mb-5">

                        <input type="text" name="diem-di" placeholder=" 🔍   Nhập điểm đi"
                            className="w-full p-2 border rounded-lg"
                        />
                        <SyncAltIcon />
                        <input type="text" name="diem-den" 
                            placeholder=" 🔍   Nhập điểm đến"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                </div>
        </div>
    )
}

export default Schedule