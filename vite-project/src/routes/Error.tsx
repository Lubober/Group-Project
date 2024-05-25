import { useParams } from "react-router-dom"


function Error(){
    const code = useParams()
    console.log(code)

    return(
        <>{code?code.code:"404"}</>
    )
}

export default Error