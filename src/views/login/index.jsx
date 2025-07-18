import React, { useEffect, useState } from "react";

const TestPage = () => {
  const [users, setUsers] = useState([{ id: 1.0, name: "Join User" }]);
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
          setUsers([json]); // 假设返回的是一个用户数组
          console.log("Parsed JSON:", json);
        } catch (e) {
          console.error("Response is not JSON:", e);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [users.id]);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default TestPage;
