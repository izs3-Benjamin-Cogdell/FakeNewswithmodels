import torch
from transformers import AutoTokenizer, BertForSequenceClassification

modelPaths = "model_paths.txt"

# Used to convert from model prediction to actual label of data
dataConversion = {
    0 : "Real",
    1 : "Fake"
}

# Loads the local model saved in path
def loadModel(path):
    return BertForSequenceClassification.from_pretrained(
        pretrained_model_name_or_path=path, local_files_only=True)

# Tokenizes the input so it can be passed to the model
def processInput(inputText, tokenizer):
    return tokenizer(inputText, padding=True, truncation=True, return_tensors="pt")

# Retrieves all the models and returns them in a dictionary of the form:
#   name : model
# path: file path to text file containing all the model paths in the form:
#   name : path/to/model
def getAllModels(path):
    models = {}
    with open(path, 'r') as file:
        for line in file:
            items = line.split(sep=',')
            models.update({items[0].strip() : loadModel(items[1].strip())})
    return models

# Returns the predictions of all the models in a dictionary of the form:
#   name : prediction
# text: input to the model
def getPredictions(text):
    tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
    models = getAllModels(modelPaths)
    processedText = processInput(text, tokenizer)
    results = {}
    for name, model in models.items():
        model.eval()
        with torch.no_grad():
            logits = model(**processedText).logits
        predictedClass = logits.argmax().item()   
        results.update({name : dataConversion[predictedClass]})
    return results     
