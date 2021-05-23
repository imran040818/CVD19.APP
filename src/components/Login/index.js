import React from 'react'
import Header from '../Shared/headerComponent';
import Footer from '../Shared/footerComponent';
import Grid from '@material-ui/core/Grid';

export default function Login(props) {
    const left = (window.innerWidth/2)-100;
    return (
        <>
           <Header {...props}/>
            <Grid container style={{minHeight:800}}>
                <Grid item xs={12} style={{ textAlign:'center', left:`${left}px`, top:'30%', position:'absolute'}}>
                   <h2>CVT19 Tracker</h2>
                </Grid>
            </Grid>
            <Footer {...props}/>
        </>
    )
}
