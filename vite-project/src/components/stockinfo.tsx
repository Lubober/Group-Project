interface StockData {
    id: string;
    name: string;
    price: string;
    change: string;
    cap: string;
    volume: string;
    thedisplaypreset: number;
    watchlist: boolean;
}

function StockInfo({
    id,
    name,
    price,
    change,
    cap,
    volume,
    thedisplaypreset,
    watchlist,
}: StockData) {
    console.log("ISWATCHLIST")
    console.log(watchlist);
    const path = `/single_stock_page/${id}`;

    async function rmWL(){
        const thebody = JSON.stringify({ticker:id})
        const uri="http://localhost:8808/api/removeFromWatchlist/"
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


    return (
        <div className="stockentry stockdata">
            <div className="stockentry-el">
                <a href={path} className="stock-label stockentry-el">
                    Trade
                </a>
            </div>

            <div className="stockentry-el name">
                <p className="stock-label">{name}</p>
            </div>
            <div className="stockentry-el price">
                <p className="stock-label">{price} &pound;</p>
            </div>
            <div className="stockentry-el change">
                {parseInt(change) != 0 ? (
                    <div>
                        <p
                            className={
                                parseInt(change) >= 0
                                    ? "stock-label green"
                                    : "stock-label red"
                            }
                        >
                            {parseInt(change)}%
                        </p>
                        <i className="fa-solid fa-caret-up"></i>
                    </div>
                ) : (
                    <div className="stock-label">{0}%</div>
                )}
            </div>
            {thedisplaypreset == 0 ? (
                <div className="stockentry-el cap">
                    <p className="stock-label">{cap}</p>
                </div>
            ) : (
                ""
            )}
            {thedisplaypreset < 2 ? (
                <div className="stockentry-el volume">
                    <p className="stock-label">{volume}</p>
                </div>
            ) : (
                ""
            )}
            {watchlist &&thedisplaypreset==0 ? (
                    <div className="rm">
                        <button onClick={rmWL} className="btn-dark-purple">
                            <s>watchlist</s>
                        </button>
                    </div>
                ) : (
                    ""
                )}
        </div>
        
    );
}

export default StockInfo;
