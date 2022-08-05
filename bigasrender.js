const myModule = require('tiny-bigas');

//our main element for the script, its the class that will handle all the button elements in screen
class Button{
    constructor(name, image = [], object, radius, position, callback){
        this.name = name;
        this.image = image;
        this.object = object;
        //to handle interactions
        this.radius = radius;
        this.position = position;
        this.callback = callback;
        let hover = false;
    }
}

//element that will be used for everything else interactability
class Element{
    constructor(name, object, position, images = []){
        this.name = name;
        this.object = object;
        this.position = position;
        this.images = images;
        this.count = 0;
    }
    

    //this will handle the element animation, it will automatically check if the image has more than 1 frame
    canAnimate(){
        return this.images.length > 1;
    }
    //Function to erase the context on this object position
    erase(){
        context.clearRect(this.position.x, this.position.y, this.object.width, this.object.height);
    }
    animate(){
        //we need to use clearrect to make the animation smoother, but its too complex for now
        //context.clearRect(this.position.x, this.position.y, this.object.width, this.object.height);
        this.count++;
        if(this.count >= this.images.length){
            this.count = 0;
        }
        this.object.src = this.images[this.count];
    }
}

//variables
const delay = ms => new Promise(res => setTimeout(res, ms));
const buttons = [];
const elements = [];
let canvas, context;
let debugMode = false;

//array with all the updatefunctions the user can add in the preload
let updateFunctions = [];
let onInitialize = [];

function initialize(){
    addKeyBinds()
    addCanvasBinds()
    onInitialize.forEach(f =>{
        f();
    })
    var b = myModule.exports.getButtons();
    b.forEach(button=>{
        createButton(100,100, button.images, button.position[0], button.position[1], button.callback);
    })
}

//function to check if our click is on an element
function isIntersect(point, element){
    return Math.sqrt(point.x-element.position.x) < element.radius && Math.sqrt(point.y-element.position.y) < element.radius;
}

//function to check if the user is hovering something
function isHovering(){
    let i = 0;
    buttons.forEach(element=>{
        if(element.hover)i = 1;
    })
    return i !== 0
}

//the main method, this will handle the canvas and other initiations
function main(){
    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d')

    //Examples for how to create elements and buttons
    //createElement(myModule.exports.getAsset('chunli0.png'), 500, 300, ['assets/chunli0.png', 'assets/chunli1.png', 'assets/chunli2.png', 'assets/chunli3.png'])
    /*createButton(50,50,'assets/buttonTest.png',0,0, ()=>{
        ipcRenderer.invoke('folder-dialog')
    })
    createButton(50,50,'assets/buttonTest.png',750,0, ()=>{
        myModule.hasAdded = true;
    })*/


    //setting the timer for the update methods
    setInterval(update, 10)
    setInterval(animationThread, 150);
}

//the update method, use this to check for stuff all the time
function update(){
    if(isHovering()){
        document.body.style.cursor = 'pointer';
    }else{
        document.body.style.cursor = 'auto';
    }
    if(debugMode){

    }
    
    updateFunctions.forEach(f =>{
        f();
    });
}


//this will be our animation update method, it needs to be in another function because we'll set it to have more fps
function animationThread(){
    updateElements();
}

//function to handle any keyboard binds
function addKeyBinds(){
    document.addEventListener("keypress", function onEvent(event){
        if(event.key === "e"){
            console.log(myModule.exports.BUTTON_ASSET);
            var b = myModule.exports.getButtons();
            console.log(b);
            b.forEach(button=>{
                console.log(button);
            })
            if(debugMode){
                debugMode = false;
            }else{
                debugMode = true;
            }
        }
    })
}
//function to handle the binds we might need for the canvas i.e click and mousemove
function addCanvasBinds(){
    window.addEventListener('resize', (e)=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(canvas.width + ' ' + canvas.height);
        console.log(window.innerWidth + ' ' + window.innerHeight);
    })
    canvas.addEventListener("click", (e)=>{
        var pos = {
            x: e.offsetX,
            y: e.offsetY
        };
        buttons.forEach(button =>{
            if(isIntersect(pos, button)){
                if(typeof button.callback === 'function'){
                    button.callback();
                }
                button.object.src = button.imgs[2];
                setTimeout(()=>{
                    button.object.src = button.imgs[0];
                }, 100)
            }
        })
    })
    canvas.addEventListener("mousemove", (e)=>{
        var pos = {
            x: e.offsetX,
            y: e.offsetY
        };
        buttons.forEach(button =>{
            if(isIntersect(pos, button)){
                button.hover = true;
                button.object.src = button.imgs[1];
            }else{
                button.hover = false;
                button.object.src = button.imgs[0];
            }
        })
    })
}
//the main function to create a button
function createButton(width,height,src = [],x,y,callback){
    let image = new Image(width,height)
    let pos = {
        x: x,
        y: y
    }
    image.src = src[0]
    image.onload = () => context.drawImage(image, pos.x,pos.y)
    let b = new Button(image.localName, src, image, 8, pos, callback)
    buttons[buttons.length + 1] = b
}

//the main function to create a elemnet
function createElement(src,x,y,imgs){
    let image = new Image(100,100)
    let pos = {
        x: x,
        y: y
    }
    image.src = src
    image.onload = () => context.drawImage(image, pos.x,pos.y)
    let e = new Element(image.localName, image, pos, imgs);
    elements[elements.length + 1] = e
}

//update function to animate the elements
function updateElements(){
    elements.forEach(element =>{
        if(element.canAnimate()){
            element.animate();
        }
    })
}

//function to move an element
function moveElement(element, amount){
    element.erase();
    element.position.x = amount;
}

//main()

//creating the export stuff so we can work with the node module

var exports={
    main,
    initialize
}

module.exports ={
    updateFunctions,
    exports
};