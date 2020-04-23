// wzorki na ekranie startowym
let canvas;
let lineWeight;

function setup() {
	lineWeight = map(windowWidth, 0, 1920, 1, 3);

	canvas = createCanvas(windowWidth, 2 * windowHeight);
	canvas.position(0, 0);
	canvas.style("z-index", "-1");
	// background(0)
	translate(windowWidth / 2, 0);
	drawCPU(0.6 * windowHeight, 0.12 * windowHeight);
}

function windowResized() {
	resizeCanvas(windowWidth, 2 * windowHeight);
	// background(0)
	translate(windowWidth / 2, 0);
	drawCPU(0.6 * windowHeight, 0.12 * windowHeight);
}

function drawCPU(posY, size) {
	cr = 0.05 * size; // corner radius
	noStroke();
	rect(-size / 2, posY - size / 2, size, size, cr, cr, cr, cr);
	// zewnętrzne styki
	stroke(255);
	stykiSizeBig = 0.15 * size;
	stykiSizeSmall = 0.05 * size;
	stroke(50);
	positions = drawStyki(1.5, 3 * stykiSizeBig, posY, size, 6);
	stroke(255);
	drawStyki(5, stykiSizeSmall, posY, size, 6);
	drawStyki(2.5, stykiSizeBig, posY, size, 6);
	// wewnętrzne wzory
	drawInsidePattern(posY, size);
}

function drawStyki(weight, s, posY, size, number) {
	strokeWeight(weight * lineWeight);
	d = size / number;
	endpositions = [];
	for (let i = 1; i <= number; i++) {
		// horizontal (left, right)
		x = size / 2;
		y = posY - size / 2 + i * d - d / 2;
		line(x, y, x + s, y);
		line(-x, y, -x - s, y);
		// vertical (top, bottom)
		x = -size / 2 + i * d - d / 2;
		line(x, posY - size / 2, x, posY - size / 2 - s);
		line(x, posY + size / 2, x, posY + size / 2 + s);
		endpositions.push([x, posY + size / 2 + s]);
	}
	return endpositions;
}

function drawInsidePattern(posY, size) {
	translate(-size / 2 + 0.05 * size, posY - size / 2 + 0.05 * size);
	stroke(0);
	maxi = 0.9 * size;
	strokeWeight(2 * lineWeight);
	// line
	line(maxi, maxi / 5, 0.7 * maxi, maxi / 5);
	line(0.7 * maxi, maxi / 5, 0.6 * maxi, maxi / 10);
	line(0.6 * maxi, maxi / 10, 0.6 * maxi, 0);
	// line
	line(maxi, (2 * maxi) / 5, 0.8 * maxi, (2 * maxi) / 5);
	line(0.8 * maxi, (2 * maxi) / 5, 0.7 * maxi, 0.5 * maxi);
	ellipse(0.7 * maxi, 0.5 * maxi, 4, 4);
	// line
	line(maxi, (3.7 * maxi) / 5, 0.8 * maxi, (3.7 * maxi) / 5);
	line(0.7 * maxi, maxi, 0.7 * maxi, (4.2 * maxi) / 5);
	line(0.8 * maxi, (3.7 * maxi) / 5, 0.7 * maxi, (4.2 * maxi) / 5);
	// line
	line(maxi / 5, 0, maxi / 5, maxi / 8);
	line(maxi / 5, maxi / 8, maxi / 4, maxi / 5);
	ellipse(maxi / 4, maxi / 5, 4, 4);
	// line
	line(0, (4.2 * maxi) / 5, 0.2 * maxi, (4.2 * maxi) / 5);
	line(0.2 * maxi, (4.2 * maxi) / 5, 0.25 * maxi, (4.5 * maxi) / 5);
	line(0.25 * maxi, (4.5 * maxi) / 5, 0.25 * maxi, maxi);
	// line
	line(0.45 * maxi, (4.2 * maxi) / 5, 0.3 * maxi, (3.2 * maxi) / 5);
	line(0.45 * maxi, (4.2 * maxi) / 5, 0.45 * maxi, maxi);
	ellipse(0.3 * maxi, (3.2 * maxi) / 5, 3, 3);
	//line
	line(0, (2.2 * maxi) / 5, (1.6 * maxi) / 5, (2.2 * maxi) / 5);
	line((1.6 * maxi) / 5, (2.2 * maxi) / 5, (2 * maxi) / 5, (1.8 * maxi) / 5);
	ellipse((2 * maxi) / 5, (1.8 * maxi) / 5, 4, 4);

	// translate back
	translate(size / 2 - 0.05 * size, -posY + size / 2 - 0.05 * size);
}

function drawMainLine(x, y) {
	stroke(255);
	strokeWeight(1.5 * lineWeight);
	line(x, y - 25, x, y + 25);
	translate(-windowWidth / 2, 0);

	prevX = x + windowWidth / 2;
	prevY = y + 25;
	let images = document.getElementsByClassName("anchor");
	for (let i = 0; i < images.length; i++) {
		let r = images[i].getBoundingClientRect()
		console.log(r)
	}
}

function getOffset( el ) {
    var _x = 0;
	var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
