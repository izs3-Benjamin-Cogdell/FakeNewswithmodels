import React, { useState } from "react";
import "./ArticleCheck.css";

const ArticleCheck = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState(null);
  const url = "http://localhost:5000/models/prediction/"

  // Sample model performance metrics
  const modelPerformance = {
    GossipCop: {
      accuracy: "87.08%",
      precision: "78.68%",
      recall: "63.64%",
      f1Score: "70.36%"
    },
    PolitiFact: {
      accuracy: "85.85%",
      precision: "80.36%",
      recall: "95.91%",
      f1Score: "40.26%"
    },
    Liar:{
      accuracy:  "67.76%",
      precision: "72.35%",
      recall:    "53.08%",
      f1Score:  "61.24%"
    },
    GossipCop_PolitiFact: {
      accuracy: "84.25%",
      precision: "69.99%",
      recall: "63.59%",
      f1Score: "66.64%"
    },
    AllThreeCombined:{
      accuracy:  "87.11%",
      precision: "87.61%",
      recall:    "58.80%",
      f1Score:  "70.37%"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = document.getElementById("inputText").value;
    try {
      const response = await fetch(url + text);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      setResults({
        GossipCop: json["gossipcop"].toLowerCase(),
        PolitiFact: json["politifact"].toLowerCase(),
        GossipCop_PolitiFact: json["GossipCop_PolitiFact"].toLowerCase(),
        Liar: json["Liar"].toLowerCase(),
        AllThreeCombined: json["AllThreeCombined"].toLowerCase()
      });

    } catch (error) {
      console.error("Error fetching predictions:", error);
      // For demo purposes, we can set mock results
      setResults({
        GossipCop: Math.random() > 0.5 ? "real" : "fake",
        PolitiFact: Math.random() > 0.5 ? "real" : "fake",
        Combined: Math.random() > 0.5 ? "real" : "fake"
      });
    }
  };

  return (
    <div className="container">
      <div className="content">
        {/* Left side - Input form */}
        <div className="input-section">
          <div className="card">
            <h1 className="title">Fake News Detector</h1>
            
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label className="label">Article Title</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter article title"
                  id="inputText"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="button">
                Check Article
              </button>
            </form>

            {results && (
              <div className="results-summary">
                <h2 className="subtitle">Results Summary</h2>
                <div className="results-grid">
                  {Object.entries(results).map(([model, prediction]) => (
                    <div 
                      key={model} 
                      className={`result-item ${prediction === "real" ? "real" : "fake"}`}
                    >
                      <span className="model-name">{model}:</span> 
                      <span className="prediction">{prediction.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Model performance */}
        <div className="performance-section">
          <div className="card">
            <h2 className="subtitle">Model Performance</h2>
            
            <div className="performance-metrics">
              {Object.entries(modelPerformance).map(([model, metrics]) => (
                <div key={model} className="model-performance">
                  <h3 className="model-title">{model}</h3>
                  <table className="metrics-table">
                    <tbody>
                      <tr>
                        <td>Accuracy:</td>
                        <td>{metrics.accuracy}</td>
                      </tr>
                      <tr>
                        <td>Precision:</td>
                        <td>{metrics.precision}</td>
                      </tr>
                      <tr>
                        <td>Recall:</td>
                        <td>{metrics.recall}</td>
                      </tr>
                      <tr>
                        <td>F1 Score:</td>
                        <td>{metrics.f1Score}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCheck;
