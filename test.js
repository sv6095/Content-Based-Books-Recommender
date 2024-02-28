const ContentBasedRecommender = require('./ContentBasedRecommender');

// Sample documents for testing
const documents = [
    { id: 1, content: "Sample content 1" },
    { id: 2, content: "Sample content 2" },
    // Add more sample documents as needed
];

// Instantiate ContentBasedRecommender
const recommender = new ContentBasedRecommender();

// Train the recommender with sample documents
recommender.train(documents);

// Get similar documents for a specific document ID
const similarDocs = recommender.getSimilarDocuments(1);
console.log(similarDocs);

// Export and import recommender data if needed
const exportedData = recommender.export();
// recommender.import(exportedData); // Uncomment this line if you want to import data
