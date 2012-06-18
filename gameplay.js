function togglemode(p)
{
	penmode = p;
	document.getElementById('mode'+penmode).style.color = '#FFFFFF';
	document.getElementById('mode'+(3-penmode)).style.color = '#666666';
	document.getElementById('mode'+penmode).style.backgroundColor = '#333333';
	document.getElementById('mode'+(3-penmode)).style.backgroundColor = '#999999';
	document.getElementById('mode'+penmode).style.fontWeight = '900';
	document.getElementById('mode'+(3-penmode)).style.fontWeight = '100';
}

function inc(id)
{
	var s = document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML.valueOf();
	var v =parseInt(s);
	if(isNaN(v))
		var v = 0;
	if(v<9)
		document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML = v +1;
	document.getElementById(id).childNodes[0].rows[0].cells[1].style.color = 'black';
	checkWin();
	return false;
}
function dec(id)
{
	var s = document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML.valueOf();
	var v =parseInt(s);
	if(isNaN(v))
		var v = 10;
	if(v>1)
		document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML= v-1;
	document.getElementById(id).childNodes[0].rows[0].cells[1].style.color = 'black';
	checkWin();
	return false;
}
var oldi, oldj;
function high(id)
{
	if(document.getElementById(selected))
	{
		document.getElementById(selected).style.backgroundColor='#FFFFDD';	
		document.getElementById(selected).childNodes[0].rows[0].cells[0].innerHTML='&nbsp;';
		document.getElementById(selected).childNodes[0].rows[0].cells[2].innerHTML='&nbsp;';	
	}
	if(!id)
		return false;
	i = id.charAt(0);
	j = id.charAt(3);
	oldi = i;
	oldj = j;
	selected = id;	
	if(document.getElementById(selected))
	{
		document.getElementById(selected).childNodes[2-penmode].style.display = 'none';
		document.getElementById(selected).childNodes[penmode-1].style.display = 'block';
		document.getElementById(selected).style.backgroundColor='#FFCC00';
		if(penmode==1)
		{
			document.getElementById(selected).childNodes[0].rows[0].style.height = '56px';
			document.getElementById(selected).childNodes[0].rows[0].cells[0].innerHTML='<img align=left src=left.png onmouseup="return dec(\''+selected+'\');">';
			document.getElementById(selected).childNodes[0].rows[0].cells[2].innerHTML='<img align=right src=right.png onmouseup="return inc(\''+selected+'\');">';		
			return false;
		}
	}
}
function getpencelclass(i,j,ii,jj) { return 'g'; }
function processkey(e)
{
	if(!selected)
		return false;
var keynum;
var keychar;
var numcheck;
if(window.event) // IE
  {
  keynum = e.keyCode;
  }
else if(e.which) // Netscape/Firefox/Opera
  {
  keynum = e.which;
  }
	keychar = String.fromCharCode(keynum);
	if(keychar>0)
	if(keychar<10)
	if(selected)
	{
		if(penmode==1)
		{
			document.getElementById(selected).childNodes[0].rows[0].cells[1].innerHTML = keychar;
			document.getElementById(selected).childNodes[0].rows[0].cells[1].style.color = 'black';
			checkWin();
		}
		else
		 {
			 v = keychar.valueOf()-1;
			 j = v % 3;
			 i = Math.floor(v / 3);
			togglePencil(document.getElementById(selected).childNodes[1].rows[i].cells[j]);			 
		 }		 
	  return false;
	}
	return true;
}
function togglePencil(P)
{
	high(P.parentNode.parentNode.parentNode.parentNode.id);
	if(penmode==2)
	{
		if(P.style.fontWeight != '900')
		{
			P.style.fontWeight = '900';
			P.style.color = '#000000';		
		}
		else
		{
			P.style.fontWeight = '100';
			P.style.color = '#666666';		
		}
		return false;
	}
}

function newGame()
{
	generate();
	document.getElementById('message').innerHTML = 'Play KAKURO';
}

function newGameeasy()
{
document.getElementById('rows').value = '5';
document.getElementById('columns').value = '5';
generate();
	document.getElementById('message').innerHTML = 'Play KAKURO';
}

function newGamemedium()
{
document.getElementById('rows').value = '6';
document.getElementById('columns').value = '6';
generate();
	document.getElementById('message').innerHTML = 'Play KAKURO';
}

function newGamehard()
{
document.getElementById('rows').value = '7';
document.getElementById('columns').value = '7';
generate();
	document.getElementById('message').innerHTML = 'Play KAKURO';
}

function newGameveryhard()
{
document.getElementById('rows').value = '8';
document.getElementById('columns').value = '8';
generate();
	document.getElementById('message').innerHTML = 'Play KAKURO';
}

function resetBoard()
{
	for(i=1;i<=rows;i++)
		for(j=1;j<=columns;j++)
			if(board[i][j])
			{
				id = i+'td'+j;
				document.getElementById(id).innerHTML = penDefaultBox + pencilDefaultBox ;
			}
	document.getElementById('message').innerHTML = 'Play KAKURO';
}
function solve()
{
	for(i=1;i<=rows;i++)
		for(j=1;j<=columns;j++)
			if(board[i][j])
			{
				id = i+'td'+j;
				document.getElementById(id).childNodes[1].style.display = 'none';
				document.getElementById(id).childNodes[0].style.display = 'block';
				v = document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML;
				v = v.valueOf();
				if(v)
				{
					if( v == board[i][j])
						document.getElementById(id).childNodes[0].rows[0].cells[1].style.color = 'green';
					else
						document.getElementById(id).childNodes[0].rows[0].cells[1].style.color = 'red';					
				}
				else
					document.getElementById(id).childNodes[0].rows[0].cells[1].style.color = 'blue';
				document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML = board[i][j];
				document.getElementById(id).childNodes[0].rows[0].style.height = '56px';
			}	
}
function checkSolution()
{
	for(i=1;i<=rows;i++)
		for(j=1;j<=columns;j++)
			if(board[i][j])
			{
				id = i+'td'+j;
				v = document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML;
				if(v)
				{
					v = v.valueOf();
				if( v == board[i][j])
					document.getElementById(id).childNodes[0].rows[0].cells[1].style.color = 'green';
				else
					document.getElementById(id).childNodes[0].rows[0].cells[1].style.color = 'red';					
				}
			}	
}
function checkWin()
{
	return checkWinEnhanced();
	var	winner = true;
	for(i=1;i<=rows;i++)
		for(j=1;j<=columns;j++)
			if(board[i][j])
			{
				id = i+'td'+j;
				v = document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML;
				v = v.valueOf();
				if(v)
				{
					if( v != board[i][j])
						winner = false;
				}
				else
					winner = false;
			}
	if(winner)
		document.getElementById('message').innerHTML = 'Your Kakuro is solved, congratulations!';
	else
		document.getElementById('message').innerHTML = 'Play KAKURO';		
}

function checkWinEnhanced()
{
	var winner = true;
	var r = 0;
	var b = 0;
	var rC = 0;
	var bC = 0;
	for(i=0;i<=rows+1;i++)
	{
		for(j=0;j<=columns;j++)
		{
			if(!board[i][j])
			{
				var v=getStat(i,j);
				switch(v)
				{
					case 1://right
					case 5:
					case 9:
					case 13:						
						r = right(i,j);
						rC = rightCurrent(i,j);
						if(r!=rC)	winner = false;
						break;
					case 3: //both ways
					case 7: //both ways
					case 11: //both ways
					case 15: //both ways
						r = right(i,j);
						b = bottom(i,j);

						rC = rightCurrent(i,j);
						bC = bottomCurrent(i,j);

						if(r!=rC)	winner = false;
						if(b!=bC)	winner = false;
						break;
					case 2:	//bottom
					case 6:	//bottom
					case 10:	//bottom
					case 14:	//bottom
						b = bottom(i,j);
						bC = bottomCurrent(i,j);
						if(b!=bC)	winner = false;
						break;
				} //switch
				if(!winner)
				{
					break;
				}
			} // if
		} //for
	} //for
	if(winner)
		document.getElementById('message').innerHTML = 'Your Kakuro is solved, congratulations!';
	else
		document.getElementById('message').innerHTML = 'Play KAKURO';
}

function rightCurrent(ii,jj)
{
	var counter=0;
	var counted=0;
	for(var j=jj+1;j<=columns;j++)
		if(isEmpty(ii,j))
			break;
		else
		{
			id = ii+'td'+j;
			v = parseInt(document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML.valueOf());
			counter+=v;
			counted++;
		}
	if(counted>=1)
		return counter;		
	return '';
}
function bottomCurrent(ii,jj)
{
	var counter=0;
	var counted=0;
	for(var i=ii+1;i<=rows;i++)
		if(isEmpty(i,jj))
			break;
		else
		{
			id = i+'td'+jj;
			v = parseInt(document.getElementById(id).childNodes[0].rows[0].cells[1].innerHTML.valueOf());
			counter+=v;
			counted++;
		}
	if(counted>=1)
		return counter;		
	return '';
}
