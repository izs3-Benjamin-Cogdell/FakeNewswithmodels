# FakeNewswithmodels
## Project Contributions

We have developed 5 models for detecting fake news and evaluated their performance. Each model was a pre-trained BERT model from Hugging Face that was fine-tuned using either the politifact dataset, gossipcop dataset, LIAR dataset, a combination of politifact and gossipcop data, or a combination of all three. 

Inside the /code folder we added evaluation.py, models.ipynb, app.py, inference.py, model_paths.txt, and the results folder. For the /data folder, everything was our contribution, including the new data files that had to be converted from their original formats. Finally, the React app in the /my-app folder was also entirely our contribution.

We have created a web application to test all of the models with different user input. The instructions to run this application are below.

Politifact and Gossipcop datasets: https://github.com/KaiDMML/FakeNewsNet

LIAR Dataset: https://paperswithcode.com/dataset/liar

Prior Research Cited by our Study: https://www.sciencedirect.com/science/article/abs/pii/S0306457323003011
- This study proposes a multimodal model for fake news detection that learns the context features of news and then fuses this with global semantic features to better distinguish fake news.

Contemporary Work Citing our Study: https://www.mdpi.com/2073-431X/13/11/292
- This paper compares the performance of their proposed LLaMA 3 model in detecting fake claims on bilingual datasets with other large language models.

## Additional Data

Before running our application, the two additional trained models not in this repository have to be downloaded (https://drive.google.com/drive/folders/12szEcqXtG7E1mAY_AG0aXYQVRlLiDhvW?usp=sharing). After downloading these files move both the all_three folder, and liar_dataset folder to the results folder.

## Using Our Models

To run our web application, two terminals are required.

In the first terminal, navigate to the /code folder and run the following command to start the Flask back end:

    python app.py
  
Then, in the second terminal, navigate to the /my-app folder and run the following command to deploy the webpage:

    npm run dev

Now, the webpage should be hosted on http://localhost:5173/. 
