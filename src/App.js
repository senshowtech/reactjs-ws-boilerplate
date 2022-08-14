import React, { useState, useEffect } from "react";

const URL = "ws://127.0.0.1:8000";

const Chat = () => {
  const [ws, setWs] = useState(new WebSocket(URL));

  const submitMessage = (e) => {
    e.preventDefault();
    ws.send(JSON.stringify({ cek: "cek" }));
  };

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (e) => {
      console.log(JSON.parse(e.data).cek);
    };

    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket(URL));
      };
    };
  }, [ws.onmessage, ws.onopen, ws.onclose]);

  return (
    <div>
      <form onSubmit={submitMessage}>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Chat;
