let image = document.querySelector(".container .box .image #img")
let upload = document.querySelector(".container .box .input #inp");

let sat = document.querySelector(".container .content ul li #saturate");
let con = document.querySelector(".container .content ul li #contrast");
let bri = document.querySelector(".container .content ul li #brightness");
let sep = document.querySelector(".container .content ul li #sepia");
let gray = document.querySelector(".container .content ul li #grayscale");
let blur = document.querySelector(".container .content ul li #blur");
let hue = document.querySelector(".container .content ul li #hue-rotate");

let download = document.querySelector(".container .content #download");
let reset = document.querySelector(".container .content span");
let imgBox =  document.querySelector(".image");

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");

let text = document.querySelector(".box .text");

let btn = document.querySelector("button");

let color;
if (localStorage.elements != null) {
    color = JSON.parse(localStorage.elements);
}else {
    color = [];
}
let counter;
if (localStorage.elements != null){
    counter = color[0].counter;
}else {
    counter = 1;
}
btn.addEventListener('click', function() {
    counter++;
    color = [];
    let object = {
        counter: counter,
        color1: "#eee",
        color2: "#3300ff",
        color3: "#111",
        color4: "#222",
        icon: `<iconify-icon class="icon-2" icon="material-symbols:night-sight-auto" style="color: #999;"></iconify-icon>`,
        icon2: `<iconify-icon class="icon-1" icon="material-symbols-light:light-mode" style="color: #555;"></iconify-icon>`
    }
    color.push(object);
    localStorage.setItem("elements", JSON.stringify(color));
    showColor();
    showicon();
});


btn.addEventListener('mouseover', function() {
    if (localStorage.elements != null) {
        btn.addEventListener('mouseover', function() {
            document.querySelector('.icon-1').style.cssText += 'color: #00c8f5; transition: 0.5s';
            document.querySelector('.icon-2').style.cssText += 'color: #000; transition: 0.5s';
        });
    
        btn.addEventListener('mouseout', function() {
            document.querySelector('.icon-1').style.cssText += 'color: #555; transition: 0.5s';
            document.querySelector('.icon-2').style.cssText += 'color: #999; transition: 0.5s';
        });
    }
    document.querySelector('.icon-1').style.cssText += 'color: #00c8f5; transition: 0.5s';
});

btn.addEventListener('mouseout', function() {
    if (localStorage.elements != null) {
        btn.addEventListener('mouseover', function() {
            document.querySelector('.icon-1').style.cssText += 'color: #00c8f5; transition: 0.5s';
            document.querySelector('.icon-2').style.cssText += 'color: #000; transition: 0.5s';
        });
    
        btn.addEventListener('mouseout', function() {
            document.querySelector('.icon-1').style.cssText += 'color: #555; transition: 0.5s';
            document.querySelector('.icon-2').style.cssText += 'color: #999; transition: 0.5s';
        });
    }
    document.querySelector('.icon-1').style.cssText += 'color: #555; transition: 0.5s';
});

function showColor() {
    if (localStorage.elements != null && color[0].counter%2 == 0) {
        document.querySelector('body').style.cssText = `background-color: ${color[0].color1}`;
        document.querySelector(".container").style.cssText = `background-color: ${color[0].color2}`;
    }
    if (localStorage.elements != null && color[0].counter%2 !== 0) {
        document.querySelector('body').style.cssText = `background-color: ${color[0].color3}`;
        document.querySelector(".container").style.cssText = `background-color: ${color[0].color4}`;
    }
}
showColor();

function showicon() {
    if (localStorage.elements != null && color[0].counter%2 == 0) {
        btn.innerHTML = `${color[0].icon} ${color[0].icon2}`;
        document.querySelector(".icon-1").style.cssText += 'transform: scale(0);' 
        document.querySelector(".icon-2").style.cssText += 'transform: scale(1);' 
    }else if (localStorage.elements != null && color[0].counter%2 != 0) {
        btn.innerHTML = `${color[0].icon} ${color[0].icon2}`;
        document.querySelector(".icon-1").style.cssText += 'transform: scale(1);' 
        document.querySelector(".icon-2").style.cssText += 'transform: scale(0);' 
    }
    else {
        document.querySelector('button').innerHTML = `<iconify-icon class="icon-1" icon="material-symbols-light:light-mode" style="color: #555;"></iconify-icon>`;
    }
}
showicon();

function resetValue() {
    ctx.filter = "none";
    sat.value = "100";
    con.value = "100";
    bri.value = "100";
    sep.value = "0";
    gray.value = "0";
    blur.value = "0";
    hue.value = "0";
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
}


window.onload = function() {
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
    resetValue();
}

upload.onchange = function() {
    resetValue();
    text.style.display = "none";
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    
    file.onload = function() {
        image.src = file.result;
    }
    image.onload = function() {
        canvas.width = "500";
        canvas.height = "250";
        console.log(image.height)
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
        image.style.display = "none";
    }
}

let filters = document.querySelectorAll("ul li input");
filters.forEach( element => {
    element.addEventListener("input", function() {
        ctx.filter = `saturate(${sat.value}%)
                                contrast(${con.value}%)
                                brightness(${bri.value}%)
                                sepia(${sep.value}%)
                                grayscale(${gray.value})
                                blur(${blur.value}px)
                                hue-rotate(${hue.value}deg)`;
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
    })
});

reset.addEventListener("click", function() {
    resetValue();
})

download.onclick = function() {
    download.href = canvas.toDataURL("image/png");
}