import React from 'react'
import { useSelector } from "react-redux";

export default function Loader() {
       const {isLoading} = useSelector(state => state.loader);
       const left = (window.innerWidth/2)-60;
       const top = '50%';
    return (
        <div style={{display: isLoading ? 'block' : 'none', zIndex:99, position:'absolute',justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', width:'100%', margin:0, padding:0, top: 0, left: 0, right: 0, bottom: 0, height:'100%'}}>
            <div style={{position:'absolute', left:`${left}px`, top:`${top}`}}>
                <img src={`${process.env.PUBLIC_URL}/loader.gif`} style={{width:60, height:60}}/>
            </div>
        </div>
    )
}
