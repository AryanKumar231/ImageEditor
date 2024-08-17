const simage = document.querySelector("#select-image");
const img = document.querySelector("#image");
const canvas = document.querySelector("#canvas");
const download = document.querySelector("#download");
const reset=document.querySelector("#reset");
const rotateOne=document.querySelector("#rotate-90");
const rotateTwo=document.querySelector("#rotate-180");
const rotateThree=document.querySelector("#rotate-270");
const rotateFour=document.querySelector("#rotate-360");
const ctx = canvas.getContext("2d");

simage.addEventListener("change", (event) => {
    let file = event.target.files;
    img.src = URL.createObjectURL(file[0]);
    img.style.display = "block"; 
});

// Slider elements
const grayscale = document.getElementById("grayscale");
const hue = document.getElementById("hue");
const saturate = document.getElementById("saturation");
const opacity = document.getElementById("opacity");
const contrast = document.getElementById("contrast");
const blurr = document.getElementById("blur");

// Function to update the image filter based on slider values
function updateFilter() {
    img.style.filter = `
        blur(${blurr.value}px)
        contrast(${contrast.value}%)
        grayscale(${grayscale.value}%)
        hue-rotate(${hue.value}deg)
        opacity(${opacity.value}%)
        saturate(${saturate.value}%)
    `;
}

// Apply the filter when any slider is changed
[blurr, contrast, grayscale, hue, opacity, saturate].forEach(input => {
    input.addEventListener('input', updateFilter);
});

// Download the image with filters
download.addEventListener("click", () => {
    // Set canvas dimensions to match the image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Apply filters to the canvas
    ctx.filter = img.style.filter;

    // Draw the image on the canvas with applied filters
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "filtered-image.jpg";
    link.click();
});


rotateOne.addEventListener("click",(event)=>{
    img.style.transform=`rotate(90deg)`
})

rotateTwo.addEventListener("click",(event)=>{
    img.style.transform=`rotate(180deg)`
})

rotateThree.addEventListener("click",(event)=>{
    img.style.transform=`rotate(270deg)`
})

rotateFour.addEventListener("click",(event)=>{
    img.style.transform=`rotate(360deg)`
})


reset.addEventListener("click",(event)=>{
    grayscale.value = 0;
    hue.value = 0;
    saturate.value = 100;
    opacity.value = 100;
    contrast.value = 100;
    blurr.value = 0;
    rotate.value = 0;

    img.style.filter=`blur(${blurr.value}px)
        contrast(${contrast.value}%)
        grayscale(${grayscale.value}%)
        hue-rotate(${hue.value}deg)
        opacity(${opacity.value}%)
        saturate(${saturate.value}%)
    `
    img.style.transform="none"
})
