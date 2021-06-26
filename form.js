class Form{
    constructor(){
        this.start = createButton("START");
        this.help = createButton("HELP");
        this.options = createButton("OPTIONS");
        
        
       
    }
    display(){
        this.start.position(650,250);
        this.help.position(650,300);
        this.options.position(650,350);
        
this.start.mousePressed(()=>{
    this.hide();
    componentG.setVisibleEach(true);
    dark.visible = true;
    ground.visible = true;
});

this.help.mousePressed(()=>{
    this.hide();
});

this.options.mousePressed(()=>{
    this.hide();
});

    }

    hide(){
        this.start.hide();
        this.help.hide();
        this.options.hide();
    }
}