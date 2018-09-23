var rects = []
var sortAlgo = ""
var rectLoopVal = 0
var maxTouchedQuickSortVal
var operations

function setup() {
	let w = $(document).width()
	let h = $(document).height() - 100  
	console.log({w, h})
	createCanvas(w, h)
	fill(255)
	noStroke()
	//frameRate(3)
}

function draw() {
	background(0)
	// draw all rects
	for(var r = 0; r < rects.length; r++) {
		rects[r].render(255)
	}
		
	if (rects.length > rectLoopVal) {
		switch (sortAlgo) {
			case "quick":
				rects[rectLoopVal].render([255, 0, 0])
				quicksort()			
				break
			case "bubble":			
				rects[rectLoopVal].render([255, 0, 0])
				bubblesort()			
				break
			case "gnome":
				rects[rectLoopVal+1].render([255, 0, 0])
				gnomesort()
				break
		}
	}
		
		
}

// ################################
// button events
// ################################

// create new random values
function createValues() {
	rectLoopVal = 0
	sortAlgo = ""
	rects = []
	let amount = document.getElementById("amount").value
	let w = width / amount - 1
	console.log({w})
	for (let i = 0; i < amount; i++) {
		rects.push(new Element(i * w + i, 0, w, random(0, height)))
	}	
}

function startSort() {
	sortAlgo = document.getElementById("selectedSort").value
	operations = 0
	// apply setup for sort algos
	switch(sortAlgo) {
		case "quick":			
			break
		case "bubble":
			maxTouchedQuickSortVal = rects.length -1
			break
		case "gnome":		
			break
	}
}

// ################################
// element model
// ################################

class Element {
	constructor(x, y, w, h) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h // height = value
	}
	
	render(color) {
		fill(color)
		rect(this.x, this.y + (height - this.h), this.w, this.h)
	}
}

// ################################
// sort algorithms
// ################################

function bubblesort() {
	if (rectLoopVal < maxTouchedQuickSortVal) {
		if (rects[rectLoopVal].h > rects[rectLoopVal+1].h) {
			let tmp = rects[rectLoopVal+1].h
			rects[rectLoopVal+1].h = rects[rectLoopVal].h
			rects[rectLoopVal].h = tmp
		}
		rectLoopVal++
	} else {
		rectLoopVal = 0
		maxTouchedQuickSortVal--
	}
	operations++
	// sort done
	if (maxTouchedQuickSortVal == 0) {
		sortAlgo = ""
		console.log("Bubble sort for " + document.getElementById("amount").value + " elements took " + operations + " operations")
	}		
}

function quicksort() {
	
}

function gnomesort() {
	if (rectLoopVal < rects.length- 1) {
		if (rects[rectLoopVal].h > rects[rectLoopVal+1].h) {
			// switch & step left
			let tmp = rects[rectLoopVal+1].h
			rects[rectLoopVal+1].h = rects[rectLoopVal].h
			rects[rectLoopVal].h = tmp
			if (rectLoopVal > 0) {
				// step left
				rectLoopVal--
			} else {
				// left is nothing, so step right
				rectLoopVal++
			}
		} else {
			// step right
			rectLoopVal++
		}
		operations++
	} else {
		// stop sort
		sortAlgo = ""
		console.log("Gnome sort for " + document.getElementById("amount").value + " elements took " + operations + " operations")
	}
}
