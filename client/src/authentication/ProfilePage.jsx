'use client'

import React, { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { toast } from "react-hot-toast"  // Changed import
import axios from "axios"
import { Camera, Mail, Phone, MapPin, User, Calendar, Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const {
    userData,
    setUserData,
    loadUserProfileData,
    backendUrl,
    token,
  } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateUserProfileData = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("userId", userData?._id || '')
      formData.append("name", userData?.name || '')
      formData.append("phone", userData?.phone || '')
      formData.append('address', userData?.address || '')
      formData.append('gender', userData?.gender || '')
      formData.append('dob', userData?.dob || '')

      if (image) {
        formData.append('image', image)
      }

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (data.success) {
        toast.success(data.message)  // Changed toast method
        await loadUserProfileData()
        setImage(null)
        setIsEdit(false)
      } else {
        toast.error(data.error)  // Changed toast method
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Network error")  // Changed toast method
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  if (!userData) {
    return <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-600">Loading user data...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-red-50 to-gray-200 shadow-2xl rounded-xl transition-all duration-300 ease-in-out hover:shadow-3xl  lg:mt-5 ">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-12 space-y-6 md:space-y-0 md:space-x-12">
        <div className="relative group">
          <img
            src={image ? URL.createObjectURL(image) : userData?.image || "/placeholder.svg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 transition-all duration-300 ease-in-out group-hover:border-purple-200 shadow-lg"
          />
          {isEdit && (
            <label htmlFor="image-upload" className="absolute bottom-2 right-2 bg-blue-500 text-white p-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-600 shadow-md">
              <Camera className="h-6 w-6" />
              <input
                id="image-upload"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          {isEdit ? (
            <input
              type="text"
              value={userData.name || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className="text-4xl font-bold w-1/3 bg-gray-100 border border-gray-300 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
          ) : (
            <h2 className="text-4xl font-bold text-gray-500">{userData.name || 'No Name'}</h2>
          )}
          <p className="text-xl text-gray-600 mt-2">{userData.email || 'No Email'}</p>
        </div>
      </div>

      <div className="space-y-10">
        <div className="bg-gray-50 p-8 rounded-2xl shadow-inner hover:shadow-md transition-shadow duration-300">
          <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-700">
            <User className="mr-3 text-blue-500" /> Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline mr-2 text-blue-500" /> Email
              </label>
              <p className=" text-gray-600 text-md bg-white p-3 rounded-lg shadow-sm">{userData.email || 'No Email'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline mr-2 text-blue-500" /> Phone
              </label>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone || ''}
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                />
              ) : (
                <p className="text-gray-600 text-md bg-white p-3 rounded-lg shadow-sm">{userData.phone || 'No Phone'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow-inner hover:shadow-md transition-shadow duration-300">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline mr-2 text-blue-500" /> Address
          </label>
          {isEdit ? (
            <textarea
              value={userData.address || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
          ) : (
            <p className="text-gray-600 font-medium bg-white p-3 rounded-lg shadow-sm">{userData.address || 'No Address'}</p>
          )}
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow-inner hover:shadow-md transition-shadow duration-300">
          <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <User className="mr-3 text-blue-500" /> Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              {isEdit ? (
                <select
                  value={userData.gender || ''}
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-lg text-gray-900 bg-white p-3 rounded-lg shadow-sm">{userData.gender || 'Not Specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline mr-2 text-blue-500" /> Date of Birth
              </label>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob || ''}
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                />
              ) : (
                <p className="text-lg text-gray-900 bg-white p-3 rounded-lg shadow-sm">{userData.dob || 'No Date of Birth'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="py-2 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>
          {isEdit && (
            <button
              className="py-2 px-6 bg-green-500 text-white rounded-xl hover:bg-green-600"
              onClick={updateUserProfileData}
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Save Information"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
