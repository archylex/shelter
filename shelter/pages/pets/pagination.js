class Pagination {
    props = {
        pageNumber: 1,
        totalPages: 6,
        numItems: 8,
        pages: null,
        pageDOM: null,
        nextBtn: null,
        prevBtn: null,
        curruntBtn: null,
        startBtn: null,
        endBtn: null
    }

    constructor(numPages = 6, numItems = 8) {        
        const buttons = document.querySelectorAll('.friends-slider-button');
        const pages = new Pages(numPages, numItems);
        this.props.pageDOM = document.querySelector('.friends-page');
        this.props.nextBtn = buttons[3];
        this.props.prevBtn = buttons[1];
        this.props.startBtn = buttons[0];
        this.props.endBtn = buttons[4];
        this.props.currentBtn = buttons[2];
        this.props.pages = pages.getPages();        
                
        this.setListeners();        
    }

    setProps(numPages, numItems) {
        const pages = new Pages(numPages, numItems);
        this.props.pages = pages.getPages();        
        this.props.pageNumber = 1;
        this.props.totalPages = numPages;        
        this.props.numItems = numItems;
        this.props.prevBtn.click();
    }

    setListeners() {
        const that = this;

        this.props.nextBtn.addEventListener('click', e => {
            that.props.pageNumber = that.props.pageNumber + 1 < that.props.totalPages ? that.props.pageNumber + 1 : that.props.totalPages;
            that.props.currentBtn.firstElementChild.textContent = that.props.pageNumber;
                        
            if (that.props.prevBtn.disabled) {
                that.enableButton(that.props.prevBtn);
                that.enableButton(that.props.startBtn);
            }
            
            if (that.props.pageNumber === that.props.totalPages) {
                that.disableButton(that.props.nextBtn);
                that.disableButton(that.props.endBtn);                
            }

            this.updatePage();            
        });

        this.props.prevBtn.addEventListener('click', e => {
            that.props.pageNumber = that.props.pageNumber - 1 > 1 ? that.props.pageNumber - 1 : 1;
            that.props.currentBtn.firstElementChild.textContent = that.props.pageNumber;
                        
            if (that.props.nextBtn.disabled) {
                that.enableButton(that.props.nextBtn);
                that.enableButton(that.props.endBtn);
            }
            
            if (that.props.pageNumber === 1) {
                that.disableButton(that.props.prevBtn);
                that.disableButton(that.props.startBtn);
            }

            this.updatePage();
        });

        this.props.startBtn.addEventListener('click', () => {
            that.props.pageNumber = 1;
            that.props.prevBtn.click();
        });

        this.props.endBtn.addEventListener('click', () => {
            that.props.pageNumber = that.props.totalPages;
            that.props.nextBtn.click();
        });
    }

    disableButton(btn) {
        btn.disabled = true;
        btn.firstElementChild.classList.add('disabled');        
    }

    enableButton(btn) {
        btn.disabled = false;
        btn.firstElementChild.classList.remove('disabled');        
    }

    updatePage() {
        this.hidePage();

        setTimeout(() => {
            const photos = [...document.querySelectorAll('.slder-card')].splice(0, this.props.numItems);
            const titles = [...document.querySelectorAll('.pets-card-title')].splice(0, this.props.numItems);

            photos.forEach((photo, idx) => {
                photo.setAttribute('src', this.props.pages[this.props.pageNumber - 1][idx].img);
            });

            titles.forEach((title, idx) => {
                title.textContent = this.props.pages[this.props.pageNumber - 1][idx].name;
            });

            this.showPage()
        }, 888);
    }

    hidePage() {
        this.props.pageDOM.classList.add('hide_page');
    }

    showPage() {        
        this.props.pageDOM.classList.remove('hide_page');
    }
}