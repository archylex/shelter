class PopUp {
    fragment = null;

    domElement = {
        image: null,
        name: null,
        type: null,
        breed: null,
        description: null,
        age: null,
        inoculations: null,
        diseases: null,
        parasites: null
    }

    constructor(petInfo) {
        this.fragment = document.createDocumentFragment();

        const popInfo = document.createElement('div');
        popInfo.classList.add('popup-info');

        const popImageDiv = document.createElement('div');
        popImageDiv.classList.add('popup-image');

        this.domElement.image = document.createElement('img');
        popImageDiv.appendChild(this.domElement.image);

        this.fragment.appendChild(popImageDiv);

        this.domElement.name = document.createElement('p');
        this.domElement.name.classList.add('popup-pet-name');
        popInfo.appendChild(this.domElement.name);
        
        const type_and_breed = document.createElement('p');
        type_and_breed.classList.add('pop-pet-type-and-breed');
        this.domElement.type = document.createElement('span');        
        const type_separator = document.createElement('span');
        type_separator.innerHTML = '&nbsp;-&nbsp;';
        this.domElement.breed = document.createElement('span');
        type_and_breed.appendChild(this.domElement.type);        
        type_and_breed.appendChild(type_separator);
        type_and_breed.appendChild(this.domElement.breed);
        popInfo.appendChild(type_and_breed);

        this.domElement.description = document.createElement('p');
        this.domElement.description.classList.add('popup-pet-description');
        popInfo.appendChild(this.domElement.description);

        const list = document.createElement('ul');        
        list.classList.add('popup-list');
        this.domElement.age = document.createElement('li');
        this.domElement.inoculations = document.createElement('li');
        this.domElement.diseases = document.createElement('li');
        this.domElement.parasites = document.createElement('li');
        list.appendChild(this.domElement.age);
        list.appendChild(this.domElement.inoculations);
        list.appendChild(this.domElement.diseases);
        list.appendChild(this.domElement.parasites);

        popInfo.appendChild(list);

        // close button
        const button = document.createElement('button');
        button.classList.add('popup-button');
        const btn_img = document.createElement('img');        
        btn_img.setAttribute('src', '../../assets/icons/close.svg');
        btn_img.style.width = 'auto';        
        button.appendChild(btn_img);
        button.addEventListener('click', () => this.hide())
        this.fragment.appendChild(button);

        this.fragment.appendChild(popInfo);
               
        if (petInfo)
            this.info = petInfo;
        
        this.hide();
    }

    get fragment() {
        return this.fragment;
    }

    set info(petInfo) {
        this.domElement.image.setAttribute('src', petInfo.img);
        this.domElement.name.textContent = petInfo.name;
        this.domElement.type.textContent = petInfo.type;
        this.domElement.breed.textContent = petInfo.breed;
        this.domElement.description.textContent = petInfo.description;
        this.domElement.age.innerHTML = '<strong>Age:</strong>&nbsp;' + petInfo.age;
        this.domElement.inoculations.innerHTML = '<strong>Inoculations:</strong>&nbsp;' + petInfo.inoculations;
        this.domElement.diseases.innerHTML = '<strong>Diseases:</strong>&nbsp;' + petInfo.diseases;
        this.domElement.parasites.innerHTML = '<strong>Parasites:</strong>&nbsp;' + petInfo.parasites;
    }

    show() {
        const parent = document.querySelector('.tint-background');
        const me = document.querySelector('.popup');        
        parent.classList.remove('popup-hidden');
        me.classList.remove('popup-scale');
    }

    hide() {
        const parent = document.querySelector('.tint-background');
        const me = document.querySelector('.popup');
        parent.classList.add('popup-hidden');
        me.classList.add('popup-scale');
    }

    lightButton() {
        const btn = document.querySelector('.popup-button');
        btn.classList.add('popup-button-hover');
    }

    unlightButton() {
        const btn = document.querySelector('.popup-button');
        btn.classList.remove('popup-button-hover');
    }
}