let buttons = [];
class Button{
    constructor(name, radius, position, callback){
        this.name = name;
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
    BUTTON_ASSET: "/test.png",

    addButton: function(button){
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