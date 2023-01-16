const play = document.querySelector('.play');
const playerTurn = document.querySelector('.player-turn-h1');
const containerItems = document.querySelectorAll('.container-item');
let turn = 'X';
let cnt = 9;
let vis = new Array(9).fill(0);
let vischar = new Array(9).fill(null);
const cut = (x,y,z) => {
    document.querySelector(`.grid${x+1}`).style.color = "green";
    document.querySelector(`.grid${y+1}`).style.color = "green";
    document.querySelector(`.grid${z+1}`).style.color = "green"; 
}
const win = (turn,index) => {
    if(index+2<9 && vischar[index]===turn && vischar[index+1]===turn && vischar[index+2]===turn){
        cut(index,index+1,index+2);
        return true;
    }else if(index+6<9 && vischar[index]===turn && vischar[index+3]===turn && vischar[index+6]===turn){
        cut(index,index+3,index+6);
        return true;
    }else if(index+8<9 && index===0 && vischar[index]===turn && vischar[index+4]===turn && vischar[index+8]===turn){
        cut(index,index+4,index+8);
        return true;
    }else if(index-1>=0 && index+1<9 && vischar[index]===turn && vischar[index-1]===turn && vischar[index+1]===turn){
        cut(index,index-1,index+1);
        return true;
    }else if(index-2>=0 && vischar[index]===turn && vischar[index-1]===turn && vischar[index-2]===turn){
        cut(index,index-1,index-2);
        return true;
    }else if(index-3>=0 && index+3<9 && vischar[index]===turn && vischar[index-3]===turn && vischar[index+3]===turn){
        cut(index,index-3,index+3);
        return true;
    }else if(index-2>=0 && index+2<9 && vischar[index]===turn && vischar[index-2]===turn && vischar[index+2]===turn){
        cut(index,index-2,index+2);
        return true;
    }else if(index-4>=0 && index+4<9 && vischar[index]===turn && vischar[index-4]===turn && vischar[index+4]===turn){
        cut(index,index-4,index+4);
        return true;
    }else if(index-6>=0 && index-3>=0 && vischar[index]===turn && vischar[index-3]===turn && vischar[index-6]===turn){
        cut(index,index-3,index-6);
        return true;
    }else if(index+2<9 && index+4<9 && index===2 && vischar[index]===turn && vischar[index+2]===turn && vischar[index+4]===turn){
        cut(index,index+2,index+4);
        return true;
    }else if(index-2>=0 && index-4>=0 && index===6 && vischar[index]===turn && vischar[index-2]===turn && vischar[index-4]===turn){
        cut(index,index-2,index-4);
        return true;
    }else if(index-4>=0 && index-8>=0 && index===8 && vischar[index]===turn && vischar[index-4]===turn && vischar[index-8]===turn){
        cut(index,index-4,index-8);
        return true;
    }
    return false;
}
// const allVisited = (vis) => {
//     for(let i=0;i<9;++i){
//         if(vis[i]===0){
//             return false;
//         }
//     }
//     return true;
// }
play.addEventListener('click' , () => {
    // console.log(allVisited(vis));
    play.classList.add("hide");
    playerTurn.classList.add("blink");
    for(let i=0;i<containerItems.length;++i) {
        let grid = `grid${i+1}`;
        if(cnt==0 || win('X',i)===true || win('O',i)===true){
            if(win('X',i)){
                playerTurn.innerText = `X's Win`;
            }else if(win('O',i)){
                playerTurn.innerText = `O's Win`;
            }else{
                playerTurn.innerText = 'Draw';
            }
            play.classList.remove("hide");
            playerTurn.classList.remove("blink");
            document.querySelector('.play-btn').innerText = "Retry"
            document.querySelector('.play').addEventListener('click' ,() => {
                window.location.reload()
            })
            return;
        }
        document.querySelector(`.${grid}`).addEventListener('click' ,() => {
            if(vis[i]===0){
                playerTurn.innerText = `${turn==='X'?'O':'X'}'s turn`;
                document.querySelector(`.${grid}`).innerText = `${turn}`;
                vis[i] = 1;
                vischar[i] = turn;
                if(turn==='X')
                    turn = 'O';
                else
                    turn = 'X';
                cnt--;
                if(cnt==0 || win('X',i)===true || win('O',i)===true){
                    if(win('X',i)){
                        playerTurn.innerText = `X's Win`;
                    }else if(win('O',i)){
                        playerTurn.innerText = `O's Win`;
                    }else{
                        playerTurn.innerText = 'Draw';
                    }
                    play.classList.remove("hide");
                    playerTurn.classList.remove("blink");
                    document.querySelector('.play-btn').innerText = "Retry"
                    document.querySelector('.play').addEventListener('click' ,() => {
                        window.location.reload()
                    })
                    return;
                }
            }else{
                document.querySelector(`.${grid}`).classList.add("no-drop");

            }
        })
    }
})