import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from "react-redux";
import { changeSidebarState, changeApartIndividualPrice, changeRoomImage} from "../../../redux/actions/index";

import { useQuery } from '@apollo/client';
import { RoomData, mainSettings } from '../../../gql/index';

import StyleCards from '../styleCards';
import ModifyCards from '../modifyCards';
import SidebarButtons from './sidebarButtons';

import { formatNumber } from '../../../utils/utilities';
import getImages from '../../../pages/api/getImages';
import getPrices from '../../../pages/api/getPrices';
import getModifications from '../../../pages/api/getModifications';

import setVariables from '../../../utils/setVariables';
import checkObjIsEmpty from '../../../utils/checkObjIsEmpty';

import styles from './sidebar.module.scss';

export default function Sidebar({
        apartmentPrice, 
        roomType, 
        styleId, 
        title, 
        styleCards,
        setLargeImage, 
        activeStyle, 
        styleTypeSet,
        modifyData,
    }) {

    const dispatch = useDispatch();
    const router = useRouter();
    const room = router.query.room;
    const path = router.asPath.slice(1);

    const [individualPrice, setIndividualPrice] = useState(0);

    const sidebarOpen = useSelector(state => state.generalStates.open);
    const { showStyle, showRoom } = useSelector(state => state.generalStates);

    const { OptionsPrice, IndividualPrice } = getPrices();
    
    const modifications = getModifications(roomType);

    const roomImages = getImages(room);

    useEffect(() => {
        if (roomImages && modifyData && !checkObjIsEmpty(modifications)) {
            setActiveImage();
        }
    }, [modifications]);

    const settings = useQuery(mainSettings).data?.globalSets[0].settings[0];

    useEffect(() => {
        setVariables(settings);
    }, [settings]);

    const {data, loading, error} = useQuery(RoomData(roomType));
    if (loading) return <p> Loading...</p>
    if(error) return <p>Error, please read the console. {console.log(error)}</p>

    const sidebarTitle = title ? title : data.entry.title;

    const setIndividualHandler = (increase, price) => {
        setIndividualPrice(increase ? individualPrice + price : individualPrice - price);
        dispatch(changeApartIndividualPrice(individualPrice));
    }

    const setActiveImage = () => {  // Comparing choosed modification and existing images 
        // console.log('modifyData', modifyData)
        // console.log('modifications', modifications)

        let activeMod = '';
        let prevModGroupTitle = null;
        modifyData.forEach((item) => {

            if (item.modificationVisibility) {
                const modName = item.modificationName;
                const modGroupTitle = modifications[modName]?.modGroupTitle ? ` ${modifications[modName]?.modGroupTitle}` : '';

                activeMod = modifications[modName] && modifications[modName].modGroupTitle
                    ? activeMod + 
                        prevModGroupTitle !== modGroupTitle
                        ?
                            `${modName}${modGroupTitle} ${modifications[modName].index} ${
                                    modifications[modName].option  && (modifications[modName].option?.index !== 0)
                                        ? `option ${modifications[modName].option.index} ` 
                                        : ''
                                }` 
                        : ''

                    : modifications[modName] 
                        ? activeMod + 
                            `${modName} ${modifications[modName].index} ${
                                    modifications[modName].option  && (modifications[modName].option?.index !== 0)
                                        ? `option ${modifications[modName].option.index} ` 
                                        : ''
                                }` 
                        : activeMod+`${modName} ${item.modificationItemExample.length > styleId ? styleId : '0'} `
                }  
                prevModGroupTitle = modName;
        })
        
        const newActiveImage = roomImages?.filter((image) => image.title.toLowerCase() === activeMod.slice(0, -1).toLowerCase())[0].url;
        setLargeImage(newActiveImage); 
        dispatch(changeRoomImage(roomType, newActiveImage));
        // console.log('newActiveImage', newActiveImage)
    }

    return (
        <div className={`${styles.sidebar} ${sidebarOpen && styles.open} ${roomType === 'type' && showStyle && styles.moveLeft} ${roomType !== 'type' && !showRoom && styles.moveLeft}` }>
            <div className={styles.sidebar__toggle} onClick={() => dispatch(changeSidebarState(!sidebarOpen))} >
                <span className={styles.toggle}>
                    Ausstattung                 
                    <Image src="/sidebar-navigation.svg" width="24" height="24" /> 
                </span>
            </div>
            {sidebarOpen &&
                <div className={styles.sidebar__content}>
                    <div className={`${[`row ${styles.sidebar__header} items-center`].join(' ')} ${roomType === 'type' && showStyle && styles.hideHeader}`}>
                        <div className={[styles["col-6"], "col-6"].join(' ')}>
                            <h3 className={`${styles.optionsTitle}`}>{sidebarTitle}</h3>
                        </div>
                        <div className={`${styles["col-6"]} ${styles.options}`}>
                            <div><span>Optionen</span> {OptionsPrice > 0 ? '+' : ''}<strong>{formatNumber(OptionsPrice)}</strong></div>
                            {IndividualPrice !== 0 && <div><span>Individuelle</span>{IndividualPrice > 0 ? '-' : ''}<strong>{formatNumber(IndividualPrice)}</strong></div>}
                            <div><span>CHF</span> <strong>{formatNumber(parseInt(apartmentPrice) + OptionsPrice - IndividualPrice)}</strong></div> 
                        </div>
                    </div>

                    <div className={styles.card__wrapper}>
                        
                        {styleCards && 
                            <StyleCards 
                                cardData={styleCards}
                                styleId={styleId}
                                activeStyle={activeStyle}
                            />
                        }

                        {modifyData &&
                            <ModifyCards 
                                cardData={modifyData}
                                styleId={styleId}
                                activeStyle={activeStyle}
                                roomType={roomType}
                                setIndividualPrice={setIndividualHandler}
                            />
                        }
                    </div>
                </div>
            }
            
            <SidebarButtons room={room ? room : path} roomType={roomType} styleTypeSet={styleTypeSet}/>
        </div>
    )
}