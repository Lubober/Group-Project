interface routeinfo{
    name:string;
    link:string;
}


function SampleRoute({name,link}:routeinfo){
    return(
        <a href={link}>{name}</a>
    )
}

export default SampleRoute