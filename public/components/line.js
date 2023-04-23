class line{
    // Start and End are coordinates [x1,y1] and [x2,y2]
    constructor(start, end){
        this.line = document.createElement("div");
        this.line.classList.add('wire');
        document.body.appendChild(this.line);

        this.start = start;
        this.end = end;

        // this.element.addEventListener("mousedown", this.onMouseDown.bind(this))

    }

    Draw(){
        //Virtual function
    }

    updateStart(start){
        this.start = start;
    }

    updateEnd(end){
        this.end = end;
    }

    onMouseDown(){
        //Virtual Function
    }


}

class hline extends line{

    Draw(){
        this.line.style.top = `${this.end[1]}px`;
        let delta = this.end[0]-this.start[0];

        if(delta >= 0){        
            this.line.style.left = `${this.start[0]}px`;
        }
        else{
            this.line.style.left = `${this.end[0]}px`;
        }

        this.line.style.width = `${Math.abs(delta)}px`;
        
    }


}

class vline extends line{
    Draw(){
        let delta = this.end[1] - this.start[1]
        this.line.style.height = `${Math.abs(delta)}px`;
        this.line.style.left = `${this.start[0]}px`;


        if(delta <= 0){
            this.line.style.top = `${this.end[1]}px`;
        }
        else{
            this.line.style.top = `${this.start[1]}px`;
        }

    }
}

export {vline, hline}