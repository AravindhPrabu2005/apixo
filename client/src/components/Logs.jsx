import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:5000", {
      query: { userId }
    });

    socket.on("log", (message) => {
      setLogs(prev => [...prev, message]);
    });

    socket.on("connect", () => console.log("Socket connected"));
    socket.on("disconnect", () => console.log("Socket disconnected"));

    return () => socket.disconnect();
  }, [userId]);

  return (
    <div style={{ fontFamily: "monospace", background: "#000", color: "#0f0", padding: "10px", height: "90vh", overflowY: "auto" }}>
      <p>Logs Page - wait for every minute to see the live logs of your links</p>
      <pre>
        {logs.map((log, i) => <div key={i}>{log}</div>)}
      </pre>
    </div>
  );
};

export default Logs;
