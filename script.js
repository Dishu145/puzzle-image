const pieces = [];
        const positions = [];
        let selectedPiece = null;

        function initializePuzzle() {
            const puzzleBoard = document.getElementById('puzzleBoard');
            const imageUrl = 'https://picsum.photos/300/300';

            for (let i = 0; i < 9; i++) {
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece';
                piece.dataset.index = i;
                
                const x = -(i % 3) * 100;
                const y = -Math.floor(i / 3) * 100;
                piece.style.backgroundImage = `url(${imageUrl})`;
                piece.style.backgroundPosition = `${x}px ${y}px`;
                
                piece.addEventListener('click', handlePieceClick);
                puzzleBoard.appendChild(piece);
                pieces.push(piece);
                positions.push(i);
            }
        }

        function handlePieceClick(event) {
            const piece = event.target;
            
            if (selectedPiece === null) {
                selectedPiece = piece;
                piece.style.border = '2px solid red';
            } else {
                
                const temp = selectedPiece.style.backgroundPosition;
                selectedPiece.style.backgroundPosition = piece.style.backgroundPosition;
                piece.style.backgroundPosition = temp;
                
                const tempIndex = selectedPiece.dataset.index;
                selectedPiece.dataset.index = piece.dataset.index;
                piece.dataset.index = tempIndex;
                
                selectedPiece.style.border = '1px solid #999';
                selectedPiece = null;
                
                checkWin();
            }
        }

        function shufflePieces() {
            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = pieces[i].style.backgroundPosition;
                pieces[i].style.backgroundPosition = pieces[j].style.backgroundPosition;
                pieces[j].style.backgroundPosition = temp;
                
                const tempIndex = pieces[i].dataset.index;
                pieces[i].dataset.index = pieces[j].dataset.index;
                pieces[j].dataset.index = tempIndex;
            }
            document.getElementById('message').textContent = '';
        }

        function checkWin() {
            const isWin = pieces.every(piece => 
                piece.dataset.index === piece.style.backgroundPosition.match(/-?\d+/g)[0] / -100 + 
                (3 * Math.floor(piece.style.backgroundPosition.match(/-?\d+/g)[1] / -100)));
            
            if (isWin) {
                document.getElementById('message').textContent = 'Congratulations! You solved the puzzle!';
            }
        }

        
        window.onload = initializePuzzle;