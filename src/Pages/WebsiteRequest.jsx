import React, { useState, useEffect } from "react";
import { X } from "lucide-react";



let apiUrl = import.meta.env.VITE_API_END_POINT;

export default function WebsiteRequestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [websiteName, setWebsiteName] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [templateFile, setTemplateFile] = useState(null);
  const [features, setFeatures] = useState({
    ecommerce: false,
    blog: false,
    cms: false,
    seo: false,
    aiIntegration: false,
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const res = await fetch(`${apiUrl}/requests/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  }

  async function handleSubmit() {
    if (!websiteName || !description) return;
    
    try {
      const formData = new FormData();
      formData.append("website_name", websiteName);
      formData.append("description", description);
      formData.append("timeline", timeline);
      formData.append("features", JSON.stringify(features));
      if (templateFile) formData.append("template_file", templateFile);

      const res = await fetch(`${apiUrl}/request/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      await fetchRequests();
      setIsOpen(false);
      setWebsiteName("");
      setDescription("");
      setTimeline("");
      setTemplateFile(null);
      setFeatures({ ecommerce: false, blog: false, cms: false, seo: false, aiIntegration: false });
    } catch (err) {
      console.error("Failed to create request", err);
    }
  }

  function handleClearFile() {
    setTemplateFile(null);
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Website Requests</h1>

      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        + New Request
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-8 rounded-xl w-full max-w-xl shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6">Create New Website</h2>
            
            <div>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Website Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter website name"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 placeholder-gray-400"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe your website requirements"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 placeholder-gray-400 h-32 resize-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Timeline (optional)
                </label>
                <input
                  type="text"
                  placeholder="When do you need it completed?"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 placeholder-gray-400"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Template File (optional)
                </label>
                <div className="flex gap-2">
                  <label className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-600 text-gray-400">
                    <input
                      type="file"
                      onChange={(e) => setTemplateFile(e.target.files[0])}
                      className="hidden"
                    />
                    {templateFile ? templateFile.name : "Choose file"}
                  </label>
                  {templateFile && (
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="px-6 py-3 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Features (optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(features).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setFeatures({ ...features, [key]: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-emerald-500 rounded-lg hover:bg-emerald-600 font-medium"
                >
                  Create Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4">
        {requests.length === 0 ? (
          <p className="text-gray-400">No requests yet.</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="bg-slate-800 p-5 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold mb-2">{req.website_name}</h3>
              <p className="text-sm text-gray-400 mb-3">{req.description}</p>
              {req.timeline && (
                <p className="text-sm text-gray-300 mb-2">Timeline: {req.timeline}</p>
              )}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  req.status === "Pending" ? "bg-yellow-600" :
                  req.status === "In Progress" ? "bg-blue-600" :
                  req.status === "Completed" ? "bg-green-600" : "bg-red-600"
                }`}>
                  {req.status}
                </span>
                {req.template_file && (
                  <a
                    href={req.template_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline text-sm"
                  >
                    Download Template
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}