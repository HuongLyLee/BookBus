import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebaseConfig';
import { Link, useHistory } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";


const defaultData = {
  fullName: '',
  email: '',
  phone: '',
  password: ''
}

function Register() {
  const history = useHistory();
  const [formData, setFormData] = useState(defaultData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    const { email, password, phone, fullName } = formData;

    if (!email || !password) {
      alert('Vui lòng nhập email và mật khẩu.');
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const data = {
          fullName,
          email,
          phone,
          uid: user.uid,
          role: 'member'
        }
        console.log(data);
        console.log(user)

        const docRef = doc(db, 'users', user.uid);
        setDoc(docRef, data, { merge: true })
          .then(() => {
            alert('Bạn đã đăng ký thành công.')
          })

        history.push('/login');

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Lỗi đăng ký:", errorCode, errorMessage);
      })
  };

  return (

    <div className='m-16 h-[calc(100vh-500px)]'>
      <div className='m-[20px] text-sm md:m-auto md:w-[700px] md:text-lg border border-solid border-black rounded-md p-8 '>
        <div className='max-h-[600px]'>

          <div className='pb-6 grid grid-cols-3'>
            <label htmlFor="email"> Email :</label>
            <input type="text" name="email" id="email" required
              placeholder='Nhập mật khẩu của bạn'
              className='border border-solid border-current rounded-lg col-span-2 pl-4'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='pb-6 grid grid-cols-3'>
            <label htmlFor="phone"> Số điện thoại :</label>
            <input type="text" name="phone" id="phone" required
              placeholder='Nhập số điện thoại'
              className='border border-solid border-current rounded-lg col-span-2 pl-4'
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className='pb-6 grid grid-cols-3'>
            <label htmlFor="fullName"> Họ tên :</label>
            <input type="text" name="fullName" id="fullName" required
              placeholder='VD: Huong ...'
              className='border border-solid border-current rounded-lg col-span-2 pl-4'
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className='pb-6 grid grid-cols-3'>
            <label htmlFor="password"> Mật khẩu :</label>
            <input type="password" name="password" id="password" required
              placeholder='Tối thiểu 6 kí tự'
              className='border border-solid border-current rounded-lg col-span-2 pl-4'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div onClick={handleRegister} className='text-xl font-bold text-center pt-5 text-cyan-500 '>
            <button className='hover:text-blue-500'> Đăng ký </button>
          </div>

          <p className='text-center italic'> Bằng cách đăng ký, bạn đã đồng ý với Điều khoản sử dụng </p>

          <p className='text-center pt-6 '>
            Bạn đã có tài khoản, <Link to="/login" className='underline hover:text-cyan-600 font-medium'> ĐĂNG NHẬP </Link>
          </p>
        </div>
      </div>
    </div>


  );
}

export default Register;