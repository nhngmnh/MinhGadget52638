import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {assets} from "../assets/assets.js"

const MyProfile = () => {
  const { userData, setUserData, backendurl, token, getUserData } =
    useContext(AppContext);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendurl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center" 
      style={{ backgroundImage: `url(${assets.mdcn})` }}>


        <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 transition transform hover:scale-105 duration-200">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            {isEdit ? (
              <label htmlFor="image" className="relative cursor-pointer">
                <img
                  className="w-36 h-36 rounded-full border-4 border-gray-400 object-cover hover:border-blue-500 transition"
                  src={
                    image ? URL.createObjectURL(image) : userData.image
                  }
                  alt="Profile"
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-36 h-36 rounded-full border-4 border-gray-300 object-cover"
                src={userData.image}
                alt="Profile"
              />
            )}
          </div>

          {/* Personal Information */}
          <div className="text-center mb-4">
            {isEdit ? (
              <input
                className="bg-gray-50 text-xl font-semibold w-full text-center border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData.name}
              </h2>
            )}
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Contact Information */}
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              <span className="font-medium">📧 Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-medium">📞 Phone:</span>{" "}
              {isEdit ? (
                <input
                  className="bg-gray-50 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              ) : (
                userData.phone
              )}
            </p>
            <p>
              <span className="font-medium">📍 Address:</span>{" "}
              {isEdit ? (
                <input
                  className="bg-gray-50 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              ) : (
                userData.address
              )}
            </p>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Basic Information */}
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              <span className="font-medium">⚧ Gender:</span>{" "}
              {isEdit ? (
                <select
                  className="bg-gray-50 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                userData.gender
              )}
            </p>

            <p>
              <span className="font-medium">🎂 Birthday:</span>{" "}
              {isEdit ? (
                <input
                  className="bg-gray-50 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                userData.dob
              )}
            </p>
          </div>

          {/* Edit and Save Button */}
          <div className="mt-6 text-center">
            {isEdit ? (
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                onClick={updateProfileData}
              >
                💾 Save
              </button>
            ) : (
              <button
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200 shadow-md"
                onClick={() => setIsEdit(true)}
              >
                ✏️ Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
