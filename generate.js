function blankit()
{
	var counter=0;
	while(3*counter<2*rows*columns)
	for(var k=1;k<=2;k++)
		for(var ii=1;ii<=rows;ii++)
			for(var jj=1;jj<=columns;jj++)
			{
				var i=ii;
				var j=jj;
				if((k%2)==0)
				{
					
					i=rows-ii+1;
					j=columns-jj+1;
				}
				if(isEmpty(i,j))
				{
					var v = getStat(i,j);
					if(v)
					{
						if(Math.random()<0.15)
						{
								board[i][j]=v;
								counter++;
						}
					}
				}
			}
}
function removesingles()
{
	for(var k=1;k<=12;k++)
		for(i=1;i<=rows;i++)
			for(j=1;j<=columns;j++)
			if(!isEmpty(i,j))
			{	
				var v = getStat(i,j);
				switch(v)
				{
					case 0:
					case 1:
					case 2:
					case 4:
					case 8:
						board[i][j]=0;
						break;
				}
			}
}
function simplify()
{
	var maxi=-1;
	var maxj=-1;
	var maxv=-1;
/*
	for(i=1;i<=rows;i++)
		for(j=1;j<=columns;j++)
		if(isFull(i,j))
		{	
			maxi1 = 1;
			maxj1 = 1;
			maxi2 = 1;
			maxj2 = 1;
			for(k=i+1;k<=rows;k++) if(isFull(k,j)) maxi1 ++; else break;		
			for(k=i-1;k>0;k--) if(isFull(k,j)) maxi2 ++; else break;		
			for(k=j+1;k<=columns;k++) if(isFull(i,k)) maxj1 ++; else break;		
			for(k=j-1;k>0;k--) if(isFull(i,k)) maxj2 ++; else break;		
//			if(maxi1>maxi2) maxi1--; else maxi2--;
//			if(maxj1>maxj2) maxj1--; else maxj2--;
			bo = maxi1*maxj1*maxi2*maxj2;
			//find max
			s = getStat(i,j);
			if((s!=15)||(s!=14)||(s!=13)||(s!=11)||(s!=7)||(s!=15))	
			if(maxv<bo)
			{
//				alert(i+','+j);
				maxi = i;
				maxj = j;
				maxv = bo;
			}
		}
		*/
	for(i=1;i<=rows;i++)
		for(j=1;j<=columns;j++)
		if(isFull(i,j))
		{	
			maxi1 = 0;
			maxj1 = 0;
			maxi2 = 0;
			maxj2 = 0;
			for(k=i+1;k<=rows;k++) if(isFull(k,j)) maxi1 += board[k][j]*(k-i); else break;		
			for(k=i-1;k>0;k--) if(isFull(k,j)) maxi2 += board[k][j]*(i-k); else break;		
			for(k=j+1;k<=columns;k++) if(isFull(i,k)) maxj1 += board[i][k]*(k-j); else break;		
			for(k=j-1;k>0;k--) if(isFull(i,k)) maxj2 += board[i][k]*(j-k); else break;		
			n = maxi1*maxj1*maxi2*maxj2;
			m = maxi1+maxj1+maxi2+maxj2;
			s = getStat(i,j);

			if(n)
			if((s!=0)&&(s!=1)&&(s!=2)&&(s!=4)&&(s!=8)&&(s!=6))	
			if((s!=3)&&(s!=5)&&(s!=9)&&(s!=10)&&(s!=12)&&(s!=1))	
			if(maxv<m)
			{
				maxi = i;
				maxj = j;
				maxv = m;
			}
		}
	if(maxv>50)
	{
		board[maxi][maxj] = 0;
		simplify();
	}
}
function notens()
{
	var counter = 0;
	for(i=1;i<=rows;i++)
		for(j=1;j<=columns;j++)
			if(isEmpty(i,j))
				counter=0;
			else
			{	
				counter++;
				if(counter>9)
					board[i][j]=0;
			}
	counter = 0;
	for(j=1;j<=columns;j++)
		for(i=1;i<=rows;i++)
			if(isEmpty(i,j))
				counter=0;
			else
			{	
				counter++;
				if(counter>9)
				{
					board[i][j]=0;
					counter=0;
				}
			}
}

function right(ii,jj)
{
	var counter=0;
	var counted=0;
	for(var j=jj+1;j<=columns;j++)
		if(isEmpty(ii,j))
			break;
		else
		{
			counter+=board[ii][j];
			counted++;
		}
	if(counted>=1)
		return counter;		
	return '';
}
function bottom(ii,jj)
{
	var counter=0;
	var counted=0;
	for(var i=ii+1;i<=rows;i++)
		if(isEmpty(i,jj))
			break;
		else
		{
			counter+=board[i][jj];
			counted++;
		}
	if(counted>=1)
		return counter;		
	return '';
}
var pencilDefaultBox = '<table class="pencilbox" onmouseup=\"high(this.parentNode.id);\"><tr><td onclick="return togglePencil(this);">1</td><td onclick="return togglePencil(this);">2</td><td onclick="return togglePencil(this);">3</td></tr><tr><td onclick="return togglePencil(this);">4</td><td onclick="return togglePencil(this);">5</td><td onclick="return togglePencil(this);">6</td></tr><tr><td onclick="return togglePencil(this);">7</td><td onclick="return togglePencil(this);">8</td><td onclick="return togglePencil(this);">9</td></tr></table>';
var penDefaultBox = "<table class=insidetable onmouseup=\"high(this.parentNode.id);\"><tr><td onclick=\"return dec(this.parentNode.parentNode.parentNode.parentNode.id);\" ><td valign=middle><td onclick=\"return inc(this.parentNode.parentNode.parentNode.parentNode.id);\"></td></tr></table>";
function output()
{
	content = "<table cellspacing=0 border=01 cellpadding=3>";
	for(i=0;i<=rows+1;i++)
	{
		any = false;
		tr =  "<tr>";
		for(j=0;j<=columns;j++)
		{
			var r = '';
			var b = '';
			if(board[i][j])
			{
				tr += "<td id=\""+i+"td"+j+"\" class=inside style=\"font-size:16px;font-weight:bold;vertical-align:middle;\">";
				tr += penDefaultBox;
				tr += pencilDefaultBox;
				tr += "</td>";
				any = true;
			}
			else
			{
				var v=getStat(i,j);
				var	dir = '';
				switch(v)
				{
					case 1://right
					case 5:
					case 9:
					case 13:						
						r = right(i,j);
						break;
					case 3: //both ways
					case 7: //both ways
					case 11: //both ways
					case 15: //both ways
						r = right(i,j);
						b = bottom(i,j);
						break;
					case 2:	//bottom
					case 6:	//bottom
					case 10:	//bottom
					case 14:	//bottom
						b = bottom(i,j);
						break;
				}
				if(r)
					dir += '<tr><td>&nbsp;</td><td style="font-size:16px;" align=right valign=top>'+r+'</td></tr>';
				if(b)
					dir += '<tr><td style="font-size:16px;" align=left valign="bottom">'+b+'</td><td>&nbsp;</td></tr>';
				if(dir)
				{
					dir = '<table class=insidetable >'+dir+'</table>';
					any = true;
					tr += "<td class=number >"+dir+"</td>";
				}
				else
					tr += "<td class=block  >&nbsp;</td>";
			}
		}
		content +=  "</tr>";
		if(any)
			content += tr;		
	}
	content +=  "</table>";
	return content
}

function fill()
{
	pos = new Array(rows);
	count = 0;
	for(i=1;i<=rows;i++)
	{
		pos[i] = new Array(columns);
		for(j=1;j<=columns;j++)
		{
			if(board[i][j]>0)
			{
				pos[i][j] = new Array(9);
				for(k=1;k<10;k++)
					pos[i][j][k] = k;
				count++;
			}			
		}		
	}
	movenext(1,0);
}
function movenext(i,j)
{
	var v = false;
	var w = true;
	while(!v)
	{
		w = true;
		if(j<columns)
		{
			j++;
			if(isEmpty(i,j))
				w = false;
			else
				v = fillcell(i,j)
		}
		else
			if(i<rows)
			{
				i++;
				j=1;
				if(isEmpty(i,j))
					w = false;
				else
					v = fillcell(i,j);
			}
			else
				return true;		
		if(w)
			return v;
	}
	return v;
}
function fillcell(i,j)
{
	if(!isEmpty(i,j))
	{
		for(k=i-1;(k>0)||(!isEmpty(k,j));k--)
			pos[i][j][board[k][j]]=0;	
		for(k=j-1;(k>0)||(!isEmpty(i,k));k--)
			pos[i][j][board[i][k]]=0;			
		var cl;
		while(true)
		{
			cl = 0;
//			for(k=1;k<10;k++)
//				if(pos[i][j][k])
//					cl++;
//			if(!cl)				return false;
			for(k=Math.floor(Math.random()*9)+1;k<10;k++)
				if(pos[i][j][k])
//				if((cl==1)||(Math.random()*cl>1))
				{
					board[i][j] = k;
					if(movenext(i,j))
					{
						return true;
					}
				}
			for(k=1;k<10;k++)
				if(pos[i][j][k])
//				if((cl==1)||(Math.random()*cl>1))
				{
					board[i][j] = k;
					if(movenext(i,j))
					{
						return true;
					}
				}
		}
	}
	else
	{
		movenext(i,j);
	}
		//this should never occur
}
function exchange()
{
	var r = new Array(9);
	for(i=0;i<10;i++)
		r[i] = i;
	for(i=0;i<100;i++)
	{
		a = Math.floor(Math.random()*9)+1
		b = Math.floor(Math.random()*9)+1
		t=r[a];
		r[a]=r[b];
		r[b]=t;
	}
	for(i=1;i<=rows;i++)
		for(j=1;j<=columns;j++)
			board[i][j] = r[board[i][j]];
}
function generate()
{
	rows = parseInt(document.getElementById('rows').value);
	columns = parseInt(document.getElementById('columns').value);
	board = new Array(rows);
	pencil = new Array(rows);
	pen = new Array(rows);
	mode = new Array(rows);
	for(i=0;i<=rows+1;i++)
	{
		board[i] = new Array(columns);
		pen[i] = new Array(columns);
		mode[i] = new Array(columns);
		pencil[i] = new Array(columns);
	}
	board[Math.floor(rows/2)][Math.floor(columns/2)]=10;
	blankit();
//	removesingles();
//	notens();
//	no checking if there are more than 9 tiles in a row, so this works for upto 9x9
	fill();
	exchange();
//	removesingles();
	simplify();
	removesingles();
	o = output();
	if(o.length>1000)
		document.getElementById('displaybox').innerHTML=o;
	else
		generate();
}
