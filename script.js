var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d");
var pts= 0
var pts2 =0
var game = true

var jogador1 = {
    x: 70,
    y: 720/2 -100,
    tx:  25,
    ty:200,
    dir: 0
}

var jogador2={
    x: 1189,
    y: 720/2 -15,
    tx: 25,
    ty: 200,
    dir: 0
   
}

var ball = {
    x: 1280/2 -15,
    y:  720/2 -15,
    tx:  30,
    ty:30,
    dir: 8,
    diry: 2
}



function draw(){

    context.fillRect(jogador1.x, jogador1.y, jogador1.tx, jogador1.ty)
    context.fillRect(ball.x, ball.y, ball.tx,ball.ty)
    context.fillRect(jogador2.x, jogador2.y, jogador2.tx, jogador2.ty )
    context.font="30px Arial"
    context.fillText("Jogador 1, Score: "+pts, 260,80)
    context.fillText("W, S play", 340,113)
    context.fillText("Jogador 2, Score: "+pts2, 760,80)
    context.fillText("5, 2 play ", 840,113)
}

function move_ball(){
    ball.x += ball.dir
    ball.y += ball.diry


    if(ball.y < 30){
        ball.diry *= -1
    }else if( ball.y > 690){
        ball.diry *= -1
    }
 

}

document.addEventListener("keydown", function(e){
    if(e.keyCode == 87){
        jogador1.dir = -8
    }else if(e.keyCode == 83){
        jogador1.dir = 8
    }
})

document.addEventListener("keyup", function(e){
    if(e.keyCode == 87){
        jogador1.dir = 0
    }else if(e.keyCode == 83){
        jogador1.dir = 0
    }
})

document.addEventListener("keydown", function(e){
    if(e.keyCode == 101){
        jogador2.dir = -8
    }else if(e.keyCode == 98){
        jogador2.dir = 8
    }
})

document.addEventListener("keyup", function(e){
    if(e.keyCode == 101){
        jogador2.dir = 0
    }else if(e.keyCode == 98){
        jogador2.dir = 0
    }
})

function collision(){
    if(ball.y + ball.ty >= jogador2.y && ball.y <= jogador2.y + jogador2.ty && ball.x >= jogador2.x - jogador2.tx && ball.x >= jogador2.x - jogador2.tx){
        ball.dir*=-1
    }else if(ball.y + ball.ty >= jogador1.y && ball.y <= jogador1.y + jogador1.ty && ball.x <= jogador1.x + jogador1.tx && ball.x >= jogador1.x - jogador1.tx){
        ball.dir*=-1
    }
}

function move_player1(e){
    jogador1.y += jogador1.dir
    

    if(jogador1.y <0){
        jogador1.y =0
    }else if(jogador1.y > 520){
        jogador1.y = 520
    }
}

function move_player2(e){
    jogador2.y += jogador2.dir

    if(jogador2.y <0){
        jogador2.y =0
    }else if(jogador2.y >520){
        jogador2.y= 520
    }


}

function victory_game(){

    if(ball.x < -20){
        ball.x = 1280/2 -15
        ball.y =  720/2 -15
        ball.dir*=-1
        pts2++
       

    }else if(ball.x > 1230){
        ball.x = 1280/2 - 15
        ball.y = 720/2 -15
        ball.dir*= -1
        pts++
    }

}


function main(){
    if(game == true){
    context.clearRect(0,0,1280,720)
    draw()
    move_ball()
    collision()
    move_player1()
    victory_game()
    move_player2()
    if(pts == 2 || pts2 ==2){
        context.clearRect(0,0,1280,720)
     
       game = false
      
        context.fillText("Click for play again", 1280/2 -120, 550)
        
        document.addEventListener("click", function(){
         game = true
        pts = 0
        pts2=0
         main()
        
        })
    }

 
    }else{
        draw()
    }
}

main()

setInterval(main, 15)
