import React, { useEffect, useState } from "react";

const TestPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/mock/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.text();
      })
      .then((text) => {
        console.log("Raw response:", text); // 查看是否是 HTML
        try {
          const json = JSON.parse(text);
          console.log("Parsed JSON:", json);
        } catch (e) {
          console.error("Response is not JSON:", e);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default TestPage;
