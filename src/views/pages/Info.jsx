import React, { useState, useEffect } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 获取所有文章
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));

    // 添加新文章示例
    const newPost = {
      title: "新文章",
      author: "李四",
    };

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>文章列表</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} - {post.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
