import { useState } from 'react';
import { useSelector } from 'react-redux';

import ModifyBlock from './modifyBlock';
import CardGroup from './cardGroup';

import styles from './modifyCards.module.scss';

export default function ModifyCards({ activeStyle, cardData, styleId, roomType, setIndividualPrice }) {
  const [activeMod, setActiveMod] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const pinState = useSelector((state) => state.generalStates).pin;

  const visibleData = cardData?.filter((data) => data.modificationVisibility);
  const nonVisibleData = cardData?.filter((data) => !data.modificationVisibility);

  const changeInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  }

  return (
    <>
      <div className={styles.list__visible}>

        {visibleData?.map((cardItem, index) => {

          return !cardItem.modificationGroupBlock ? (
            <ModifyBlock 
              key={index}
              activeMod={activeMod === index}
              setActiveMod={() => setActiveMod(index)}
              cardItem={cardItem}
              activeStyle={activeStyle}
              styleId={styleId}
              roomType={roomType}
              setIndividualPrice={setIndividualPrice}
              activePin={pinState}
            />
          )
        : (
            <CardGroup 
              key={index}
              data={cardItem} 
              activeStyle={activeStyle}
              setActiveMod={() => setActiveMod(index)}
              styleId={styleId}
              room={roomType}
              setIndividualPrice={setIndividualPrice}
              activeMod={activeMod === index}
              activePin={pinState}
            />
          )
        }) 
        }
      </div>
      <div className={styles.list__nonvisible}>

        <div className={styles.list__nonvisible_description}>
          <div className={styles.list__nonvisible_description_text}>Nicht visualisierte Optionen</div>
          <div 
            className={styles.list__nonvisible_description_button}
            onClick={changeInfoVisibility}
          >
            <img src={'/info.svg'} width='24' height='24'/>
          </div>
        </div>
        <div className={`${styles.list__nonvisible_info} ${isInfoVisible && styles.show}`}>
          Die nachfolgenden Optionen werden nicht in den Visualisierungen dargestellt, jedoch in der Berechnung und der Zusammenfassung berücksichtigt
        </div>

        {nonVisibleData?.map((cardItem, index) => {

          return !cardItem.modificationGroupBlock ? (
            <ModifyBlock 
              key={index}
              activeMod={activeMod === index}
              setActiveMod={() => setActiveMod(index)}
              cardItem={cardItem}
              activeStyle={activeStyle}
              styleId={styleId}
              roomType={roomType}
              setIndividualPrice={setIndividualPrice}
              activePin={pinState}
            />
          )
        : (
            <CardGroup 
              key={index}
              data={cardItem} 
              activeStyle={activeStyle}
              setActiveMod={() => setActiveMod(index)}
              styleId={styleId}
              room={roomType}
              setIndividualPrice={setIndividualPrice}
              activeMod={activeMod === index}
              activePin={pinState}
            />
          )
        }) 
        }
      </div>

    </>
  )
}
