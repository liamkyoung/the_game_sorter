import React from "react";
//import styled from "@emotion/styled";
import SelSort from "./Sorts/First.js"
import ShellSort from "./Sorts/Second.js"
const Algorithm = (props)=>{
       
    
    var game =Array.from(props.games);
    
    


if(props.process==="first"){
return(
<div>
<SelSort
games = {game}
/>
</div>

)
}else if(props.process==="second"){
return(
<div>
 <ShellSort
 games = {game}
 />
</div>


)

}else{
return(
<div>
    fail
</div>

)

 }
};
export default Algorithm;