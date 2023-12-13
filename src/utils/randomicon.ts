import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import icons from '@fortawesome/free-solid-svg-icons'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { fas, faB } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core"

library.add(fas)
library.add(faB)

const randomicon = () => {
    // console.log(Icons);
    const tIcon: any = Icons
    const iconList: any = Object.keys(Icons)
        .filter((key: string) => key !== 'fas' && key !== 'prefix')
        .map((icon: string) => tIcon[icon]);


    const iconTypes = iconList;
    const iconType = iconTypes[Math.floor(Math.random() * iconTypes.length)];
    const allColor = ["red", "blue", "green"]
    const color = allColor[Math.floor(Math.random() * allColor.length)];
    // console.log({ type: iconType, color });
    return { type: iconType, color }


}

export default randomicon
