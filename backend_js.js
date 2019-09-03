var count = 0, text = "x"; finished = false, playerOne = "", playerTwo = "", p1 = 0, p2 = 0, draw = 0; 

function tallies() { 
    alert("CURRENT TALLIES: \n" + playerOne + " = " + p1 + (p1 == 1 ? " Win\n" : " Wins\n" ) + playerTwo + " = " + p2 + (p2 == 1 ? " Win" : " Wins\n") + "\nDraws = " + draw); 
}

function setPlayerOne(p1) {
    playerOne = p1; 
}

function setPlayerTwo(p2) {
    playerTwo = p2; 
}

function pressed(e) {
    ++count % 2 == 0 ? text = "o" : text = "x";
    document.getElementById(e.id).innerHTML = text; 
    document.getElementById(e.id).disabled = true; 
    if (checkVertical(e) || checkHorizontal(e) || checkDiagonal(e)) {
        disable('true');
        text == 'x' ? p1++ : p2++; //tally increment
        finished = true; 
    }
    if (count == 9) {
        finished = true; 
        draw++; 
    }
}

function checkHorizontal(e) {
    var ids; 
    if (e.id[0] === 'a') ids = ['a1', 'a2', 'a3'] 
    else if (e.id[0] == 'b') ids = ['b1', 'b2', 'b3']
    else if (e.id[0] == 'c') ids = ['c1', 'c2', 'c3']
    return changeColour(ids); 
}

function checkVertical(e) {
    var ids; 
    if (e.id[1] === '1') ids = ['a1', 'b1', 'c1'] 
    else if (e.id[1] == '2') ids = ['a2', 'b2', 'c2']
    else if (e.id[1] == '3') ids = ['a3', 'b3', 'c3']
    return changeColour(ids); 
}

function checkDiagonal(e) {  
    var non_diags = ['b1', 'b3', 'a2', 'c2'], ids; 
    if (non_diags.includes(e.id))  return false; 
    if (e.id == 'a1' || e.id == 'c3') ids = ['a1','b2','c3'];
    else if (e.id == 'a3' || e.id == 'c1') ids = ['a3','b2','c1'];
    else if (e.id == 'b2') return changeColour(['a1','b2','c3']) || changeColour(['a3','b2','c1']);
    return changeColour(ids);
}

function checkText(ids) {
    for (i = 0; i < ids.length-1; i++) 
        if (document.getElementById(ids[i]).innerHTML !== document.getElementById(ids[i+1]).innerHTML)
            return false; 
    
    return true
}

function disable(bool) {
    var buttons = ['a1','a2','a3','b1','b2','b3','c1','c2','c3'];
    buttons.forEach(function(id) { document.getElementById(id).disabled = (bool == 'true'); });
}

function changeColour(ids) {
    if (checkText(ids)) {
        ids.forEach(function(id) { document.getElementById(id).style.background = '#90ee90'; });
        return true; 
    }
}

function restart() {
    if (finished)
    { 
        disable('false'); 
        var buttons = ['a1','a2','a3','b1','b2','b3','c1','c2','c3'];
        buttons.forEach(function(id) { document.getElementById(id).innerHTML = ""; document.getElementById(id).style.background = ''; });
        count = 0; 
        text="x"; 
        finished = false; 
    }
}
