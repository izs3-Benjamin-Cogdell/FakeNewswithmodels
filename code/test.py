import torch
from transformers import AutoTokenizer, BertForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

modelTouse = input('Model to use (politifact - p, gossipcop - g, both - b): ')

if (modelTouse == 'p'):
    model = BertForSequenceClassification.from_pretrained('politifactModel/')
elif (modelToUse == 'g'):
    model = BertForSequenceClassification.from_pretrained('gossipcopModel/')
elif (modelToUse == 'b'):
    model = BertForSequenceClassification.from_pretrained('bothModel/')

input = input('Input to Model: ')
input = tokenizer(input, return_tensors="pt")

model.eval()
with torch.no_grad():
    logits = model(**input).logits

predicted_class_id = logits.argmax().item()
print(model.config.id2label[predicted_class_id])