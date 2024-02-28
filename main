class ContentBasedRecommender {
    constructor(options = {}) {
        this.setOptions(options);
        this.data = {};
    }
    
    setOptions(options = {}) {
        // Validation
        if ((options.maxVectorSize !== undefined) && (!Number.isInteger(options.maxVectorSize) || options.maxVectorSize <= 0)) {
            throw new Error('The option maxVectorSize should be integer and greater than 0');
        }
        
        if ((options.maxSimilarDocuments !== undefined) && (!Number.isInteger(options.maxSimilarDocuments) || options.maxSimilarDocuments <= 0)) {
            throw new Error('The option maxSimilarDocuments should be integer and greater than 0');
        }
        
        if ((options.minScore !== undefined) && (!_.isNumber(options.minScore) || options.minScore < 0 || options.minScore > 1)) {
            throw new Error('The option minScore should be a number between 0 and 1');
        }
        
        this.options = Object.assign({}, defaultOptions, options);
    }
    
    train(documents, userPreferences = {}, pastBehavior = {}) {
        this.validateDocuments(documents);
        if (this.options.debug) {
            console.log(`Total documents: ${documents.length}`);
        }
        
        // Step 1 - Preprocess the documents
        const preprocessDocs = this._preprocessDocuments(documents, this.options, userPreferences, pastBehavior);
        
        // Step 2 - Create document vectors
        const docVectors = this._produceWordVectors(preprocessDocs, this.options);
        
        // Step 3 - Calculate similarities
        this.data = this._calculateSimilarities(docVectors, this.options, userPreferences, pastBehavior);
    }
    
    trainBidirectional(documents, targetDocuments, userPreferences = {}, pastBehavior = {}) {
        this.validateDocuments(documents);
        this.validateDocuments(targetDocuments);
        if (this.options.debug) {
            console.log(`Total documents: ${documents.length}`);
        }
        
        // Step 1 - Preprocess the documents
        const preprocessDocs = this._preprocessDocuments(documents, this.options, userPreferences, pastBehavior);
        const preprocessTargetDocs = this._preprocessDocuments(targetDocuments, this.options, userPreferences, pastBehavior);
        
        // Step 2 - Create document vectors
        const docVectors = this._produceWordVectors(preprocessDocs, this.options);
        const targetDocVectors = this._produceWordVectors(preprocessTargetDocs, this.options);
        
        // Step 3 - Calculate similarities
        this.data = this._calculateSimilaritiesBetweenTwoVectors(docVectors, targetDocVectors, this.options, userPreferences, pastBehavior);
    }
    
    validateDocuments(documents) {
        if (!Array.isArray(documents)) {
            throw new Error('Documents should be an array of objects');
        }
        
        for (let i = 0; i < documents.length; i++) {
            const document = documents[i];
            if (!(_.has(document, 'id') || _.has(document, 'content'))) {
                throw new Error('Documents should have fields id and content');
            }
            
            if (_has(document, 'tokens') || _.has(document, 'vector')) {
                throw new Error('"tokens" and "vector" properties are reserved and cannot be used as document properties");
            }
        }
    }
    
    getSimilarDocuments(id, start = 0, size = undefined) {
        let similarDocuments = this.data[id];
        if (similarDocuments === undefined) {
            return [];
        }
        
        const end = (size !== undefined) ? start + size : undefined;
        similarDocuments = similarDocuments.slice(start, end);
        return similarDocuments;
    }
}
