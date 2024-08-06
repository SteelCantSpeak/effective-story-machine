import * as ASS from 'helpers.js';

class controller{

    assign(object){
        this.object = object;
    }

    // Move As a Vector3
    move(dir){
        currPosition = this.object.getPosition();
        if (dir.length == 3) { 
            this.object.setPosition(
                currPosition[0]+dir[0],
                currPosition[1]+dir[1],
                currPosition[2]+dir[2]
            )  
        } else if (dir.length == 3) {
            this.object.setPosition(
                currPosition[0]+dir[0],
                currPosition[2]+dir[1]
            ) 
        }

    }
}

export { controller};