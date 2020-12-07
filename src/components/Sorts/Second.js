import React , {useState, useEffect}from "react";
import styled from "@emotion/styled";

const ShellSort = (props) =>{
 const [juegos, setJuegos] = useState([]); //React hook that will allow me to save the sorted state of the game array

 var game = props.games;

const shellSort = (a) =>{
   
    var g=[];
   for(let i =1; i<a.length; i++){//since shell sort orders all elements using the size of an array as a "gap", I pushed all the games except for the searched one into another array
    g.push(a[i]);
   }
   
   var gap =Math.floor(a.length / 2)
   while(gap>0){
    for(let i = gap; i< g.length;i++){
        
        var temp = g[i];
        var j=i;
        while( j>= gap && (100-g[j-gap].rating) > (100-temp.rating)){
            g[j] = g[j-gap];
            j-=gap;
            
        }
        g[j] = temp;

        
    }
    if(gap ===2){
        gap=1;
        
    }else{
        gap=parseInt(gap/2.2);//this was tested to be the most effective factor to divide the the "gap" by
        
    }
   }
  
    var games = [];
    
    for (let i =0; i< 5; i++){
        games.push(g[i]);
    }
    
    setJuegos(games);//uses the hook to update the "juegos" array 
}



var t0 = performance.now();
useEffect(()=>{
    shellSort(game)
},[game])
var t1= performance.now();
var t = t1-t0;

return(
    <Container>
        Highest rated similar games:
<ol type="1">
{juegos.map((juegos, i)=>{
    return <li key = {i}>{juegos.name}</li>
})}
</ol>
<Time>
Time elapsed: {t} ms
</Time>
</Container>
)

};

export default ShellSort;

const Time = styled.div`
color : #E0E0E0;
display: flex;
  
`

const Container = styled.div`
    
    align-items: center;
    padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items:center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;

    
`