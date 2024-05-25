import NavBar from "../components/navbar"
import StockInfoList from "../components/stockinfolist"



function Portfolio(){
    return(
        <>
        <NavBar rightsignup={false}/>
        <div className="stockentries">
            <StockInfoList thegap={10} thetype={'portfolio'} thewidth={"70%"} thequantity={-1} thetitle={"Portfolio"} thedisplaypreset={0}/>
        </div>
        </>
    )
}

export default Portfolio