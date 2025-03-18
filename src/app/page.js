'use client'

import React, { useEffect } from 'react';
import supabase from './supabase-client';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  //โหลดข้อมูลเมื่อเข้ามาหน้านี้
  useEffect(() => {
    localStorage.clear();
  }, []);

  //เข้าสู่ระบบ function
  const login = async () => {
    //ถ้าไม่กรอกชื่อผู้ใช้หรือรหัสผ่าน ให้ return ออกไป ไม่ทำอะไร
    if (document.getElementById('username').value == '' || document.getElementById('password').value == '') {
      return;
    }
    //ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    let { data: users, error } = await supabase
      .from('users')
      .select("username,name,role")
      //เช็คว่ามีชื่อผู้ใช้และรหัสผ่านตรงกับที่กรอกมาหรือไม่
      .eq('username', document.getElementById('username').value)
      .eq('password', document.getElementById('password').value)

    //ถ้าเกิด error ให้แสดงข้อความ error
    if (error) {
      alert("Error fetching: " + error);
    } else {
      //ถ้ามีข้อมูลผู้ใช้ในฐานข้อมูล ให้เก็บข้อมูลผู้ใช้ลง localStorage และเปลี่ยนหน้าไปหน้า dashboard
      if (users.length > 0) {
        localStorage.setItem("userData", JSON.stringify(users[0]));
        router.push('/dashboard')
      }
      else {
        //ถ้าไม่มีข้อมูลผู้ใช้ให้แสดง dialog แจ้งเตือน ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
        document.getElementById('modal_login').showModal();
      }
    }
  };

  //ส่วนของหน้าเว็บ
  //  <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
  return (
    <>
      <div className="relative bg-gray-900 min-h-screen flex flex-col items-center justify-center">

        {/* ภาพพื้นหลังเบลอ */}
        <div className="absolute inset-0 bg-[url('/lsm.png')] bg-cover bg-center blur-lg"></div>

        {/* กล่อง Login */}
        <div className="relative z-10 bg-gray-800/80 p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-6">NAMPAK LSM STOCK </h1>

          {/* ช่องกรอกชื่อผู้ใช้ */}
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            id="username"
            className="input input-bordered w-full max-w-xs mt-2 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-300"
          />

          {/* ช่องกรอกรหัสผ่าน */}
          <input
            type="password"
            placeholder="พาสเวิร์ด"
            id="password"
            className="input input-bordered w-full max-w-xs mt-4 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-300"
          />

          {/* ปุ่มเข้าสู่ระบบ */}
          <button
            className="btn bg-red-600 hover:bg-red-700 text-white w-2/3 mt-6 py-3 rounded-lg font-semibold"
            onClick={() => login()}
          >
            เข้าสู่ระบบ
          </button>
        </div>

      </div>

      {/* //dialog แจ้งเตือน ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง */}
      <dialog id="modal_login" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="py-4">ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</h1>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">ปิด</button>
            </form>
          </div>
        </div>
      </dialog>
    </>

  );
}
