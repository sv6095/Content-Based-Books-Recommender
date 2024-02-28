# Content-Based-Books-Recommender
the recommender is trained by an array of books, it can tell the list of books which are more similar to the input book.


Training Process
Preprocessing Documents:
Documents are preprocessed by tokenizing, removing HTML tags, converting to lowercase, extracting unigrams, bigrams, and trigrams.
Creating Document Vectors:
TF-IDF is applied to the preprocessed documents to create word vectors for each document.
Calculating Similarities:
Cosine similarity is calculated between document vectors to determine similarities.
Validation and Control
The class validates options such as ensuring integer values for maxVectorSize and maxSimilarDocuments, and a number between 0 and 1 for minScore.
It validates that documents are in the correct format with 'id' and 'content' fields.
Control mechanisms are in place to limit the number of similar documents returned and filter by minimum score.
Bidirectional Training
The class supports bidirectional training by comparing similarities between two sets of documents.
Export and Import
The model can be exported to retain training data and options for future use.
Imported models can be used to recreate a recommender with the same settings.
Algorithms Used
The class employs algorithms like TF-IDF for term weighting, Porter Stemmer for stemming words, NGrams for extracting n-grams, and cosine similarity for calculating document similarities.
