document.addEventListener("DOMContentLoaded", () => {        
    let json;    
    const url = 'https://archylex.github.io/shelter/shelter/assets/data/pets.json';        
        
    fetch(url)
        .then(res => res.json())
        .then(data => {
            json = data;
            
            const sliderClassInfo = {
                frame: '.carousel',
                current: '.current_slide',
            }

            const carousel = new Carousel(sliderClassInfo, data);
            const sliderBtn = document.querySelectorAll('.friends-slider-button');
            
            sliderBtn[1].addEventListener('click', () => {
                carousel.moveToNext();
                updateCardListener()
            });

            sliderBtn[0].addEventListener('click', () => {
                carousel.moveToPrev();
                updateCardListener();
            });
        })
        .catch(err => { throw err });
    
    const popup = new PopUp();
    const divPopup = document.querySelector('.popup');
    const bg = document.querySelector('.tint-background');   

    const bgClick = e => {   
        if (e.target.className.includes('tint-background'))
            popup.hide();
    }

    const bgHover = e => {
        if (e.target.className.includes('tint-background'))
            popup.lightButton();        
        else
            popup.unlightButton();        
    }

    bg.addEventListener('click', bgClick, false);
    bg.addEventListener('mouseover', bgHover, false);

    divPopup.appendChild(popup.fragment);   


    const updateCardListener = () => {
        const cards = document.querySelectorAll('.friends-slider-card');

        cards.forEach(e => {
            e.addEventListener('click', () => {
                const title = e.querySelector('h4');
                
                for(let pet of json) {        
                    if (pet.name === title.textContent) {                    
                        popup.info = pet;
                        popup.show();
                    }
                }
            })
        });   
    }
       
    updateCardListener();
   
    
    // phone burger
    const burgerScreen = document.querySelector('.burger-screen');    
    const burger = document.querySelector('.burger');    
    burger.addEventListener('click', e => {
        if (e.target.className.includes('burger-show'))
            burgerScreen.classList.remove('burger-show');        
        else
            burgerScreen.classList.add('burger-show');        
    })
});