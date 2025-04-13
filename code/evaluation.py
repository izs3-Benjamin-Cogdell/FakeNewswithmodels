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