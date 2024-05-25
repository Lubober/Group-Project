import NavBar from "../components/navbar"
import StockInfoList from "../components/stockinfolist"



function ListOfStocks(){
    return(
        <>
        <NavBar rightsignup={false}/>
        <div className="stockentries">
            <StockInfoList thegap={10} thetype={'stocklist'} thewidth={"70%"} thequantity={-1} thetitle={"List of Stocks"} thedisplaypreset={0}/>
        </div>
        </>
    )
}

export default ListOfStocks