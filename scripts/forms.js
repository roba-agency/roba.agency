let form = document.getElementById("form-container");

let formSection0 = document.getElementById("form-section0");
let formSection1 = document.getElementById("form-section1");
let formSection2 = document.getElementById("form-section2");
let formSection3 = document.getElementById("form-section3");
let formSection4 = document.getElementById("form-section4");

let formSections = [formSection0, formSection1, formSection2, formSection3, formSection4];
let allFormSections = document.getElementsByClassName("form-section");

let formSectionLocation = 0;

let formIndicatorIMG0 = document.getElementById("indicator-img0");
let formIndicatorIMG1 = document.getElementById("indicator-img1");
let formIndicatorIMG2 = document.getElementById("indicator-img2");
let formIndicatorIMG3 = document.getElementById("indicator-img3");
let formIndicatorIMG4 = document.getElementById("indicator-img4");

let formIndicatorIMGs = [formIndicatorIMG0, formIndicatorIMG1, formIndicatorIMG2, formIndicatorIMG3, formIndicatorIMG4];

let formIndicatorText0 = document.getElementById("indicator-text0");
let formIndicatorText1 = document.getElementById("indicator-text1");
let formIndicatorText2 = document.getElementById("indicator-text2");
let formIndicatorText3 = document.getElementById("indicator-text3");
let formIndicatorText4 = document.getElementById("indicator-text4");

let formIndicatorTexts = [formIndicatorText0, formIndicatorText1, formIndicatorText2, formIndicatorText3, formIndicatorText4];

let formButtonBack = document.getElementById("form-button-back");
let formButtonNext = document.getElementById("form-button-next");

document.addEventListener("DOMContentLoaded", (event) => {
    updateFormSectionLocation();
});

formButtonNext.addEventListener("click", (event) => {
    if (formSectionLocation < 4) {
        updateFormSectionLocation(1);
    }
    else if (formSectionLocation === 4) {
        form.submit();
    }
});

formButtonBack.addEventListener("click", () => updateFormSectionLocation(-1));

function updateFormSectionLocation(direction) {
    if (direction === 1) {
        renderFormIndicator();
        formSectionLocation += 1;
        renderForm();
    } 

    else if (direction === -1) {
        formSectionLocation -= 1;
        renderFormIndicator(true);
        renderForm();
    } 
    
    else if (!direction) {
        renderForm();
    };

    if (direction === 2) {
        handleForm2Checkboxes();
    }

    handleButtons();
};

function renderForm() {
    for (let i = 0; i < allFormSections.length; i++) {
        allFormSections[i].style.display = "none";
    };

    formSections[formSectionLocation].style.display = "block";
};

function renderFormIndicator(remove) {
    if (remove){
        formIndicatorIMGs[formSectionLocation].classList.remove("forms-progress-indicator-img-purple");
        formIndicatorTexts[formSectionLocation].classList.remove("forms-progress-indicator-text-purple");
    }
    else {
        formIndicatorIMGs[formSectionLocation].classList.add("forms-progress-indicator-img-purple");
        formIndicatorTexts[formSectionLocation].classList.add("forms-progress-indicator-text-purple");
    }
};

function handleButtons() {
    if (formSectionLocation === 0) {
        formButtonBack.style.display = "none";
    } else {
      formButtonBack.style.display = "block";
    };

    if (formSectionLocation === 4) {
        formButtonNext.innerHTML = "Submit →";
    } else {
      formButtonNext.innerHTML = "Next →";
    };
}