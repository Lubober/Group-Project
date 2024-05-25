interface tickerInterface{
    ticker:string
}





function AddToWatchlistButton({ticker}:tickerInterface){

    async function addToWatchlist(){
        const uri="http://localhost:8808/api/addToWatchlist/"
        console.log(ticker)
        console.log(typeof(ticker))
        const thebody = JSON.stringify({ticker:ticker})
        console.log(thebody)
        try{
            await fetch(uri,{
                method:"POST",
                mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("session-token")}`,
                    },
                    body:thebody
            }).then((res)=>{
                console.log(res)
            })
        }
        catch(e){
            console.log(e)
        }
    }



    return(
        <>
        <button className="btn-dark-purple" onClick={addToWatchlist}>Add to Watchlist</button>
        </>
    )
}

export default AddToWatchlistButton