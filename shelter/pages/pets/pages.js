class Pages {
    constructor(totalPages = 6, numItems = 8) {
        this.url = 'https://archylex.github.io/shelter/shelter/assets/data/pets.json';     
        this.dataPages = [];    
        this.totalPages = totalPages;
        this.numItems = numItems;
        this.getData();
    }

    async getData() {
        const that = this;
        await fetch(this.url)
            .then(res => res.json())
            .then(data => {
                const pets = Object.values(data); 
                let shuffleArray = that.shuffle(Object.assign([], pets));
                let items = [];
                
                for (let i = 0; i < that.totalPages * that.numItems; i++) {
                    const idx = i % shuffleArray.length;

                    if (idx === 0)
                        shuffleArray = that.shuffle(Object.assign([], pets));

                    items.push(shuffleArray[idx])
                    
                    if ((i + 1) % that.numItems === 0) {
                        that.dataPages.push(items);
                        items = []
                    }
                        
                }  

                that.dataPages[0] = [pets[4], pets[0], pets[2], pets[1], pets[5], pets[7], pets[3], pets[6]];
        })
        .catch(err => { throw err });
    }
    
    setPages(numPages, numItems) {
        this.totalPages = numPages;
        this.numItems = numItems;
        this.dataPages = [];
        this.getData();
    }

    getPages() {
        return this.dataPages;
    }

    shuffle (array) {
        return array.sort(() => Math.random() - 0.5);
    }
}