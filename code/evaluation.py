import pandas as pd
import torch
from transformers import BertTokenizer, BertForSequenceClassification
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from tqdm import tqdm

def load_model_and_tokenizer(model_path):
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertForSequenceClassification.from_pretrained(model_path)
    model.eval()
    return model, tokenizer

def preprocess_input(texts, tokenizer):
    return tokenizer(texts, padding=True, truncation=True, return_tensors="pt")

def evaluate_model(model, tokenizer, test_df):
    all_preds = []
    all_labels = []

    for i in tqdm(range(0, len(test_df), 16)):
        batch = test_df.iloc[i:i+16]
        inputs = preprocess_input(batch['title'].tolist(), tokenizer)
        with torch.no_grad():
            logits = model(**inputs).logits
        preds = torch.argmax(logits, dim=1).tolist()
        labels = batch['label'].tolist()

        all_preds.extend(preds)
        all_labels.extend(labels)

    acc = accuracy_score(all_labels, all_preds)
    precision, recall, f1, _ = precision_recall_fscore_support(all_labels, all_preds, average='binary')

    return acc, precision, recall, f1