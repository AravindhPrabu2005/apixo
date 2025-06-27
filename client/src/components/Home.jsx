import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function Home() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await axiosInstance.get(`/link/${userId}`);
      setLinks(res.data);
    };
    fetchLinks();
  }, [userId]);

  function handleLogs(){
    navigate("/logs")
  }
  const handleAdd = async () => {
    if (!url.trim()) return;
    await axiosInstance.post("/link", { userId, url });
    setUrl("");
    const res = await axiosInstance.get(`/link/${userId}`);
    setLinks(res.data);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/link/${id}`);
    const res = await axiosInstance.get(`/link/${userId}`);
    setLinks(res.data);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0e1628] text-white">
      <div className="flex justify-between items-center px-8 py-4 shadow-md bg-[#0c1220]">
        <h1 className="text-2xl font-bold">DASHBOARD</h1>
        <div className="flex gap-4">
          <button
            onClick={handleLogs}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            LIVE LOGS
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            ADD MONITOR
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-8">
        <div className="flex-1 bg-[#1a2238] p-6 rounded-xl">
          <div className="flex gap-2 mb-6">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter backend URL to monitor"
              className="flex-grow px-4 py-2 rounded-md text-black"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Monitor
            </button>
          </div>

          <ul className="space-y-4">
            {links.map((link) => (
              <li
                key={link._id}
                className="bg-[#10182e] px-4 py-3 rounded-md flex justify-between items-center text-sm"
              >
                <div className="flex gap-2 items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-green-400 font-semibold">HTTP</span>
                  <span className="text-white">{link.url}</span>
                </div>
                <button
                  onClick={() => handleDelete(link._id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-1/3 bg-[#1a2238] p-6 rounded-xl flex-shrink-0 h-fit">
          <h2 className="text-xl font-semibold mb-4">Current Status.</h2>
          <div className="bg-[#10182e] p-4 rounded-md text-center">
            <div className="text-green-500 text-4xl mb-2">⬆</div>
            <div className="text-lg">{links.length} </div>
            <div className="text-sm text-gray-400 mt-1">Using {links.length} of 50 monitors</div>
          </div>
        </div>
      </div>
    </div>
  );
}