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
          <div style={{
               fontFamily: "monospace",
               backgroundColor: "#0e0e0e",
               color: "#00ff00",
               padding: "20px",
               height: "100vh",
               overflowY: "auto",
               lineHeight: "1.6",
               fontSize: "14px",
          }}>
               <div style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    borderBottom: "1px solid #00ff00",
                    paddingBottom: "10px"
               }}>
                    Logs Page - wait for a minute everytime to see the live logs of your links <span style={{
                         animation: "blink 1s step-end infinite"
                    }}>|</span>
               </div>

               <pre>
                    {logs.map((log, i) => (
                         <div key={i}>{'>>'} {log}</div>
                    ))}
               </pre>

               <style>
                    {`
          @keyframes blink {
            from, to { opacity: 0 }
            50% { opacity: 1 }
          }
        `}
               </style>
          </div>
     );
};

export default Logs;
