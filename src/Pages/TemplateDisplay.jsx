import React, { useState, useEffect } from 'react';
import { FaSearch, FaExternalLinkAlt, FaSyncAlt } from 'react-icons/fa';
// Optional for custom styles
import axiosInstance from '../context/axiosInstance';
const TemplateDisplay = () => {
  const [templates, setTemplates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch templates from API
useEffect(() => {
  const fetchTemplates = async () => {
    try {
      const { data } = await axiosInstance.get("/templates/");
      setTemplates(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  fetchTemplates();
}, []);

  // Search filtering
  useEffect(() => {
    if (searchTerm === '') setFiltered(templates);
    else {
      const filteredData = templates.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(filteredData);
    }
  }, [searchTerm, templates]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePreview = (url) => window.open(url, '_blank');



if (loading) return (
  <div className="flex flex-col justify-center items-center h-screen bg-gray-900 overflow-hidden">
    
    {/* Loader container */}
    <div className="relative w-64 h-64 flex items-center justify-center">
      
      {/* Rotating gears */}
      <div className="absolute w-24 h-24 border-4 border-gray-600 rounded-full animate-spin-slow flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-500 rounded-full animate-spin-medium"></div>
        <div className="w-8 h-8 border-4 border-gray-400 rounded-full animate-spin-fast"></div>
      </div>

      {/* Pulsing light in the center */}
      <div className="absolute w-12 h-12 bg-blue-500 rounded-full animate-pulse opacity-80"></div>

      {/* Bouncing balls */}
      <div className="absolute bottom-0 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce-medium"></div>
      <div className="absolute bottom-0 left-3/4 w-4 h-4 bg-green-500 rounded-full animate-bounce-fast"></div>
    </div>

    {/* Loader text */}
    <p className="mt-16 text-xl text-white font-semibold animate-text-glow">
      Loading Resources...
    </p>
  </div>
);

  if (error)
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error loading templates: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
        >
          Retry <FaSyncAlt className="inline ml-2" />
        </button>
      </div>
    );

  return (
    <div className="px-4 md:px-8 py-12 pt-32 lg:pl-64">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold flex items-center gap-3 text-white">
          Template Gallery
          <span className="bg-cyan-500/20 text-cyan-400 text-sm px-2 py-1 rounded-full">
            {filtered.length}
          </span>
        </h2>

        {/* Search + Actions */}
        <div className="flex gap-3 flex-col sm:flex-row items-start sm:items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or category..."
              className="pl-10 pr-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition flex items-center gap-2"
          >
            <FaSyncAlt /> Refresh
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-2 text-lg">No templates found</p>
          <p className="text-sm">Try adjusting your search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((template) => (
            <div
              key={template.id}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-shadow shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
            >
              {/* Image */}
              <div className="relative group">
                <img
                  src={template.template_file}
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-2xl transition-transform group-hover:scale-105"
                  onError={(e) =>
                    (e.target.src =
                      'https://placehold.co/400x250/1e1e1e/6a5af9?text=No+Image')
                  }
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <button
                    onClick={() => handlePreview(template.url)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg shadow-lg transition"
                  >
                    <FaExternalLinkAlt /> Live Preview
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>
                <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                  <span className="bg-cyan-900/30 px-2 py-1 rounded-full">{template.category}</span>
                  <span>{formatDate(template.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateDisplay;
