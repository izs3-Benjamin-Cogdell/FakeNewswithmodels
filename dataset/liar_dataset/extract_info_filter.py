import csv
import os

# This script filters a TSV file to only include rows with "true" and "pants-fire" labels,

LABEL_MAPPING = {
    "pants-fire": 1,
    "true": 0
}

def filter_true_and_pants_fire(input_tsv):
    base, ext = os.path.splitext(input_tsv)
    output_tsv = f"{base}_binary_filtered.tsv"

    with open(input_tsv, 'r', encoding='utf-8') as infile, \
         open(output_tsv, 'w', newline='', encoding='utf-8') as outfile:

        reader = csv.reader(infile, delimiter='\t')
        writer = csv.writer(outfile, delimiter='\t')

        for row in reader:
            if len(row) >= 3:
                label = row[1].strip().lower()
                statement = row[2].strip()

                if label in LABEL_MAPPING:
                    binary_label = LABEL_MAPPING[label] # 0 for true, 1 for pants-fire
                    writer.writerow([binary_label, statement])

    print(f"Created filtered file: {output_tsv}")

# Example usage
filter_true_and_pants_fire("valid.tsv")