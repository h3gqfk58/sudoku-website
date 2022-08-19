$(document).ready(function() {
	var i,current="q";

	var s3 = new Array(9);
		for (i=0; i<9; i++) s3[i] = new Array(9);

	$(".nums").on("input", function() {				
		if(this.value == 0) this.value = "";
		else if (this.value.length > this.maxLength) this.value = this.value.slice(1, (this.maxLength+1));
		
		if(current == "a") {			
			for(i=1;i<=81;i++) {
				if( ("num-"+i) == $(this).attr('id') ) {
					if(document.getElementById("num-"+i).value == s3[~~((i-1)/9)][(i-1)%9]) {
						$("#"+"num-"+i).css({"color":"green", "backgroundColor":"#FFFFFF"});					
					}
					else {
						$("#"+"num-"+i).css({"color":"red", "backgroundColor":"#FFFFFF"});		
					}
					
					break;
				}
			}
		}
	});

	$("#submit").click(function() {
		var i,j;
		current="a";	

		var s2 = new Array(9);
		for (i=0; i<9; i++) {
			s2[i] = new Array(9);
			for (j=0; j<9; j++) {
				s2[i][j] = new Array(9);
			}
		}

		function fill() {
			var i,j,k,l,c,c2,c3,c4=81;
			var n = new Array(9);

			while(1) {
				c3=0;
				for(i=0;i<9;i++) {
					for(j=0;j<9;j++) {
						for(k=0;k<9;k++) n[k]=0;				
						if(s3[i][j]==0) {
							c3++;
							for(k=0;k<9;k++) if(s3[i][k]!=0) n[s3[i][k]-1]++;
							for(k=0;k<9;k++) if(s3[k][j]!=0) n[s3[k][j]-1]++;
							for(k=(~~(i/3)*3);k<((~~(i/3)*3)+3);k++) 
								for(l=(~~(j/3)*3);l<((~~(j/3)*3)+3);l++) if(s3[k][l]!=0) n[s3[k][l]-1]++;
							c=0;
							for(k=0;k<9;k++){ if(n[k]==0){ c++; c2=k+1; } }					
							if(c==1) s3[i][j]=s2[i][j][0]=c2;
						}
					}
				}
				if(c3==c4) break;
				c4=c3;
			}
		}

		function allp() {
			var i,j,k,l;
			var n = new Array(9);	

			for(i=0;i<9;i++) {
				for(j=0;j<9;j++) {
					if(s3[i][j]==0) {
						for(k=0;k<9;k++) n[k]=0;				
						for(k=0;k<9;k++) if(s3[i][k]!=0) n[s3[i][k]-1]++;			
						for(k=0;k<9;k++) if(s3[k][j]!=0) n[s3[k][j]-1]++;
						for(k=(~~(i/3)*3);k<((~~(i/3)*3)+3);k++) 
							for(l=(~~(j/3)*3);l<((~~(j/3)*3)+3);l++) 
								if(s3[k][l]!=0) n[s3[k][l]-1]++;
	
						for(k=0,l=0;k<9;k++) if(n[k]==0) s2[i][j][l++]=k+1;				
					}
				}
			}
		}

		function con(a, b) {
			var i,j,c=0;
			for(i=0;i<9;i++) if(s3[a][i]==s3[a][b]) c++;
			if(c>1) return 1;
			c=0;
			for(i=0;i<9;i++) if(s3[i][b]==s3[a][b]) c++;
			if(c>1) return 1;
			c=0;
			for(i=(~~(a/3)*3);i<((~~(a/3)*3)+3);i++) 
				for(j=(~~(b/3)*3);j<((~~(b/3)*3)+3);j++) 
					if(s3[i][j]==s3[a][b]) c++;
			if(c>1) return 1;
			return 0;
		}

		function rec() {
			var i,j,k,r,f1=0;

			for(i=0;i<9;i++) {
				for(j=0;j<9;j++) {
					if(s3[i][j]!=0) continue;
					for(k=0;k<9;k++) {
						if(s2[i][j][k]!=0) {
							s3[i][j]=s2[i][j][k];
							if(con(i,j)) s3[i][j]=0;
							else if(rec()) s3[i][j]=0;
							else break;
						}
					}
					if(s3[i][j]==0) {
						f1=1;
						break;
					}
				}
				if(f1) break;
			}
			return f1;	
		}

		function base() {
			var id_of_num;
			var i,j;
			var r=0,f,l;

			var s4 = new Array(9);
			for (i=0; i<9; i++) s4[i] = new Array(9);

			for(i=1;i<=81;i++) {
				id_of_num = "num-"+i;			
				if(document.getElementById(id_of_num).value != "") { s4[~~((i-1)/9)][(i-1)%9] = parseInt(document.getElementById(id_of_num).value ,10); }
				else { s4[~~((i-1)/9)][(i-1)%9] = 0; }
				//console.log(s4[~~((i-1)/9)][(i-1)%9]);

				for(j=0; j<9; j++) { s2[~~((i-1)/9)][(i-1)%9][j] = 0; }
				s3[~~((i-1)/9)][(i-1)%9] = s4[~~((i-1)/9)][(i-1)%9];
				s2[~~((i-1)/9)][(i-1)%9][0] = s4[~~((i-1)/9)][(i-1)%9];				
			}
			for(i=0;i<9;i++) {
				f=0;
				for(j=0;j<9;j++) {
					if(s3[i][j]!=0) r=con(i,j);
					if(r==1) { f=1; break; }
				}
				if(f) break;			
			}
			console.log(r);
			if(!r) {
				fill();
				allp();
				r=rec();
	
				for(i=0;i<9;i++) {
					f=0;
					for(j=0;j<9;j++) {
						if(s3[i][j]!=0) r=con(i,j);
						else r=1;
						if(r==1) { f=1; break; }
					}
					if(f) break;
				}
			}
			if(!r) console.log("Result : Successful");
			else console.log("Result : Unsuccessful");

			/*for(i=1;i<=81;i++) {
				id_of_num = "num-"+i;
				document.getElementById(id_of_num).value = s3[~~((i-1)/9)][(i-1)%9];
				if(s4[~~((i-1)/9)][(i-1)%9] == 0) $("#"+id_of_num).css({"color":"#7A92B7", "backgroundColor":"#FFFFFF"});
				else $("#"+id_of_num).css({"color":"#505050", "backgroundColor":"#E1E0E0"});			
			}*/

			console.log(s2);
			console.log(s3);
			console.log(s4);
		}
		base();
	});

	$("#clear").click(function() {
		for(i=1;i<=81;i++)	{
			id_of_num = "num-"+i;
			document.getElementById(id_of_num).value = "";
			$("#"+id_of_num).css({"color":"#505050", "backgroundColor":"#FFFFFF"});
		}
		current="q";
	});

	$(".buttons").hover(function() {
		$(this).css("opacity","0.7");
	},function() {
		$(this).css("opacity","1");
	});
});