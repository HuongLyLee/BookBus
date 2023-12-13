import React from 'react';
import Heading from "../../common/Heading";
import { Grid } from '@mui/material';

function Introduce() {
  return (
    <>
      <section>
        <div className='p-4 text-center' >
          <Heading
            title='MINH LÝ - CHẤT LƯỢNG LÀ DANH DỰ'
            subtitle='Được khách hàng tin tưởng và lựa chọn'
          />
        </div>

        <div className='justify-between justify-items-center'>
          <Grid container>
            <Grid className='grid content-center ' item xs={12} sm={6}>
              <div className='text-center m-auto self-center'>
                <h1> HỆ THỐNG ĐẶT XE VÀ GIƯỜNG NẰM CAO CẤP </h1>
                <h3> Nền tảng đặt xe tiện lợi, uy tín </h3>
                <p> Cung cấp hàng trăm chuyến xe, thanh toán linh hoạt và tiện lợi.</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <img
                className='m-auto'
                src="./images/image_1.png"
                alt=''
              />
            </Grid>

          </Grid>


        </div>
      </section>
    </>
  )
}

export default Introduce