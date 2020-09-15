document.addEventListener("keydown", function(evento){
    if(evento.keyCode == 32){
        console.log ("salta");
        if(nivel.muerto == false){
        saltar();
        }else{
            nivel.velocidad=7;
            nube.velocidad=3;
            nivel.muerto=false;
            cactus.x = ancho;
            nube.x = ancho;
            nivel.puntuacion = 0;
        }
    }
    
});



// ESTA VARIABLE ES IMPORTANTE TREXPOR QUE ESTE ARRAY VA TENER DIFERENTES VALORES
// QUE ME VAN A DECIR DONDE ESTA EL TREX Y LA VELOCIDAD Y Y ETC
var trex = {
    y: 200,
    // LA VELOCIDAD DE Y , OSEA CUANTA VELOCIADD INICIAL TIENE EN FORMA VERICAL,OSEA 
    // NADA POR QUE SINO VIVIRIA ELEVANDOSE
    vy:0,
    // GRAVEDAD SERIA CUANTO LE VOY A IR RESTANDO CUANDO SALTE OSEA SUBE 28 DESP 28-2=26 ,
    // DESPUES 26-2= 24 , Y ASI 22 20 18 ... HASTA HACERSER NEGATIVO Y BAJAR
    gravedad:2,
    salto:24,
    vymax:9,
    saltando: false,
}
var suelo = 200;

function saltar(){
    trex.saltando = true;
    trex.vy = trex.salto;
};

function gravedad(){
    if (trex.saltando == true){
        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }else{
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }
        
    }
};













// VARIABLES VARIAS Q VOY A UTILIZAR A LO LARGO DE JS
const ancho = 700;
const alto = 300;

var canvas,ctx;







// ACA CREE VARIABLES PARA PONERLES UNA IMAGEN ADENTRO , PRIMERO CREO Q LA VARIABLE 
// ES IGUAL A UNA IMAGEN Y DESPUES LA RELLENO CON EL URL O LA LOCACION EN LOCAL DONDE
// TENGA LA IMAGEN ESA

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes(){
    imgRex = new Image();
    imgRex.src = "imgRex.png";

    imgNube = new Image();
    imgNube.src = "imgNube.png";

    imgCactus = new Image();
    imgCactus.src = "imgCactus.png";
    
    imgSuelo = new Image();
    imgSuelo.src = "imgSuelo.png";
}


// ES IMPORTANTE QUE PONGA EN LA POCIOON Y QUE LO QUIERO POR trex.Y ASI LLLAMO AL OBJETO
// Y SE PONE CON LOS 250 Q PUSE AHI ARRIBA 
function dibujaRex(){
    ctx.drawImage(imgRex,0,0,166,184,100,trex.y,60,65)
}



// ------------------------------------------------------------------------------------


var nivel = {
    velocidad:7,
    puntuacion: 0,
    muerto:false,
}

var cactus = {
    x: 300,
    y: suelo-5,
}

function dibujarCactus(){
    ctx.drawImage(imgCactus,0,0,104,157,cactus.x,cactus.y,60,70)
}

function logicaCactus(){
    if(cactus.x < 0){
        cactus.x = cactus.x + 700;
        nivel.puntuacion++;
    }else{
        cactus.x -= nivel.velocidad;
    }    
}





// -----------------------------------------------------------------------------

var nube = {
    x:350,
    y:50,
    velocidad: 3
}


function dibujarNubeUno(){
    ctx.drawImage(imgNube,0,0,167,65,nube.x,nube.y,60,40)
}
function dibujarNubeDos(){
    ctx.drawImage(imgNube,0,0,167,65,nube.x+50,nube.y-10,40,20)
}

function dibujarNube(){
    dibujarNubeUno();
    dibujarNubeDos();
}

function logicaNube(){
    if(nube.x < 0){
        nube.x = nube.x + 700;
    }else{
        nube.x -= nube.velocidad ;
    };
};



// ---------------------------------------------------------------------------------

var sueloGrafico = {
    x:0,
    y:261,
};

function dibujarSuelo(){
    ctx.drawImage(imgSuelo,sueloGrafico.x,0,700,30,0,sueloGrafico.y,700,30)
};

function logicaSuelo(){
    if(sueloGrafico.x > 700){
        sueloGrafico.x = 0;
    }else{
        sueloGrafico.x += nivel.velocidad;
    };
};


// ---------------------------------------------------------------------------------
function colision(){
    if (cactus.x >= 100 && cactus.x <= 150){
        if(trex.y >= suelo){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }else{}
}









function inicializa(){
    canvas = document.querySelector("#canvas")
    ctx = canvas.getContext("2d");
    cargaImagenes()
}

// -------------------------------------------------------------------------------------


function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = "#555555";
    ctx.fillText(`${nivel.puntuacion}`,600,50);

    if(nivel.muerto == true){
        ctx.font = '60px impact';
        ctx.fillText(`GAME OVER`, 240,150);
    }
}









// --------------------------------------------------------------------------------------

// BUCLE PRINCIPAL
const FPS = 40;
setInterval(function(){
    principal();
},1000/FPS);






// CADA BUCLE Q SE CUMPLA , DESPUES HAY Q IR BORRANDO EL CANVAS PARA Q LAS IMAGENES 
// VUELVAN A TENER UNA NUEVA LOCACION Y NO SE QUEDEN TODAS JUNTAS POR ESO BUBLE BORRAR 
// BUCLE BORRA BUCLE BORRAR
// SIEMPRE PARA BORRAR LO MAS FACIL ES CAMBIARLE EL ANCHO Y EL ALTO ASI DESAPARECE TODO
function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}






// ACA TIENE Q IR TODO EL JUEGO POR Q LO Q PUSE EN EL BUBLE ANTERIOR VA A HACER 
// QUE ESTA FUNCION PRINCIPAL SE EJECUTE 10 VECES CADA 1 SEGUNDO O 1000 MILISEGNDOS

function principal(){
    borraCanvas();
    dibujarSuelo();
    dibujarCactus();
    dibujaRex();
    inicializa();
    gravedad();
    logicaCactus();
    dibujarNube();
    logicaNube();
    logicaSuelo();
    colision();
    puntuacion();
};








