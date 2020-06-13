/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const startingTime = performance.now();
const navBar = document.getElementById("navbar__list");
let counter = 5;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Function that activates smooth scrolling
const scrollToElement = (target) => {
    // determine height from top + nav bar height
    let section = document.querySelector(target.hash);
    let height = section.offsetTop - navBar.offsetHeight;
    
    scrollTo({
        top: height,
        behavior: 'smooth',
    });

    // *** SCROLLING, 2nd OPTION: not used because navbar if it too tall ***

    // document.querySelector(target.hash).scrollIntoView({
    //     behavior: "smooth",
    //     block: "start"
    // });    
}


// Function that creates new section
const addSection = () => {
    const template = document.querySelector("#newSection");

    const clone = template.content.cloneNode(true);
    clone.children[0].id += counter.toString();
    clone.children[0].dataset.nav += counter.toString();
    clone.querySelector("h2").innerText += counter.toString();
    
    template.parentElement.appendChild(clone);
    removeNavBar();
    buildNavBar();
    counter++;
    hideMenu();
}

// Remove elements in Nav Bar
const removeNavBar = () => {
    const navList = document.querySelectorAll('ul li');
    navList.forEach(li => {
        li.remove();
    })
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavBar = function() {
    const sections = document.querySelectorAll("section");
    const fragment = document.createDocumentFragment();

    for (section of sections) {
        const newElement = document.createElement('li');
        newElement.classList.add("menu__link");

        const link = document.createElement('a');
        link.innerText = section.dataset.nav;
        link.href = `#${section.id}`;
        newElement.appendChild(link);
        
        fragment.appendChild(newElement)
    }
    // Add "new section" button
    const newElement = document.createElement('li');
    newElement.classList.add("menu__link");
    newElement.id = "new-section";
    const link = document.createElement('a');
    link.innerText = "New Section";
    link.href = "#top";
    newElement.appendChild(link);   
    fragment.appendChild(newElement);
    // Add menu button
    const menu = document.createElement('li');
    menu.classList.add("menu__link");
    menu.classList.add("menu_hide");
    menu.id = "menu";
    const menu_link = document.createElement('a');
    menu_link.innerText = "Menu";
    menu_link.href = "#";
    menu.appendChild(menu_link);
    fragment.appendChild(menu);

    navBar.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
window.addEventListener("scroll", event => {
    let fromTop = window.scrollY;

    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        if (!link.hash) {return}
        let section = document.querySelector(link.hash);
        // Ignore scrolling if there is no section href
        if (!section) {return}

        // Add or remove active class
        if (
            section.offsetTop <= fromTop + 200 &&
            section.offsetTop + section.offsetHeight - 200 > fromTop
        ) {
            section.classList.add("your-active-class");
            link.parentElement.classList.add("link_active");
        } else {
            section.classList.remove("your-active-class");
            link.parentElement.classList.remove("link_active");
        }
    });
  });

// Scroll to anchor ID using scrollTO event
navBar.addEventListener("click", function(e) {
    event.preventDefault();
    if (!e.target.children[0].hash) {
        return
    }
    // If it is "New Section" button
    if (e.target.children[0].hash == "#top") {
        console.log('Adding section', e.target, e.target.children[0]);
        addSection();
        return
    }
    // If clicked on a tag
    if (e.target.nodeName == "A") {
        scrollToElement(e.target);
        return
    }
    // If li tag was clicked instead of a tag
    if (e.target.nodeName == "LI") {
        scrollToElement(e.target.children[0])
        return
    }
    
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
document.addEventListener('DOMContentLoaded', function () {
    
    buildNavBar();
}); 


// Scroll to section on link click

// Set sections as active

// Performance results
const endingTime = performance.now();
console.log('This code took ' + (endingTime - startTimeDOM).toPrecision(3) + ' milliseconds. (End of the body element)');

// Hide menu
const hideMenu = () => {
    if (counter > 4) {
        const menu = document.querySelector("#menu");
        menu.classList.remove('menu_hide');
        const links = document.querySelectorAll(".menu__link");
        links.forEach(link => {
            
            if (link.id != "new-section" && link.id != "menu") {
                link.classList.add('menu_hide');
                console.log(link.id);
            } else {
                console.log(`Remove hide from ${link}`);
                link.classList.remove('menu_hide');
            }
        });
    }
}

// Add even listener for "menu" button clicks
navBar.addEventListener("click", function(e) {
    event.preventDefault();
    // If it is "menu" button
    if (e.target.id == "menu") {
        console.log("Menu is clicked:", e.target.id);
        const linksHidden = document.querySelectorAll(".menu_hide");
        const links = document.querySelectorAll(".menu__link");
        console.log(links.length);
        links.forEach(link => {       
            if (linksHidden.length > 1) {
                link.classList.remove('menu_hide');
            } else {
                link.classList.add('menu_hide');
            }
            if (link.id) {
                link.classList.remove('menu_hide');
            }
        });  
    }
});   
