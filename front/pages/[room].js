import { useState, useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import Sidebar from '../components/ui/Sidebar/Sidebar';
import PinsList from '../components/ui/pinsList';
import ScrollIcon from '../components/ui/scrollIcon';
import StyleChooseButtons from '../components/ui/styleChooseButtons';

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { RoomData } from '../gql/index';

import { useDispatch, useSelector } from "react-redux";
import { changeRoomType, changeSidebarState, changeActivePin, changeActiveMod , changeRoomVisibility} from '../redux/actions/index';

import styles from './room.module.scss';

let ROOM_TYPE;

export default function Room() {
    const router = useRouter();
    // ROOM_TYPE = router.asPath.slice(1);
    ROOM_TYPE = router.query.room;
    const path = router.asPath.slice(1);

    const [styleId, setStyleId] = useState(0);
    const [largeImage, setLargeImage] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    
    const dispatch = useDispatch();

    const state = useSelector((state) => state);
    const { apartSize, apartStyle, generalStates } = state;
    const sidebarState = generalStates.open;

    const roomState = state.roomType[ROOM_TYPE]; ///// ToDo CHANGE to getModificarion

    useEffect(() => {
        setLargeImage(false);

        if (sidebarState) {

            const id = window.setTimeout(() => {
                document.querySelector('#fullImage')?.classList.add(styles.animate)
            }, 500);

            const id1 = window.setTimeout(() => {
                document.querySelector('#fullImage')?.classList.remove(styles.animate)
            }, 3500);

            return () => { 
                window.clearTimeout(id)
                window.clearTimeout(id1)
            };
        }
    }, [router.asPath])

    useEffect(() => {
        setStyleId(apartStyle.style);
    }, [])

    // useEffect(() => {
    //     const id = window.setTimeout(async() => {
    //         for (var x = 0; x <= 200; x += 10) {
    //             document.querySelector('.indiana-scroll-container--hide-scrollbars')?.scrollTo({left: sidebarState ? x : 0, behavior: 'smooth'})
    //             await new Promise(res => setTimeout(res, 30))
    //         }
    //         // document.querySelector('.indiana-scroll-container--hide-scrollbars')?.scrollTo({
    //         //     top: 0,
    //         //     left: sidebarState ? 200 : 0,
    //         //     behavior: 'smooth'
    //         //     });
    //     }, 3000);
    //     return () => window.clearTimeout(id);
       
    // }, []);
    
    const { data, loading, error } = useQuery(RoomData(ROOM_TYPE));
    if (loading) return <p> Loading...</p>
    if(error) return <p>Error, please read the console. {console.log(error)}</p>

    const activeImage = roomState?.image ? roomState.image : data.entry.roomStyles[0].roomStyleExamples[styleId].styleDefaultImage[0].url;

    const modifyData = data.entry.mods[0].modificationsTypes;

    const changeType = (index, modName,  featuredImage, styleTitle, subtitle, modGroupTitle) => {
        console.log('modNameROOM', modName)

        dispatch(changeRoomType(ROOM_TYPE, modName, index,  featuredImage, styleTitle, subtitle, modGroupTitle, largeImage));
    }

    const openModificationsList = (modificationName) => {
        dispatch(changeActivePin(modificationName));
    }

    const pinClickHandler = (modName) => {
        dispatch(changeSidebarState(true));
        dispatch(changeRoomVisibility(false))
        openModificationsList(modName);
        dispatch(changeActiveMod(modName));
    }

    // console.log('roomState.', roomState)

    return (
        <div className={`${styles.type__wrapper}`} >   
            <ScrollContainer 
                className={`${sidebarState && styles.image__wrapperActive} ${styles.image__wrapper}`} 
                onStartScroll={() => setIsScroll(true)}
                onEndScroll={() => setIsScroll(false)}
            >
                <img className={styles.full} src={largeImage ? largeImage : activeImage} id='fullImage'/>

                <PinsList data={modifyData} roomState={roomState} pinClickHandler={pinClickHandler}/>
                
            </ScrollContainer>

            {(sidebarState & !isScroll) ? <ScrollIcon/> : null}
              
            <Sidebar 
                styleId={styleId} 
                apartmentPrice = {apartSize.price} 
                modifyData={modifyData}
                setLargeImage={setLargeImage}
                activeStyle = { 
                    (index, modName,  featuredImage, styleTitle, subtitle, modGroupTitle) => changeType(index, modName,  featuredImage, styleTitle, subtitle, modGroupTitle)
                }
                roomType = {ROOM_TYPE}
                title={data.entry.title} 
                stylesCards={true} 
            />

            <StyleChooseButtons room={ROOM_TYPE ? ROOM_TYPE : path} styleTypeSet={() => console.log()} />
        </div>
    );
}
