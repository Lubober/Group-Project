import StockInfoList from "./stockinfolist"

interface ComponentData{
    thetitle:string,
    thetype:string,
    thewidth:string,
    thepreset:number,
    thequantity:number,
    thegap:number
}

function DashboardComonent({thegap,thepreset, thetype, thetitle,thewidth,thequantity}:ComponentData){
    const thelink = `/${thetype}`
    return(
        <><StockInfoList thegap={thegap} thedisplaypreset={thepreset} thetype={thetype} thewidth={thewidth} thequantity={thequantity} thetitle={thetitle}/>
        <a href={thelink} className="btn-dark-purple">Expand...</a>
        </>
    )
}

export default DashboardComonent