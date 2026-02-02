import React, { useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyProfile = () => {
  const { profile } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  // Edit profile 
  const [editName, setEditName] = useState(profile?.name || '');
  const [editEmail, setEditEmail] = useState(profile?.email || '');
  const [editPhone, setEditPhone] = useState(profile?.phone || '');
  const [editEducation, setEditEducation] = useState(profile?.education || '');
  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle Edit Profile submit
  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      
      await axios.put('http://localhost:4001/api/users/update-profile', {
        name: editName,
        email: editEmail,
        phone: editPhone,
        education: editEducation,
      }, { withCredentials: true });
      toast.success('Profile updated!');
      setShowEdit(false);
      //  refresh profile in context
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  //Change Password submit
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {

      await axios.post('http://localhost:4001/api/users/change-password', {
        currentPassword,
        newPassword,
      }, { withCredentials: true });
      toast.success('Password changed!');
      setShowChangePassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-lg text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-200 py-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full flex flex-col items-center border border-blue-100">
        <div className="relative mb-6">
          <img
            src={profile.photo?.url || 'https://via.placeholder.com/150'}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg object-cover"
          />
          <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h2>
        <p className="text-blue-500 font-semibold mb-2 capitalize">{profile.role}</p>
        <div className="w-full flex flex-col gap-3 mt-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600 w-28">Email:</span>
            <span className="text-gray-700 break-all">{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600 w-28">Phone:</span>
            <span className="text-gray-700">{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600 w-28">Education:</span>
            <span className="text-gray-700">{profile.education}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600 w-28">Joined:</span>
            <span className="text-gray-700">{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button onClick={() => setShowEdit(true)} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform duration-200">Edit Profile</button>
          <button onClick={() => setShowChangePassword(true)} className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform duration-200">Change Password</button>
        </div>

        {/* Edit Profile Modal */}
        {showEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
              <button onClick={() => setShowEdit(false)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl">&times;</button>
              <h3 className="text-xl font-bold mb-4 text-blue-600">Edit Profile</h3>
              <form className="flex flex-col gap-4" onSubmit={handleEditProfile}>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="border p-2 rounded" placeholder="Name" />
                <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} className="border p-2 rounded" placeholder="Email" />
                <input type="text" value={editPhone} onChange={e => setEditPhone(e.target.value)} className="border p-2 rounded" placeholder="Phone" />
                <input type="text" value={editEducation} onChange={e => setEditEducation(e.target.value)} className="border p-2 rounded" placeholder="Education" />
                <button type="submit" className="bg-blue-500 text-white rounded p-2 font-semibold hover:bg-blue-700">Save Changes</button>
              </form>
            </div>
          </div>
        )}

        {/* Change Password  */}
        {showChangePassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
              <button onClick={() => setShowChangePassword(false)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl">&times;</button>
              <h3 className="text-xl font-bold mb-4 text-red-500">Change Password</h3>
              <form className="flex flex-col gap-4" onSubmit={handleChangePassword}>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="border p-2 rounded" placeholder="Current Password" />
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="border p-2 rounded" placeholder="New Password" />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="border p-2 rounded" placeholder="Confirm New Password" />
                <button type="submit" className="bg-red-500 text-white rounded p-2 font-semibold hover:bg-red-700">Change Password</button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyProfile;
