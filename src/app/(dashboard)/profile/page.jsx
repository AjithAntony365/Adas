"use client";
import React, { useEffect, useState } from 'react';
// import Placeholderimage from "../../../../public/1.jpg"
import Placeholderimage from "../../../../public/user_avatar.png";
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { showErrorNotification } from '@/lib/NotificationUtil';
import axios from 'axios';
import { Card } from '@tremor/react';
// '../../public/user_avatar.png';
const UserProfile = ({ selectedImage }) => {
    const [profile, setProfile] = useState({})
    const { data: session } = useSession();
    console.log('data', session?.user);
    console.log("test");
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // const response = await axiosInstance.get('/register_driver_data');
            const response = await axios.get(`/api/user/${session?.user?.name}`);
            console.log('response', response);
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            showErrorNotification('Error fetching profile data')
        }
    };
    return (
        <main className="p-2 w-full ">
            <Card className='max-w-4xl mx-auto'>
                <h1 className="text-3xl font-bold mb-4">User Profile</h1>
                <Image
                    src={profile.image ? profile.Image : Placeholderimage}
                    alt="Empty"
                    width={500}
                    height={500}
                    className="w-40 h-40 rounded-full mx-auto"
                />
                <h1 className="text-3xl font-bold mb-4 text-center">{profile ? profile.username : "loading..."}</h1>
                {/* {session} */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <p className="text-gray-700">{profile ? profile.ownerName : "loading..."}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <p className="text-gray-700">{profile ? profile.email : "loading..."}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Company Name
                            </label>
                            <p className="text-gray-700">{profile ? profile.companyName : "loading..."}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <p className="text-gray-700">{profile ? profile.phoneNumber : "loading..."}</p>
                        </div>
                        {/* Add more user information fields here */}
                    </div>
                </div>
            </Card>
        </main>

    );
};

export default UserProfile;
