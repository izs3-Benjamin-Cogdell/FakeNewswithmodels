import csv
import os

# This script converts a TSV file with labels into a binary classification format.

LABEL_MAPPING = {
    "pants-fire": 1,
    "false": 1,
    "barely-true": 1,
    "half-true": 0,
    "mostly-true": 0,
    "true": 0
}

def convert_labels_to_binary(input_tsv):
    base, ext = os.path.splitext(input_tsv)
    output_tsv = f"{base}_binary_reassigned.tsv"

    with open(input_tsv, 'r', encoding='utf-8') as infile, \
         open(output_tsv, 'w', newline='', encoding='utf-8') as outfile:

        reader = csv.reader(infile, delimiter='\t')
        writer = csv.writer(outfile, delimiter='\t')

        for row in reader:
            if len(row) >= 3:
                label = row[1].strip().lower()
                statement = row[2].strip()

                if label in LABEL_MAPPING:
                    binary_label = LABEL_MAPPING[label]
                    writer.writerow([binary_label, statement])

    print(f"Created binary-labeled file: {output_tsv}")

# Example usage
convert_labels_to_binary("valid.tsv")