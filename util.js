function isEmpty(i,j)
{
	if(board[i])
		if(board[i][j]>0)
			return false;
	return true;	
}
function isFull(i,j)
{
	if(board[i])
		if(board[i][j]>0)
			return true;
	return false;	
}
function getStat(i,j)
{
	if(isEmpty(i-1,j))
	{//top empty
		if(isEmpty(i,j-1))
		{//left empty
			if(isEmpty(i+1,j))
			{//bottom empty
				if(isEmpty(i,j+1))
				{//right empty
					return 0;
				}
				else
				{//right full
					return 1;
				}
			}
			else
			{//bottom full
				if(isEmpty(i,j+1))
				{//right empty
					return 2;
				}
				else
				{//right full
					return 3;
				}
			}
		}
		else
		{//left full
			if(isEmpty(i+1,j))
			{//bottom empty
				if(isEmpty(i,j+1))
				{//right empty
					return 4;
				}
				else
				{//right full
					return 5;
				}
			}
			else
			{//bottom full
				if(isEmpty(i,j+1))
				{//right empty
					return 6;
				}
				else
				{//right full
					return 7;
				}
			}
		}
	}
	else
	{//top full
		if(isEmpty(i,j-1))
		{//left empty
			if(isEmpty(i+1,j))
			{//bottom empty
				if(isEmpty(i,j+1))
				{//right empty
					return 8;
				}
				else
				{//right full
					return 9;
				}
			}
			else
			{//bottom full
				if(isEmpty(i,j+1))
				{//right empty
					return 10;
				}
				else
				{//right full
					return 11;
				}
			}
		}
		else
		{//left full
			if(isEmpty(i+1,j))
			{//bottom empty
				if(isEmpty(i,j+1))
				{//right empty
					return 12;
				}
				else
				{//right full
					return 13;
				}
			}
			else
			{//bottom full
				if(isEmpty(i,j+1))
				{//right empty
					return 14;
				}
				else
				{//right full
					return 15;
				}
			}
		}
	}
}
