export class Piece {
    constructor() {
        this.PIECES = [];
        this.piece = null;
    }

    async loadPieces() {
        try {
            const response = await fetch('./manejo-archivos/ttris_modules/piezas.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            this.PIECES = this.ClearPieces(text);
            this.piece = this.GetPiece();
            console.log("Piezas cargadas correctamente:", this.PIECES);
        } catch (error) {
            console.error('Error loading pieces:', error);
            // Inicializamos con piezas por defecto si hay error
            this.PIECES = [
                [[[0,0],[1,0],[0,1],[1,1]]], // Cube
                [[[0,0],[0,1],[0,2],[0,3]], [[0,0],[1,0],[2,0],[3,0]]], // I
                [[[0,0],[1,0],[1,1],[2,1]], [[0,0],[0,1],[1,0],[1,-1]]], // Z
                [[[0,0],[0,1],[1,1],[1,2]], [[0,0],[2,-1],[1,0],[1,-1]]], // S
                [[[0,0],[0,1],[0,2],[1,2]], [[0,0],[0,1],[1,0],[2,0]], [ [0,0],[1,0],[1,1],[1,2] ] , [ [0,0],[1,0],[2,0],[2,-1] ] ], // L
                [[[0,0],[1,0],[2,0],[2,1]], [[0,0],[1,-2],[1,-1],[1,0]], [   [0,0],[0,1],[1,1],[2,1]   ] , [    [0,0],[0,1],[0,2],[1,0]    ]  ], // -L
                [[[0,0],[1,0],[2,0],[1,1]], [[0,0],[1,-1],[1,0],[1,1]],     [    [0,0],[1,-1],[1,0],[2,0]   ], [    [0,0],[0,1],[0,2],[1,1]    ]] // T

            ];
        }
    }

    ClearPieces(text) {
        const lines = text.split("\n");
        var pieces_Cleaned = [];
        
        for (let line of lines) {
            let Block_of_piece = line.trim();
            if (!Block_of_piece) continue; 
            
            let rotations = Block_of_piece.split(" ").slice(0, -2); 

            for (let i = 0; i < rotations.length; i++) {
                let rot = [];
                rotations[i] = rotations[i].split(";");

                for (let j = 0; j < rotations[i].length; j++) {
                    rotations[i][j] = rotations[i][j].split(',');
                    rotations[i][j] = [parseInt(rotations[i][j][0]), parseInt(rotations[i][j][1])];
                    
                    rot.push(rotations[i]);
                }
            }
            pieces_Cleaned.push(rotations);
        }
        return pieces_Cleaned;
    }

    GetPiece() {
        if (!this.PIECES.length) return null;
        const PieceBlock = Math.floor(Math.random() * this.PIECES.length);
        const RotationOfPiece = Math.floor(Math.random() * this.PIECES[PieceBlock].length);
        return this.PIECES[PieceBlock][RotationOfPiece].slice();
    }

    rotate(piece){
        
        var rotated = []
        for (let piec of this.PIECES) {
            for (let rot = 0; rot < piec.length; rot++) {
                if (JSON.stringify(piece)===JSON.stringify(piec[rot])) {
                    try{    
                        rotated = JSON.parse(JSON.stringify(piec[rot+1]));
                    }catch{
                        rotated = JSON.parse(JSON.stringify(piec[0]));
                    }
                }   
            }
        }
        return rotated;
    }
    down(piece) { 
        // Modificamos cada coordenada y retornamos la pieza modificada
        let NewPiece = JSON.parse(JSON.stringify(game[1]));
        NewPiece.forEach(coords => {
            coords[1] += 1;  // Sumamos para mover hacia abajo
        });
        return NewPiece;
    }
    //=======================================================================
    left(game) {
        let NewPiece = JSON.parse(JSON.stringify(game[1]));
        NewPiece.forEach(coords => {
            coords[0] -= 1;
        });
        return NewPiece;
    }
    //=======================================================================
    right(game) {
        let NewPiece = JSON.parse(JSON.stringify(game[1]));
        NewPiece.forEach(coords => {
            coords[0] += 1;
        });
        return NewPiece;
    }
    //=======================================================================
    
}