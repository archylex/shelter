class Carousel {
  slide = {
    frame: null, // main window of slider
    all: null, // all nodes of slides
    num: 0, // number of current slide
    isMoving: false, // animation
    info: null // info from json
  }

  createSlide(current) {
    const newSlide = current.cloneNode(true);

    this.changeInfoCard(newSlide);    
    this.slide.frame.appendChild(newSlide);        
  }

  changeInfoCard(slide) {
    for (let i = 0; i < 3; i++) {
      const cardImg = slide.children[i].children[0].children[0];    
      const cardTitle = slide.children[i].children[1];    
      const idx = Math.floor(Math.random() * this.slide.info.length);

      cardImg.setAttribute('src', this.slide.info[idx].img);
      cardTitle.textContent = this.slide.info[idx].name;
    }    
  }

  finishTransition() {
    const that = this;
    this.slide.isMoving = true;

    setTimeout(function(){
      that.slide.isMoving = false;
    }, 500);
  }

  constructor(classInfo, json) {
    this.slide.info = Object.values(json);
    this.slide.frame = document.querySelector(classInfo.frame);    

    const current = document.querySelector(classInfo.current);            
    
    for (let i = 0; i < 2; i++)
      this.createSlide(current);

    this.slide.all = document.querySelectorAll(classInfo.current);
    this.slide.all[this.slide.all.length - 1].classList.add('prev');
    this.slide.all[0].classList.add('active');
    this.slide.all[1].classList.add('next');
  }  

  moveTo(slideNum) {   
    if(!this.slide.isMoving) {
      this.finishTransition();

      const next = (slideNum + 1) % this.slide.all.length;
      const prev = (slideNum + 2) % this.slide.all.length;
             
      this.slide.all[slideNum].classList.remove('prev');
      this.slide.all[slideNum].classList.remove('next');
      this.slide.all[slideNum].classList.add('active');

      this.slide.all[next].classList.remove('prev');
      this.slide.all[next].classList.remove('active');
      this.slide.all[next].classList.add('next');

      this.slide.all[prev].classList.remove('active');
      this.slide.all[prev].classList.remove('next');
      this.slide.all[prev].classList.add('prev');     
    }
  }

  moveToNext() {
    if (!this.slide.isMoving) {
      this.slide.num = this.slide.num === this.slide.all.length - 1 ? 0 : this.slide.num + 1;
      this.changeInfoCard(this.slide.all[this.slide.num]);
      this.moveTo(this.slide.num);
    }
  }
  
  moveToPrev() {
    if (!this.slide.isMoving) {
      this.slide.num = this.slide.num === 0 ? this.slide.all.length - 1 : this.slide.num - 1;
      this.changeInfoCard(this.slide.all[this.slide.num]);
      this.moveTo(this.slide.num);
    }
  }
}