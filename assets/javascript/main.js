const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//SWITCH TAB

var curTabIndex = 1;

const tabSections = $$('.filter__item');
const years = $$('.grade__title');

console.log(tabSections);

tabSections.forEach((tabSection, index) => {   
    tabSection.onclick = function(){
        //remove
        $('.filter__grade.filter__item--active').classList.remove('filter__item--active');
        $('.grade__body.grade__body--active').classList.remove('grade__body--active');
        $('.grade__title.container__title--active').classList.remove('container__title--active')
        
        //add
        years[index].classList.add('container__title--active');
        $(`.grade-${index+1}-1`)?.classList.add('grade__body--active');
        this.classList.add('filter__item--active');

        curTabIndex = index + 1;
    }
})

console.log(curTabIndex);
//SWITCH SEMESTER

const semesters = $$('.tab-semester');

semesters.forEach((semester, index) => {
    semester.onclick = function(){
        $('.tab-semester.tab--active').classList.remove('tab--active');
        $('.grade__body.grade__body--active')?.classList.remove('grade__body--active');

        $(`.grade-${curTabIndex}-${index + 1}`).classList.add('grade__body--active')
        this.classList.add('tab--active');
    }
})

