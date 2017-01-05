import edu.princeton.cs.algs4.WeightedQuickUnionUF;



public class Percolation {

	private WeightedQuickUnionUF uf;
	private int n;
	private byte[] sitesArray;
	private int topLink;


	// create n-by-n grid, with all sites blocked
	public Percolation(int n) {
		if(n <= 0){
			throw new java.lang.IllegalArgumentException("n should be greater than 0");
		}
		this.n=n;
		uf = new WeightedQuickUnionUF(n*n+2);
		sitesArray = new byte[n*n];
		topLink = n*n;

	}

	private void validParam(int row, int col)
	{
		if (row <= 0 || row > n || col <= 0 || col > n)
		{
			throw new java.lang.IndexOutOfBoundsException("row or col index is out of bounds");
		}
	}


	// open site (row, col) if it is not open already
	public void open(int row, int col){
		validParam(row, col);

		if (isOpen(row, col))
		{
			return;
		}
		int siteIndex = getUfIndex(row, col); 
		this.sitesArray[siteIndex] = 1;


		// union top link 
		if (row == 1 && !uf.connected(siteIndex, topLink))
		{
			uf.union(siteIndex, topLink);
		}


		// union bottom
		if (row < n)
		{
			if (isOpen(row+1, col))
			{
				uf.union(siteIndex, getUfIndex(row+1, col));
			}
		}
		// union up
		if (row > 1)
		{
			if (isOpen(row-1, col))
			{
				uf.union(siteIndex, getUfIndex(row-1, col));
			}
		}
		// union left 
		if (col > 1)
		{
			if (isOpen(row, col-1))
			{
				uf.union(siteIndex, getUfIndex(row, col-1));
			}
		}
		// union right
		if (col < n)
		{
			if (isOpen(row, col+1))
			{
				uf.union(siteIndex, getUfIndex(row, col+1));
			}
		}

	}    
	// is site (row, col) open?
	public boolean isOpen(int row, int col){

		validParam(row, col);

		if(sitesArray[getUfIndex(row, col)] == 1){
			return true;
		}else 
			return false;
	}
	// is site (row, col) full?
	public boolean isFull(int row, int col){
		validParam(row, col);
		if (!isOpen(row, col))
			return false;

		if(uf.connected(topLink, getUfIndex( row, col))){
			return true;
		}else {
			return false;
		}

	}
	// number of open sites
	public int numberOfOpenSites() {
		int s=0;
		for(int i : sitesArray)
			if(i == 1)
				s++;
		return s;
	}
	// does the system percolate?
	public boolean percolates(){

		for(int i=0;i<n;i++){
			if(uf.connected(topLink, uf.find(getUfIndex(n, i)))){
				return true;
			}
		}
		return false;
	}

	private int getUfIndex(int i, int j){
		return n*(i - 1) + j - 1;
	}

}
