class Pagination {
    props = {
        pageNumber: 1,
        totalPages: 6,
        pages: null,
        nextBtn: null,
        prevBtn: null,
        curruntBtn: null,
        startBtn: null,
        endBtn: null
    }

    constructor() {        
        const buttons = document.querySelectorAll('.friends-slider-button');
        const pages = new Pages(6);
        this.props.nextBtn = buttons[3];
        this.props.prevBtn = buttons[1];
        this.props.startBtn = buttons[0];
        this.props.endBtn = buttons[4];
        this.props.currentBtn = buttons[2];
        this.props.pages = pages.getPages();        
                
        this.setListeners();        
    }

    setListeners() {
        const that = this;

        this.props.nextBtn.addEventListener('click', e => {
            that.props.pageNumber = that.props.pageNumber + 1 < that.props.totalPages ? that.props.pageNumber + 1 : that.props.totalPages;
            that.props.currentBtn.firstElementChild.textContent = that.props.pageNumber;
                        
            if (that.props.prevBtn.disabled) {
                that.props.prevBtn.disabled = false;
                that.props.prevBtn.firstElementChild.classList.remove('disabled');

                that.props.startBtn.disabled = false;
                that.props.startBtn.firstElementChild.classList.remove('disabled');
            }
            
            if (that.props.pageNumber === that.props.totalPages) {
                that.props.nextBtn.disabled = true;
                that.props.nextBtn.firstElementChild.classList.add('disabled');
                
                that.props.endBtn.disabled = true;
                that.props.endBtn.firstElementChild.classList.add('disabled');
            }

            this.updatePage();
        })

        this.props.prevBtn.addEventListener('click', e => {
            that.props.pageNumber = that.props.pageNumber - 1 > 1 ? that.props.pageNumber - 1 : 1;
            that.props.currentBtn.firstElementChild.textContent = that.props.pageNumber;
                        
            if (that.props.nextBtn.disabled) {
                that.props.nextBtn.disabled = false;
                that.props.nextBtn.firstElementChild.classList.remove('disabled');

                that.props.endBtn.disabled = false;
                that.props.endBtn.firstElementChild.classList.remove('disabled');
            }
            
            if (that.props.pageNumber === 1) {
                that.props.prevBtn.disabled = true;
                that.props.prevBtn.firstElementChild.classList.add('disabled');

                that.props.startBtn.disabled = true;
                that.props.startBtn.firstElementChild.classList.add('disabled');
            }

            this.updatePage();
        })
    }

    updatePage() {
        const photos = document.querySelectorAll('.slder-card');
        const titles = document.querySelectorAll('.pets-card-title');
        const that = this;

        photos.forEach((photo, idx) => {
            photo.setAttribute('src', that.props.pages[that.props.pageNumber - 1][idx].img);
        });

        titles.forEach((title, idx) => {
            title.textContent = that.props.pages[that.props.pageNumber - 1][idx].name;
        });
    }
}

const pag = new Pagination();