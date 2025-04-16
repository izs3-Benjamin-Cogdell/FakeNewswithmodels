import csv
import os

# This script converts a TSV file to a CSV file.

def convert_tsv_to_csv(tsv_file_path):
    base, _ = os.path.splitext(tsv_file_path)
    csv_file_path = f"{base}.csv"

    with open(tsv_file_path, 'r', encoding='utf-8') as tsv_file, \
         open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:

        tsv_reader = csv.reader(tsv_file, delimiter='\t')
        csv_writer = csv.writer(csv_file, delimiter=',')

        for row in tsv_reader:
            csv_writer.writerow(row)

    print(f"Converted to CSV: {csv_file_path}")

# Example usage
convert_tsv_to_csv("valid_binary_filtered.tsv")
convert_tsv_to_csv("valid_binary_reassigned.tsv")