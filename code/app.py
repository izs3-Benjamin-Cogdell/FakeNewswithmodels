
from flask import Flask
import json
from inference import getPredictions

app = Flask(__name__)

# Endpoint to get predictions of all the models when passed text as an input
# Returns: JSON object consisting of pairs in the format:
#   model name: prediction
@app.route('/models/prediction/<text>', methods=['GET'])
def returnModelPredictions(text):
    return json.dumps(getPredictions(text))

if __name__ == "__main__":
    app.run()