import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axiosInstance from "../context/axiosInstance";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);


  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const showAlert = (message, type = "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  // Fetch project details
  const fetchProject = async () => {
    try {
      const response = await axiosInstance.get(`requests/list/${id}/`, {
        headers: { Authorization: `Bearer ${authTokens?.access}` },
      });
      setProject(response.data);
      setFormData({
        website_name: response.data.website_name || "",
        description: response.data.description || "",
        timeline: response.data.timeline || "",
        features: response.data.features || "",
      });
    } catch (error) {
      showAlert("Failed to load project details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authTokens?.access) fetchProject();
  }, [id, authTokens]);

  // Handle field change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle features (key-value pairs)
  const handleFeatureChange = (key, value) => {
    setFormData({
      ...formData,
      features: { ...formData.features, [key]: value },
    });
  };

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.patch(
        `requests/list/${id}/update/`,
        formData,
        {
          headers: { Authorization: `Bearer ${authTokens?.access}` },
        }
      );
      showAlert("Project updated successfully!", "success");
      setProject(response.data.data);
      setEditing(false);
    } catch (error) {
      showAlert(
        error.response?.data?.error ||
          "You don’t have permission to edit these fields."
      );
    } finally {
      setSaving(false);
    }
  };

  

if (loading)
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 z-50">
      <div className="relative mb-8">
        <div className="w-12 h-12 border-4 border-gray-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-cyan-400 border-r-transparent border-b-transparent rounded-full animate-spin"></div>
      </div>
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );

if (!project)
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
      <div className="mb-6 animate-pulse">
        <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-gray-300 text-xl font-mono mb-2">PROJECT NOT FOUND</p>
      <p className="text-gray-500 text-sm font-mono">ERROR CODE: 404</p>
    </div>
  );
  return (
    <section className="min-h-screen pt-24 px-4 sm:px-8">
      {/* Alerts */}
      {alert.message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${
            alert.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white`}
        >
          {alert.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-8 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-cyan-400 transition mb-4"
        >
          ← Back to My Projects
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">
            {project.website_name}
          </h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-500 shadow-md"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 shadow-md disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  fetchProject();
                }}
                className="px-5 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 shadow-md"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Website Name */}
          <div>
            <label className="block text-gray-300 mb-2">Website Name</label>
            <input
              name="website_name"
              value={formData.website_name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white ${
                editing ? "focus:border-cyan-500" : "opacity-70 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              disabled={!editing}
              className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white ${
                editing ? "focus:border-cyan-500" : "opacity-70 cursor-not-allowed"
              }`}
            ></textarea>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-gray-300 mb-2">Timeline</label>
            <input
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white ${
                editing ? "focus:border-cyan-500" : "opacity-70 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-gray-300 mb-2">Features</label>
            <input
              name="features"
              value={formData.features}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white ${
                editing ? "focus:border-cyan-500" : "opacity-70 cursor-not-allowed"
              }`}
            />
          </div>


          {/* Read-only Fields */}
          <div className="border-t border-gray-700 pt-4 mt-4">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              Project Status & URLs
            </h3>

            <p>
              <span className="text-gray-400">Status:</span>{" "}
              <span className="text-white font-medium">{project.status}</span>
            </p>

            <p className="mt-2">
              <span className="text-gray-400">Sample URL:</span>{" "}
              {project.sample_url ? (
                <a
                  href={project.sample_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  {project.sample_url}
                </a>
              ) : (
                <span className="text-gray-500">{project.sample_url || "Not provided"}</span>
              )}
            </p>

            <p className="mt-2">
              <span className="text-gray-400">Original URL:</span>{" "}
              {project.original_url ? (
                <a
                  href={project.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  {project.original_url}
                </a>
              ) : (
                <span className="text-gray-500">{project.original_url || "Not provided"}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
