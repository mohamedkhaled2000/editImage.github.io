let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');
let download = document.getElementById('download');
let upload = document.getElementById('upload');
let image = document.getElementById('image');
let rest = document.querySelector('span');
let imgBox = document.querySelector('.img-box');

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

function restVal () { 
    image.style.filter = 'none';;
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
}


window.onload = function () {
    download.style.display = 'none';
    rest.style.display = 'none';
    imgBox.style.display = 'none';
}

upload.onchange = function () {
    restVal();
    download.style.display = 'block';
    rest.style.display = 'block';
    imgBox.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    console.log(file.result);
    file.onload = function () { 
        image.src = file.result;
    }

    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
        image.style.display = 'none';
    }
}

let filters = document.querySelectorAll("ul li input");

filters.forEach( filter => {
    filter.addEventListener("input" , function () {
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
        ctx.drawImage(image,0,0,canvas.width,canvas.height);

    });
});

rest.onclick = function () {
    restVal();
}

download.onclick = function () {
    this.href = canvas.toDataURL();
}