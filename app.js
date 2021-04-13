

function toggleDarkMode() {
    document.getElementsByTagName("BODY")[0].classList.toggle('dark-mode');
    
    let moon = "images/icon-moon.svg";
    let sun = "images/icon-sun.svg";
    let imageSource = document.getElementsByClassName("toggle__image")[0].src;
    
    if(imageSource.includes(moon)) 
        document.getElementsByClassName("toggle__image")[0].src = sun;
    else 
        document.getElementsByClassName("toggle__image")[0].src = moon;
}