import React, { useState } from "react";
import "./ArticleCheck.css";

const ArticleCheck = () => {
  const [model, setModel] = useState("GossipCop");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Replace with real backend call
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, title }),
    });

    const data = await response.json();
    setResult(data.prediction); // "real" or "fake"
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Fake News Detector</h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="label">Select Model</label>
            <select
              className="select"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="GossipCop">GossipCop</option>
              <option value="PolitiFact">PolitiFact</option>
              <option value="Combined">Combined</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Article Title</label>
            <input
              type="text"
              className="input"
              placeholder="Enter article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button">
            Check Article
          </button>
        </form>

        {result && (
          <div className={`result ${result === "real" ? "real" : "fake"}`}>
            This article is likely: {result.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCheck;