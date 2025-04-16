
from flask import Flask
from flask_cors import CORS
import json
from inference import getPredictions

app = Flask(__name__)
CORS(app)

# Endpoint to get predictions of all the models when passed text as an input
# Returns: JSON object consisting of pairs in the format:
#   model name: prediction
@app.route('/models/prediction/<text>', methods=['GET'])
def returnModelPredictions(text):
    return json.dumps(getPredictions(text))

if __name__ == "__main__":
    app.run()