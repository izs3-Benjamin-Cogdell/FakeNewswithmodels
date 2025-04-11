import torch
from transformers import AutoTokenizer, BertForSequenceClassification, DataCollatorWithPadding, Trainer, TrainingArguments
from datasets import load_dataset

# Used to convert from model prediction to actual label of data
dataConversion = {
    0 : "Fake",
    1 : "Real"
}

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2,
                                                      id2label = dataConversion)

# Load dataset
dataset = load_dataset("path/to/dataset")

def tokenize_dataset(dataset):
    return tokenizer(dataset["text"])

dataset = dataset.map(tokenize_dataset, batched=True)

data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# output_dir is where trained model will be saved
training_args = TrainingArguments(
    output_dir="testModel",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=2,
    push_to_hub=False,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
    data_collator=data_collator,
)

trainer.train()
