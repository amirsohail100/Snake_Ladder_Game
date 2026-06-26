const de = document.querySelector(".de")
const ply = document.querySelector(".ply")
const button = document.querySelector("button")
const par = document.querySelector("p")

const unit = 7;
const pan1 = [59,45,31,17,3]
const pan2 = [66,52,38,24,10]
const posN = [[42,59],[63,45],[7,38],[21,10],[42,24],[63,3],[7,3]]
const posP = [[21,66],[56,66],[0,52],[49,52],[63,31],[56,17],[0,17]]
const necN = [[42,66],[45,45],[7,59],[0,38],[28,45],[49,17],[35,17],[7,17]]
const necP = [[21,59],[42,38],[7,31],[21,24],[42,17],[49,3],[35,3],[14,3]]


const genCompChoice = ()=>{
    const idx = [0,1,2,3,4,5]
    return idx[Math.floor(Math.random()*6)]
}


let debool = false
let X = 0
let temp = 0
let Y = 66


function XL(X,unit,step) {
    if(X < 63){
        X = X + ((step+1)*unit)
    }
    return X
}

function XR(X,unit,step) {
    if(X > 0){
        X = X - ((step+1)*unit)
    }
    return X
}

function YR(Y,X,unit) {
    if(X === 63){
        Y = Y - unit
    }
    return Y
}

function YL(Y,X,unit) {
    if(X === 0){
        Y = Y - unit
    }
    return Y
}

function xOldL(X) {
    let d = X - 63
    return 63-(d-unit)
}
function xOldR(X) {
    let d = X * -1
    return 0+(d-unit)
}



de.addEventListener("click",()=>{
    let step = genCompChoice()
    if(X === 0 && Y === 66){
        if(step === 5){
            debool = true
            step = -1
        }
        
    }
    const arr = ["de1.jpg","de2.jpg","de3.jpg","de4.jpg","de5.jpg","de6.jpg"];
    de.src = arr[step];

    if(debool){

        if(step !== 5){
            de.style.pointerEvents = "none";
        }
        ply.style.borderColor = "black";
        
        
        
        for(let i=0;i<5;i++){
            let f1 = 0
            let f2 = 0
            if(X === 63 && Y === pan2[i]){
                Y = YR(Y,X,unit)
                f1 = 1
            }else if(X === 0 && Y === pan1[i]){
                Y = YL(Y,X,unit)
                f2 = 1
    
            }
            if(Y === pan1[i]){
                X = XR(X,unit,step-f1)
                if(X < 0){
                    Y = Y - unit
                    X = xOldR(X)
                }
                break
            }
            

            if(Y === pan2[i]){
                X = XL(X,unit,step-f2)
                if(X > 63){
                    Y = Y - unit
                    X = xOldL(X)
                }
                break
            }
        }
    }
    
})

ply.addEventListener("click",()=>{
    if(X > 0 && Y === 3){
        temp = X
    }else if(Y < 3){
        Y = 3
        X = temp
        console.log(temp)
    }else if(X === 0 && Y === 3){
        ply.style.marginLeft = `${X}vmin`;
        ply.style.marginTop = `${Y}vmin`;
        debool = false
        ply.style.borderColor = "yellow";
        de.style.pointerEvents = none;
        ply.style.pointerEvents = none;
        par.innerText = "You Win"

    }
    
    de.style.pointerEvents = "";
    ply.style.borderColor = "white";
    let Xvim = `${X}vmin`
    let Yvim = `${Y}vmin`

    ply.style.marginLeft = Xvim;
    ply.style.marginTop = Yvim;
    for(let i=0;i<posP.length;i++){
        if(X === posP[i][0] && Y === posP[i][1]){
            ply.style.borderColor = "green";
            X = posN[i][0]
            Y = posN[i][1]
            ply.style.marginLeft = `${X}vmin`;
            ply.style.marginTop = `${Y}vmin`;
            
            break;
        }
    }
    for(let i=0;i<necP.length;i++){
        if(X === necP[i][0] && Y === necP[i][1]){
            ply.style.borderColor = "red";
            X = necN[i][0]
            Y = necN[i][1]
            ply.style.marginLeft = `${X}vmin`;
            ply.style.marginTop = `${Y}vmin`;
            
            break;
        }
    }
})

button.addEventListener("click",()=>{
    X = 0
    Y = 66
    debool = false
    ply.style.borderColor = "white";
    de.style.pointerEvents = "";
    de.src = "de6.jpg";
    ply.style.marginLeft = `${X}vmin`;
    ply.style.marginTop = `${Y}vmin`;
})