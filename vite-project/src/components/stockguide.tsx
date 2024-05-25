import "../styles/stockentries.css";

interface GuideIface{
    preset:number
}

function StockEntryGuide({preset}:GuideIface) {
    return (
        <>
            <div className="stockguide stockentry">
                <div className="stockentry-el">
                    <p className="name"></p>
                </div>
                <div className="stockentry-el">
                    <p className="trade">Name</p>
                </div>
                <div className="stockentry-el">
                    <p className="price">Price</p>
                </div>
                <div className="stockentry-el">
                    <p className="change">Change</p>
                </div>
                
                
                {preset==0?<div className="stockentry-el">
                    <p className="market-cap">Volume</p>
                </div>:""}
            {preset<2?<div className="stockentry-el">
                    <p className="volume">Amount Owned</p>
                </div>:""}
                
            </div>
        </>
    );
}

export default StockEntryGuide;
