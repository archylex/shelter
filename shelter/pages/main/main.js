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
    const burgerTintScreen = document.querySelector('.burger-tint-screen');
    const burgerScreen = document.querySelector('.burger-screen');    
    const burgers = document.querySelectorAll('.burger');    

    const showBurger = () => {
        burgerTintScreen.classList.add('tint-screen-active');
        burgerScreen.classList.add('burger-show'); 
        burgers[0].classList.add('burger-icon-rotate');           
        burgers[1].classList.add('burger-icon-rotate');    
        disableScroll();
    }

    const hideBurger = () => {
        burgerTintScreen.classList.remove('tint-screen-active');
        burgerScreen.classList.remove('burger-show');   
        burgers[0].classList.remove('burger-icon-rotate');       
        burgers[1].classList.remove('burger-icon-rotate');       
        enableScroll();
    }

    burgerScreen.addEventListener('click', e => {
        if ( e.target.href !== undefined) {
            if (e.target.href.includes('/index.html#') && e.target.href !== 'javascript: void(0)')
                hideBurger();
        }
    });

    burgers[0].addEventListener('click', () => {    
        showBurger();
    });

    burgers[1].addEventListener('click', () => {    
        hideBurger();
    })

    burgerTintScreen.addEventListener('click', e => {
        if (e.target.className.includes('tint-screen-active')) {
            hideBurger();
        } else {
            showBurger();
        }
    })

});
