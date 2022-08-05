let buttons = [];
class Button{
    constructor(name, imgs = [], radius, position, callback){
        this.name = name;
        this.imgs = imgs;
        //to handle interactions
        this.radius = radius;
        this.position = position;
        this.callback = callback;
    }
}
class Element{
    constructor(name){
        this.name = name;
    }
}

var exports = {
    DEFAULT_ASSETS_PATH: 'assets/',
    DEFAULT_BUTTON_ASSET: "button.png",
    DEFAULT_BUTTON_HOVER_ASSET: "button_hover.png",
    DEFAULT_BUTTON_CLICK_ASSET: "button_click.png",

    addButton: function(button){
        if(button.imgs.Length === 0){
            buttons.imgs[0] = this.DEFAULT_ASSETS_PATH+this.DEFAULT_BUTTON_ASSET;
            buttons.imgs[1] = this.DEFAULT_ASSETS_PATH+this.DEFAULT_BUTTON_HOVER_ASSET;
            buttons.imgs[2] = this.DEFAULT_ASSETS_PATH+this.DEFAULT_BUTTON_CLICK_ASSET;
        }
        buttons.push(button);
    },
    getButtons: function(){
        return buttons;
    },
    checkButtons: function(){
        buttons.forEach(button =>{
            console.log(button);
        })
    },
    getAsset: function(name){
        return this.DEFAULT_ASSETS_PATH+name;
    }
};

module.exports = {
    Button,
    exports
};