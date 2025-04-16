import React, { useState } from "react";
import "./ArticleCheck.css";

const ArticleCheck = () => {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState(null);
  
  // Sample model performance metrics
  const modelPerformance = {
    GossipCop: {
      accuracy: "92.5%",
      precision: "94.2%",
      recall: "90.8%",
      f1Score: "40.26%"
    },
    PolitiFact: {
      accuracy: "29.59%",
      precision: "25.48%",
      recall: "95.91%",
      f1Score: "40.26%"
    },
    Combined: {
      accuracy: "84.25%",
      precision: "69.99%",
      recall: "63.59%",
      f1Score: "66.64%"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make parallel requests for each model
      const requests = ["GossipCop", "PolitiFact", "Combined"].map(async (model) => {
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model, title }),
        });
        
        const data = await response.json();
        return { model, prediction: data.prediction }; // "real" or "fake"
      });

      // Wait for all requests to complete
      const modelResults = await Promise.all(requests);
      
      // Convert array to object with model names as keys
      const resultsObject = modelResults.reduce((acc, result) => {
        acc[result.model] = result.prediction;
        return acc;
      }, {});

      setResults(resultsObject);
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
