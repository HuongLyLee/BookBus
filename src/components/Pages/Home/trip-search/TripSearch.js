import React from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

function TripSearch() {
  return (
    <>

        <div className='border border-solid rounded-md shadow-md m-[60px] p-4'>
          <div className="flex gap-8 container mx-auto mt-8 bg-white mb-5">

            <input type="text" name="diem-di" placeholder="Điểm đi"
              className="w-full p-2 border rounded-lg"
            />
            <SyncAltIcon />
            <input type="text" name="diem-den" placeholder="Điểm đến"
              className="w-full p-2 border rounded-lg"
            />
            <input type="date" name="ngay-di"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="bg-[#06b6d4] text-white p-2 rounded-lg hover:bg-[#7dd3fc] ">
              Tìm chuyến xe
            </button>
          </div>

        </div>

    </>
  )
}

export default TripSearch