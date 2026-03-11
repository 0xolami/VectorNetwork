 const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("navLinks");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        /* Scroll Reveal */
        const sections = document.querySelectorAll("section");

        window.addEventListener("scroll", () => {
            sections.forEach(sec => {
                const top = window.scrollY;
                const offset = sec.offsetTop - 400;
                if (top > offset) {
                    sec.classList.add("show");
                }
            });
        });


const counters = document.querySelectorAll(".counter");
let started = false;

function startCounters() {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                if (target >= 1000) {
                    counter.innerText = (target / 1000) + "K+";
                } else {
                    counter.innerText = target + "+";
                }
            }
        };
        updateCount();
    });
}

window.addEventListener("scroll", () => {
    const section = document.getElementById("experience");
    const sectionTop = section.offsetTop - 400;

    if (!started && window.scrollY > sectionTop) {
        startCounters();
        started = true;
    }
});


const cards = document.querySelectorAll(".founder-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;

        card.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.05)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });

});

const canvas = document.getElementById("vectorFX")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []
let mouse = {x:0,y:0}
let wormholes = []

window.addEventListener("mousemove",e=>{
mouse.x = e.clientX
mouse.y = e.clientY
})

class Particle{

constructor(){

this.x = Math.random()*canvas.width
this.y = Math.random()*canvas.height

this.vx = (Math.random()-0.5)*2
this.vy = (Math.random()-0.5)*2

this.size = Math.random()*2+1
this.depth = Math.random()*5

}

draw(){

ctx.beginPath()
ctx.arc(this.x,this.y,this.size,0,Math.PI*2)

ctx.fillStyle = "rgba(0,255,255,0.8)"
ctx.fill()

}

update(){

this.x += this.vx
this.y += this.vy

// cursor gravity
let dx = mouse.x - this.x
let dy = mouse.y - this.y
let dist = Math.sqrt(dx*dx+dy*dy)

if(dist < 200){
this.vx += dx*0.0007
this.vy += dy*0.0007
}

// wormhole gravity
wormholes.forEach(w=>{

let wx = w.x - this.x
let wy = w.y - this.y

let wdist = Math.sqrt(wx*wx+wy*wy)

if(wdist < 400){

this.vx += wx*0.001
this.vy += wy*0.001

}

})

this.vx *= 0.99
this.vy *= 0.99

this.draw()

}

}

function init(){

particles=[]

for(let i=0;i<250;i++){
particles.push(new Particle())
}

}

init()

function connect(){

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx = particles[a].x - particles[b].x
let dy = particles[a].y - particles[b].y

let dist = Math.sqrt(dx*dx+dy*dy)

if(dist < 120){

ctx.strokeStyle="rgba(0,255,255,0.15)"
ctx.lineWidth=1

ctx.beginPath()
ctx.moveTo(particles[a].x,particles[a].y)
ctx.lineTo(particles[b].x,particles[b].y)
ctx.stroke()

}

}

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>p.update())

connect()

requestAnimationFrame(animate)

}

animate()

// wormhole creation

window.addEventListener("click",e=>{

let hole = {
x:e.clientX,
y:e.clientY
}

wormholes.push(hole)

let visual = document.createElement("div")
visual.className="wormholeFX"

visual.style.left = (e.clientX-125)+"px"
visual.style.top = (e.clientY-125)+"px"

document.body.appendChild(visual)

setTimeout(()=>{
visual.remove()
wormholes.shift()
},3500)

})

// resize

window.addEventListener("resize",()=>{
canvas.width = window.innerWidth
canvas.height = window.innerHeight
init()
})
