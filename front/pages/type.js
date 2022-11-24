import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useDispatch, useSelector } from 'react-redux';

import InfoBox from '../components/ui/infoBox';
import Sidebar from '../components/ui/Sidebar/Sidebar';
import ScrollIcon from '../components/ui/scrollIcon';
import StyleChooseButtons from '../components/ui/styleChooseButtons';

import { typePage } from '../gql/index';

import { changeApartStyle, resetRoomTypeState } from '../redux/actions/index';

import styles from './room.module.scss';

export default function Type() {
    const [styleId, setStyleId] = useState(0);
    const [isScroll, setIsScroll] = useState(false);

    const dispatch = useDispatch();

    const {apartStyle, apartSize, generalStates} = useSelector((state) => state);
    const sidebarState = generalStates.open;

    useEffect(() => {
        // setting of initial style
        setStyleId(apartStyle.style);
    }, [])

    const {data, error, loading} = useQuery(typePage);
    if (loading) return <p> Loading ... </p>;
    if(error) return <p>Error, please read the console. {console.log(error)}</p>

    let currentStyle = data.entry.styles[styleId];
    const styleImage = currentStyle.image[0];

    const changeStyle = (id) => {

        setStyleId(id);
        currentStyle = data.entry.styles[id];
        dispatch(changeApartStyle(id, currentStyle.image[0].url, currentStyle.styleTitle));
        dispatch(resetRoomTypeState());
    }

    const setStyleTypeHandle = () => {
        dispatch(changeApartStyle(styleId, currentStyle.image[0].url, currentStyle.styleTitle));
    }

    return (
        <div className={`${styles.type__wrapper}`} >   
            <ScrollContainer 
                className={`
                    ${sidebarState && styles.image__wrapperActive} 
                    ${styles.image__wrapper}
                `} 
                onStartScroll={() => setIsScroll(true)}
                onEndScroll={() => setIsScroll(false)}
                
            >
                <img className={styles.full} src={styleImage.url}/>

                {/* <div  style={{position:"relative", width: "100vw", height: "100vh"}}>
                    <Image priority={true} src={styleImage.url} layout="fill" className={styles.full}/>
                </div> */}
            </ScrollContainer>

            {(sidebarState & !isScroll) ?  <ScrollIcon/> : null}

            <Sidebar 
                styleId={styleId} 
                activeStyle={(id) => changeStyle(id)} 
                apartmentPrice = {apartSize.price} 
                title="Stil" 
                styleCards={data.entry.styles} 
                styleTypeSet={setStyleTypeHandle} 
                roomType={'type'}
            />

            <InfoBox  styleTitle={currentStyle.styleTitle} description={currentStyle.description}/>

            <StyleChooseButtons 
                room={'type'} 
                styleTypeSet={setStyleTypeHandle} 
                activeStyle={(id) => changeStyle(id)} 
                styleId={styleId} 
            />
        </div>
    )
}
