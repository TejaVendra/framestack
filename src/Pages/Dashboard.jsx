import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import Navigation from "../Components/Navigation";
import { FaPlus, FaSync, FaSearch, FaInfoCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
// Removed unused import 'axios'
import axiosInstance from "../context/axiosInstance";

const Dashboard = () => {
  // Use of useContext is fine here
  const { authTokens } = useContext(AuthContext);
  const userName = authTokens?.user?.name || "User";

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templatePreview, setTemplatePreview] = useState(null);
  const [temps,setTemps] = useState(0);
  const [formData, setFormData] = useState({
    website_name: "",
    description: "",
    template_file: null,
    timeline: "",
    features: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Fetch projects with useCallback
  const fetchProjects = useCallback(async () => {
    if (!authTokens?.access) return;

    try {
      setLoadingProjects(true);
      setFormError("");
      const response = await axiosInstance.get("requests/list", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      setProjects(response.data);

    } catch (err) {
      
      const errorMsg = err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to load projects";
      setFormError(errorMsg);
    } finally {

      setLoadingProjects(false);
    }
  }, [authTokens?.access]); // Correct dependency: authTokens.access

  // Fetch templates with useCallback
  const fetchTemplates = useCallback(async () => {
    try {
      setLoadingTemplates(true);
      setFormError("");
      const response = await axiosInstance.get("templates/");
      // Only show the first 4 templates on the dashboard
      setTemps(response.data.length)
     
      setTemplates(response.data.slice(0, 4));
    } catch (err) {
      console.error("Failed to fetch templates:", err);
      const errorMsg = err.response?.data?.detail ||
        err.response?.data?.error ||

        "Failed to load templates";
      setFormError(errorMsg);
    } finally {
      setLoadingTemplates(false);
    }
  }, []); // Correct dependency: Empty array for one-time fetch

  // Initial data fetching
  useEffect(() => {
    fetchProjects();
    fetchTemplates();
  }, [fetchProjects, fetchTemplates]); // Correct dependencies: include both fetch functions

  const handleCreateNew = () => {
    setIsFormOpen(true);
    setFormData({
      website_name: "",
      description: "",
      timeline: "",
      template_file: null,
      features: "",

    });
    setErrors({});
    setFormError("");
    setSelectedTemplate(null); // Clear selected template on new form open
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "template_file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImagePreview = (imageUrl) => {
    if (imageUrl) {
      setPreviewImage(imageUrl);
    } else {
      // Handle case where there's no image URL
      setPreviewImage(null);
    }
  };

  // Filter templates using useMemo
  const filteredTemplates = useMemo(() => {
    if (!templateSearch) return templates;

    return templates.filter(template =>
      template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
      template.category.toLowerCase().includes(templateSearch.toLowerCase())
    );
  }, [templates, templateSearch]);

  // Update the handleTemplatePreview function
  const handleTemplatePreview = (imageUrl) => {
    if (imageUrl) {
      setTemplatePreview(imageUrl);
    } else {
      setTemplatePreview(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.website_name.trim()) newErrors.website_name = "Website name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      setFormError("");
      const data = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key]);
      });

      await axiosInstance.post("requests/create/", data, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "multipart/form-data"
        },
      });
      
      // Close modal and refresh projects
      setIsFormOpen(false);
      fetchProjects();
    } catch (err) {
      
     console.log(err)
      const errorMsg = err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to create project";
      setFormError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.website_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Get first 3 projects for display
  const displayProjects = filteredProjects.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navigation />

      <main className="pt-16 lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>

                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome, {userName} 👋
                </h1>
                <p className="text-gray-400 mt-2">Build amazing websites without any coding skills</p>
              </div>

              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleCreateNew}
                  className="relative inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
                >

                  <FaPlus className="mr-2" />
                  <span>Create New Website</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-gray-400 text-sm">Total Projects</h3>
              <p className="text-3xl font-bold mt-2">{projects.length}</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl
p-6 border border-gray-700 shadow-lg">
              <h3 className="text-gray-400 text-sm">Active Projects</h3>
              <p className="text-3xl font-bold mt-2">
                {projects.filter(p => (p.status !== "Completed" && p.status !== "Rejected")).length}
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6
border border-gray-700 shadow-lg">
              <h3 className="text-gray-400 text-sm">Templates Available</h3>
              <p className="text-3xl font-bold mt-2">{temps}</p>
            </div>
          </div>

          {/* New Website Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0
bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl w-full max-w-lg shadow-2xl animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Create New Website</h2>
                  <button

                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>

                </div>

                {formError && (
                  <div className="mb-4 p-3 bg-red-900/30 text-red-400 rounded-lg flex items-center">
                    <FaInfoCircle className="mr-2" />

                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>

                    <label className="block text-sm mb-2">Website Name *</label>
                    <input
                      type="text"
                      name="website_name"

                      placeholder="Enter website name"
                      value={formData.website_name}
                      onChange={handleFormChange}
                      className={`w-full p-3 rounded-lg bg-gray-700/50 border ${

                        errors.website_name ? "border-red-500" : "border-gray-600"
                        } focus:border-cyan-500 outline-none transition-colors`}
                    />
                    {errors.website_name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">

                        <FaInfoCircle className="mr-1" /> {errors.website_name}
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="block text-sm mb-2">Description *</label>
                    <textarea
                      name="description"

                      placeholder="Describe your website requirements"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows="4"

                      className={`w-full p-3 rounded-lg bg-gray-700/50 border ${
                        errors.description ?
                        "border-red-500" : "border-gray-600"
                        } focus:border-cyan-500 outline-none transition-colors`}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">

                        <FaInfoCircle className="mr-1" /> {errors.description}
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="block text-sm mb-2">Timeline (optional)</label>
                    <input
                      type="text"

                      name="timeline"
                      placeholder="When do you need it completed?"
                      value={formData.timeline}
                      onChange={handleFormChange}
                      className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-cyan-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Features (optional)</label>
                    <input
                      type="text"
                      name="features"

                      placeholder="what features do you want ? eg. payment system , dashboard , single page"
                      value={formData.features}
                      onChange={handleFormChange}
                      className="w-full p-3 rounded-lg
bg-gray-700/50 border border-gray-600 focus:border-cyan-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-2">Template File (optional)</label>
                    <div className="flex items-center">
                      <input
                        type="file"
                        name="template_file"

                        onChange={handleFormChange}
                        className="hidden"
                        id="template-upload"
                        accept="image/*,.zip,.pdf" // Added accept attribute for user experience
                      />

                      <label
                        htmlFor="template-upload"
                        className="flex-1 p-3 rounded-lg bg-gray-700/50 border border-gray-600 cursor-pointer hover:border-cyan-500 transition-colors"
                      >

                        {formData.template_file ?
                          formData.template_file.name : "Choose file"}
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, template_file:
                          null })}
                        className="ml-2 px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Clear
                      </button>

                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button

                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-5 py-2.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      disabled={submitting}

                    >
                      Cancel
                    </button>
                    <button
                      type="submit"

                      disabled={submitting}
                      className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all flex items-center disabled:opacity-50"
                    >
                      {submitting && (

                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      )}
                      {submitting ?
                        "Creating..." : "Create Website"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* My Projects Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-semibold flex items-center">
                My Projects
                <span className="ml-2 bg-cyan-500/10 text-cyan-400 text-xs px-2 py-1 rounded-full">

                  {projects.length}
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">

                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}

                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-500 outline-none w-full sm:w-64 transition-colors"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>


                <div className="flex gap-2">
                  <button
                    onClick={fetchProjects}
                    disabled={loadingProjects}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors
flex items-center disabled:opacity-50"
                  >
                    <FaSync className={`mr-2 ${loadingProjects ?
                      'animate-spin' : ''}`} />
                    Refresh
                  </button>
                  <a
                    href="/website-requests"

                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                  >
                    View All Projects
                  </a>
                </div>
              </div>

            </div>

            {loadingProjects ?
              (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg animate-pulse">
                      <div className="bg-gray-700 h-40 w-full"></div>

                      <div className="p-5 space-y-3">
                        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                        <div className="h-6 bg-gray-700 rounded w-24"></div>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {displayProjects.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-md mx-auto">
                        <div className="text-5xl mb-4">📭</div>

                        <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                        <p className="text-gray-400 mb-4">
                          {searchTerm
                            ?
                            "No projects match your search"
                            : "You haven't created any websites yet"}
                        </p>
                        <button

                          onClick={handleCreateNew}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
                        >
                          Create Your First Website

                        </button>
                      </div>
                    </div>
                  ) : (
                    displayProjects.map((project) => (

                      <div
                        key={project.id}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
                      >

                        {project.template_file ? (
                          <img
                            src={project.template_file}
                            alt={project.website_name}

                            className="w-full h-40 object-cover"
                            onError={(e) => {
                              e.target.onError = null;
                              e.target.parentElement.innerHTML = '<div class="bg-gray-700 border-2 border-dashed rounded-xl w-full h-40 flex items-center justify-center"><span class="text-gray-500">Preview unavailable</span></div>';
                            }}
                          />
                        ) : (
                          <div className="bg-gray-700 border-2 border-dashed rounded-xl w-full h-40 flex items-center justify-center">

                            <span className="text-gray-500">No preview</span>
                          </div>
                        )}
                        <div className="p-5">

                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg mb-2">{project.website_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === "Completed"

                                ?
                                "bg-green-900/30 text-green-400"
                                : project.status === "Pending"
                                ?
                                "bg-yellow-900/30 text-yellow-400"
                                : "bg-blue-900/30 text-blue-400"
                              }`}>
                              {project.status}

                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {project.description}

                          </p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Last edited: {new Date(project.updated_at).toLocaleString()}</span>
                            <a

                              href={`/project/${project.id}`}
                              className="text-cyan-400 hover:text-cyan-300 transition-colors"
                            >

                              View Details →
                            </a>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>
              )}
          </section>


          {/* Templates Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-semibold flex items-center">
                Starter Templates
                <span className="ml-2 bg-cyan-500/10 text-cyan-400 text-xs px-2 py-1 rounded-full">

                  {temps}
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="text"

                    placeholder="Search templates..."
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-500 outline-none w-full sm:w-64 transition-colors"
                  />

                  <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={fetchTemplates}
                    disabled={loadingTemplates}

                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center disabled:opacity-50"
                  >
                    <FaSync className={`mr-2 ${loadingTemplates ?
                      'animate-spin' : ''}`} />
                    Refresh
                  </button>
                  <a
                    href="/templates"
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center"

                  >
                    Browse All Templates
                  </a>
                </div>
              </div>
            </div>

            {loadingTemplates ?
              (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg animate-pulse"

                    >
                      <div className="bg-gray-700 h-44 w-full"></div>
                      <div className="p-5 space-y-3">
                        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded
w-1/2"></div>
                        <div className="h-6 bg-gray-700 rounded w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredTemplates.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-md mx-auto">
                        <div className="text-5xl mb-4">📭</div>

                        <h3 className="text-xl font-semibold mb-2">No Templates Found</h3>
                        <p className="text-gray-400 mb-4">
                          {templateSearch
                            ?
                            "No templates match your search"
                            : "No templates have been added yet"}
                        </p>
                      </div>
                    </div>

                  ) : (
                    filteredTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"

                      >
                        {template.template_file ? (
                          <img
                            src={template.template_file}

                            alt={template.name}
                            className="w-full h-44 object-cover"
                            onError={(e) => {
                              e.target.onError = null;

                              e.target.parentElement.innerHTML =
                                '<div class="bg-gray-700 border-2 border-dashed rounded-xl w-full h-44 flex items-center justify-center"><span class="text-gray-500">Preview unavailable</span></div>';
                            }}
                          />
                        ) : (
                          <div className="bg-gray-700 border-2 border-dashed rounded-xl w-full h-44 flex items-center justify-center">
                            <span
                              className="text-gray-500">No preview</span>
                          </div>
                        )}

                        <div className="p-5">
                          <div className="flex justify-between items-start">

                            <h3 className="font-bold text-lg mb-2">{template.name}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/30 text-gray-400">
                              {template.category}
                            </span>

                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Created: {new Date(template.created_at).toLocaleDateString()}</span>
                            <button

                              onClick={() => window.open(template.url, "_blank")}
                              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                            >

                              Live Preview →
                            </button>
                          </div>
                        </div>
                      </div>

                    ))
                  )}
                </div>
              )}

            {/* Image Preview Modal */}
            {templatePreview && (
              <div
                className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex
items-center justify-center p-4 cursor-zoom-out"
                onClick={() => setTemplatePreview(null)}
              >
                <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                  <button
                    className="absolute top-6 right-6 text-white bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center transition-colors
z-10 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents modal closing when clicking the close button
                      setTemplatePreview(null);
                    }}
                  >
                    ✕
                  </button>
                  <div className="w-full h-full flex items-center justify-center">

                    <img
                      src={templatePreview}
                      alt="Template preview"
                      className="max-w-full max-h-full object-contain rounded-xl"
                      onClick={(e) => e.stopPropagation()}

                    />
                  </div>
                </div>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;