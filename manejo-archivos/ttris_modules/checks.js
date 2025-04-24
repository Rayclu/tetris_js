const CONSOLIDE = 2;

/*export function CanPieceGoDown(game) {
    console.log(game);
    const grill = game[0]
    
    const flag = game[1].forEach(line => {
       
        line.reduce((cont, value)=>{
            if (value != 0) cont++; 
        })
        if (cont != 0) {
            return true; //this true verify if the piece are into the grill
        }else{
            return false; //this false verify if the piece are into the grill
        }
    });
    if (flag){    
        if (CheckArea(game)) {
                return false;
            }
        return true;

    }else{
        return Error ("The piece is not into the grill");
    }
}
*/
export function CanPieceGoDown(game) {
    
}
export function CheckArea(game, superior = false ,rotate = false, left = false, right = false) {
    const grill = game[0];
    const piece = game[1];

    switch (true) {
        case superior: //Check if the piece can go left.
            for (let coord of piece) {
                if(!coord[0] >= 0) return false;
            }
            
            case left: //Check if the piece can go left.
            for (let coord of piece) {
                const NewX = coord[0]-1;
                const currentY = coord[1];

                if (
                    NewX < 0 || 
                    grill[currentY][NewX] === CONSOLIDE
                ) {
                    return false;
                }
            }
            return true;
            
        case right: //Check if the piece can go right.
            for (let coord of piece) {
                const NewX = coord[0]+1;
                const currentY = coord[1];
                if (
                    NewX >= grill[0].length || 
                    grill[currentY][NewX] === CONSOLIDE
                ) {
                    return false;
                }
            }
            return true;
          
        case rotate: //Check if the piece can rotate.
            for (let coord of piece) {
                const X = coord[0];
                const Y = coord[1];
                if (X < 0 || X >= grill[0].length ||
                    Y < 0 || Y >= grill.length ||
                    grill[Y][X] === CONSOLIDE
                ) {
                    return false;
                }
            }
            return true;

        default: //Default case is down, so we check if the piece can go down.
            try {
                for (let coord of piece) {
                    const x = coord[0];
                    const MyY = coord[1] + 1;

                    if (MyY < grill.length && (grill[MyY][x] === CONSOLIDE || MyY === grill.length - 1)) {
                        return false;
                    }
                }
                return true;
            } catch {
                return false;
            }
    }
}    

export function LineComplete(game) {
    const grill = game[0];
    return {
        isComplete: grill.some(line => line.filter(x => x === CONSOLIDE).length == line.length),
        line: grill.findIndex(line => line.filter(x => x === CONSOLIDE).length == line.length) 
    };
}
