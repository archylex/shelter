class Pages {
    constructor(totalPages = 6) {
        this.url = 'https://archylex.github.io/shelter/shelter/assets/data/pets.json';     
        this.dataPages = [];    
        this.totalPages = totalPages;
        this.getData();
    }

    async getData() {
        const that = this;
        await fetch(this.url)
            .then(res => res.json())
            .then(data => {
                const pets = Object.values(data); 
                for (let i = 0; i < that.totalPages; i++) {
                    that.dataPages.push(that.shuffle(Object.assign([], pets)));
            }            
        })
        .catch(err => { throw err });
    }

    setTotalPages(n) {
        this.totalPages = n;
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

const p = new Pages(6);
console.log(p.getPages())