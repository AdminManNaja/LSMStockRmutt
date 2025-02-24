'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Dashboard() {
    // ประกาศตัวแปร
    const router = useRouter()
    const [userData, setUserData] = useState([]);

    // โหลดข้อมูลเมื่อเปิดหน้าเว็บครั้งแรก
    useEffect(() => {
        // เช็คว่ามีข้อมูลใน localStorage หรือไม่ ถ้าไม่มีให้เปลี่ยนหน้าไปที่หน้า login
        if (!localStorage.getItem('userData')) {
            router.push('/')
        } else {
            // ถ้ามีข้อมูลใน localStorage ให้เก็บข้อมูลในตัวแปร userData 
            setUserData(JSON.parse(localStorage.getItem('userData')));
        }
    }, []);

    // ออกจากระบบ function
    const logout = () => {
        // ลบข้อมูลใน localStorage และเปลี่ยนหน้าไปที่หน้า login
        localStorage.clear();
        router.push('/')
    }

    // ส่วนของหน้าเว็บ
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/header.jpg')] bg-cover bg-center blur-md opacity-50"></div>

            {/* กล่องเนื้อหา */}
            <div className="relative z-10 bg-gray-800/80 p-8 rounded-2xl shadow-lg flex flex-col items-center">
                <h1 className="text-4xl font-bold">
                    <span className="text-yellow-400">LSM 64</span> <span className="text-white">Management</span>
                </h1>

                {/* เช็ค Role ของ User */}
                {userData.role === 'admin' ? (
                    <>
                        <button className="btn bg-red-500 hover:bg-red-700 text-white w-2/3 mt-4" onClick={() => router.push('/addstock')}>เพิ่มสินค้า</button>
                        <button className="btn bg-red-500 hover:bg-red-700 text-white w-2/3 mt-4" onClick={() => router.push('/deletestock')}>เบิกสินค้า</button>
                        <button className="btn bg-red-500 hover:bg-red-700 text-white w-2/3 mt-4" onClick={() => router.push('/checkstock')}>เช็ค Stock</button>
                    </>
                ) : userData.role === 'import' ? (
                    <>
                        <button className="btn bg-blue-500 hover:bg-blue-700 text-white w-2/3 mt-4" onClick={() => router.push('/addstock')}>เพิ่มสินค้า</button>
                        <button className="btn bg-blue-500 hover:bg-blue-700 text-white w-2/3 mt-4" onClick={() => router.push('/checkstock')}>เช็ค Stock</button>
                    </>
                ) : (
                    <>
                        <button className="btn bg-green-500 hover:bg-green-700 text-white w-2/3 mt-4" onClick={() => router.push('/deletestock')}>เบิกสินค้า</button>
                        <button className="btn bg-green-500 hover:bg-green-700 text-white w-2/3 mt-4" onClick={() => router.push('/checkstock')}>เช็ค Stock</button>
                    </>
                )}

                {/* ปุ่มออกจากระบบ */}
                <button className="btn bg-gray-700 hover:bg-gray-800 text-white w-2/3 mt-8" onClick={logout}>ออกจากระบบ</button>
            </div>
        </div>
    );
}
