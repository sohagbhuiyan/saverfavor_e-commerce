// src/components/admin/AdminNavbar.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../store/authSlice";
import { UserDropdown } from "../user/navbar/UserDropdown"; // Make sure the path is correct

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchProfile());
    }
  }, [token, profile, dispatch]);

  return (
    <div className="bg-gray-900 p-1 flex justify-between px-10 items-center">
      <h1 className="text-xl text-white font-bold">Techno Shop</h1>
      <div className="items-center relative mr-32">
        <UserDropdown position="desktop" />
      </div>
    </div>
  );
};

export default AdminNavbar;
