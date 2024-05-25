import bgpic1 from '../bg1.png'
import bgpic2 from '../bg2.png'

function BackGround(){
    
    return(
        <>
        <img src={bgpic1} className='bgpic prevent-select' draggable="false"/>
        <img src={bgpic2} className='bgpic prevent-select'draggable="false"/>
        <img src={bgpic1} className='bgpic prevent-select'draggable="false"/>
        <img src={bgpic2} className='bgpic prevent-select'draggable="false"/>
        </>
    )
}

export default(BackGround)