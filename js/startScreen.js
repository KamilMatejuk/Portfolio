// wzorki na ekranie startowym
let canvas;
let endOfPaths = -200;
let arrowXmin, arrowXmax, arrowYmin, arrowYmax; // połozenia strzałki do klikania
let xL, yL; // połozenia strzałki
let lineWeight;
let lineX, lineY; // randomowa biała linia


function setup(){
    lineWeight = map(windowWidth, 0, 1920, 1, 3)

    canvas = createCanvas(windowWidth, 3*windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1')
    // background(0)
    translate(windowWidth/2, 0)
    drawCPU(0.6*windowHeight, 0.12*windowHeight)

    // przesunięcie kolejnej sekcji pod rysunki
    let section1 = document.getElementsByClassName('part1')[0]
    let section2 = document.getElementsByClassName('part2')[0]
    section2.style.marginTop = (endOfPaths - section1.scrollHeight + 100) + 'px'
    noLoop()
}

function draw(){
    if(windowWidth < 768){
        noLoop()
    } else {
        translate(windowWidth/2, 0)
        if(arrowXmin < mouseX && mouseX < arrowXmax 
            && arrowYmin < mouseY && mouseY < arrowYmax){
            drawArrow(5)
        } else {
            drawArrow(3)
        }
        translate(-windowWidth/2, 0)
    }
}

function windowResized(){
    resizeCanvas(windowWidth, 3*windowHeight)
    // background(0)
    translate(windowWidth/2, 0)
    drawCPU(0.6*windowHeight, 0.12*windowHeight)
    let section1 = document.getElementsByClassName('part1')[0]
    let section2 = document.getElementsByClassName('part2')[0]
    section2.style.marginTop = (endOfPaths - section1.scrollHeight + 100) + 'px'
    lineWeight = map(windowWidth, 0, 1920, 1, 3)
    noLoop()
}

function mouseClicked(){
    if(arrowXmin < mouseX && mouseX < arrowXmax){
        if(arrowYmin < mouseY && mouseY < arrowYmax){
            let section2 = document.getElementsByClassName('part2')[0]
            section2.scrollBehavior = 'smooth'
            section2.scrollIntoView({behavior: 'smooth' })
        }
    }
}

function drawArrow(w){
    stroke(0)
    strokeWeight(5*lineWeight)
    line(1.1*xL, yL+50, 0, yL+100)
    line(-1.1*xL, yL+50, 0, yL+100)
    stroke(255)
    strokeWeight(w*lineWeight)
    line(1.1*xL, yL+50, 0, yL+100)
    line(-1.1*xL, yL+50, 0, yL+100)
}

function drawCPU(posY, size){
    cr = 0.05 * size // corner radius
    noStroke()
    rect(-size/2, posY-size/2, size, size, cr, cr, cr, cr)
    // zewnętrzne styki
    stroke(255)
    stykiSizeBig = 0.15 * size
    stykiSizeSmall = 0.05 * size
    stroke(50)
    positions = drawStyki(1.5, 3*stykiSizeBig, posY, size, 6)
    stroke(255)
    drawStyki(5, stykiSizeSmall, posY, size, 6)
    drawStyki(2.5, stykiSizeBig, posY, size, 6)
    
    // wewnętrzne wzory
    drawInsidePattern(posY, size)
    // wychodzące kreski
    stroke(50)
    strokeWeight(1.5*lineWeight)
    let arrowStart = []
    for(let i=0; i<positions.length; i++){
        x = positions[i][0]
        y = positions[i][1]
        let scale = windowWidth/7
        let newY = y+15*(3-Math.abs(i - (positions.length-1)/2))
        line(x, y, x, newY)
        newX = -windowWidth/2 + scale*(i+1)
        line(x, newY, newX, newY+50)
        if(i == 2){
            arrowStart.push([x+0.6*(newX-x), newY+0.6*50])
        }
        generateRandomLine(newX, newY+50, 20, 45, 180)
    }
    // strzałka dalej
    xL = arrowStart[0][0]
    yL = arrowStart[0][1]
    stroke(50)
    line(xL, yL, 0.25*xL, yL+20)
    line(-xL, yL, -0.25*xL, yL+20)
    line(0.25*xL, yL+20, 0.25*xL, yL+50)
    line(-0.25*xL, yL+20, -0.25*xL, yL+50)
    line(0.25*xL, yL+50, 1.1*xL, yL+50)
    line(-0.25*xL, yL+50, -1.1*xL, yL+50)
    stroke(255)
    drawArrow(3*lineWeight)
    arrowXmin = windowWidth/2 + 1.1*xL
    arrowXmax = windowWidth/2 - 1.1*xL
    arrowYmin = yL+50
    arrowYmax = yL+100
}

function drawStyki(weight, s, posY, size, number){
    strokeWeight(weight*lineWeight)
    d = size / number
    endpositions = []
    for(let i=1; i<=number; i++){
        // horizontal (left, right)
        x = size/2
        y = posY-size/2+i*d-d/2
        line(x, y,x+s, y)
        line(-x, y, -x-s, y)
        // vertical (top, bottom)
        x = -size/2+i*d-d/2
        line(x, posY-size/2, x, posY-size/2-s)
        line(x, posY+size/2, x, posY+size/2+s)
        endpositions.push([x, posY+size/2+s])
    }
    return endpositions
}

function drawInsidePattern(posY, size){
    translate(-size/2+0.05*size, posY-size/2+0.05*size)
    stroke(0)
    maxi = 0.9*size
    strokeWeight(2*lineWeight)
    // line
    line(maxi, maxi/5, 0.7*maxi, maxi/5)
    line(0.7*maxi, maxi/5, 0.6*maxi, maxi/10)
    line(0.6*maxi, maxi/10, 0.6*maxi, 0)
    // line
    line(maxi, 2*maxi/5, 0.8*maxi, 2*maxi/5)
    line(0.8*maxi, 2*maxi/5, 0.7*maxi, 0.5*maxi)
    ellipse(0.7*maxi, 0.5*maxi, 4, 4)
    // line
    line(maxi, 3.7*maxi/5, 0.8*maxi, 3.7*maxi/5)
    line(0.7*maxi, maxi, 0.7*maxi, 4.2*maxi/5)
    line(0.8*maxi, 3.7*maxi/5, 0.7*maxi, 4.2*maxi/5)
    // line
    line(maxi/5, 0, maxi/5, maxi/8)
    line(maxi/5, maxi/8, maxi/4, maxi/5)
    ellipse(maxi/4, maxi/5, 4, 4)
    // line
    line(0, 4.2*maxi/5, 0.2*maxi, 4.2*maxi/5)
    line(0.2*maxi, 4.2*maxi/5, 0.25*maxi, 4.5*maxi/5)
    line(0.25*maxi, 4.5*maxi/5, 0.25*maxi, maxi)
    // line
    line(0.45*maxi, 4.2*maxi/5, 0.3*maxi, 3.2*maxi/5)
    line(0.45*maxi, 4.2*maxi/5, 0.45*maxi, maxi)
    ellipse(0.3*maxi, 3.2*maxi/5, 3, 3)
    //line
    line(0, 2.2*maxi/5, 1.6*maxi/5, 2.2*maxi/5)
    line(1.6*maxi/5, 2.2*maxi/5, 2*maxi/5, 1.8*maxi/5)
    ellipse(2*maxi/5, 1.8*maxi/5, 4, 4)

    // translate back
    translate(size/2-0.05*size, -posY+size/2-0.05*size)
}

function generateRandomLine(x, y, length, prevangle, angle){
    if(length > 0){
        const l = 25 + Math.random()*([0,90,180,270].includes(prevangle) ? min(windowWidth, windowHeight)/15 : min(windowWidth, windowHeight)/8)
        // const l = min(windowWidth, windowHeight)/10
        const newX = x + l*Math.sin(map(angle, 0, 360, 0, TWO_PI))
        const newY = y - l*Math.cos(map(angle, 0, 360, 0, TWO_PI))
        line(x, y, newX, newY)

        if(newY-200 > endOfPaths){
            endOfPaths = newY-200
        }
        
        let angles = [-30, 30]
        let prob = map(length, 1, 20, 0.3, 0.7)
        if([0,90,180,270].includes(prevangle)){
            // wyrównanie do ogólnego kierunku
            generateRandomLine(newX, newY, length-1, angle, prevangle)
        } else if(Math.random() > prob){
            // odejście od kierunku
            a = angle + angles[Math.floor(Math.random()*angles.length)]
            generateRandomLine(newX, newY, length-1, angle, a)
        } else {
            // odejście od kierunku na obie strony
            generateRandomLine(newX, newY, length-1, angle, angle+30)
            generateRandomLine(newX, newY, length-1, angle, angle-30)
        }
    }
}