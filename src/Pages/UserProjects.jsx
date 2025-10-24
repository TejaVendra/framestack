import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../context/axiosInstance";
import '../styles/LoaderAnime.css'

const UserProjects = () => {
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`requests/list`, {
        headers: {
          Authorization: `Bearer ${authTokens?.access || ""}`,
        },
      });
      setProjects(response.data);
     
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Failed to load projects. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authTokens?.access) fetchProjects();
    else setError("You must be logged in to view projects.");
  }, [authTokens]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-600/20 text-green-500 border-green-600/40";
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "In Progress": return "bg-blue-600/20 text-blue-500 border-blue-600/40";
      default: return "bg-gray-600/20 text-gray-400 border-gray-600/40";
    }
  };






if (loading) return (
  <div className="flex flex-col justify-center items-center h-screen bg-black">
    <div className="relative">
      {/* Main loading circle */}
      <div className="w-20 h-20 border-4 border-gray-800 rounded-full animate-spin border-t-cyan-400"></div>
      
      {/* Inner pulsing dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
    </div>
    
    {/* Loading text */}
    <div className="mt-6 text-center">
      <p className="text-lg font-medium text-cyan-400">Loading content</p>
      <p className="text-sm text-gray-400 mt-1">Please wait...</p>
      
      {/* Progress bar */}
      <div className="mt-4 w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-cyan-400 rounded-full animate-progress"></div>
      </div>
    </div>
  </div>
);


  return (
    <section className="mb-12 pt-30">
      {error && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {error}
        </div>
      )}

      
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9 lg:pl-[100px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Projects
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
          >
            <FaPlus /> New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-gray-800/30 border border-dashed border-gray-700 rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <p className="text-gray-400 mb-3">No projects found.</p>
            <button
              onClick={() => navigate('/create-project')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-500"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 cursor-pointer group"
              >
                {project.template_file ? (
                  <img
                    src={project.template_file}
                    alt={project.website_name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-t-xl w-full h-40 flex items-center justify-center">
                    <span className="text-gray-500">{ project.template_file || "No preview"}</span>
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 text-white group-hover:text-cyan-400 transition">
                    {project.website_name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Created: {new Date(project.created_at).toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    last updated: {new Date(project.updated_at).toLocaleString()}
                  </p>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProjects;
