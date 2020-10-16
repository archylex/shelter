document.addEventListener("DOMContentLoaded", () => {        
    const url = 'https://archylex.github.io/shelter/shelter/assets/data/pets.json';    
    let json;    

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);  
            json = data;
        })
        .catch(err => { throw err });
    
    const popup = new PopUp();
    const divPopup = document.querySelector('.popup');
    const cards = document.querySelectorAll('.friends-slider-card');
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

    bg.addEventListener("click", bgClick, false);
    bg.addEventListener("mouseover", bgHover, false);

    divPopup.appendChild(popup.fragment);   

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