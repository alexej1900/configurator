import { useState } from 'react';
import { useSelector } from 'react-redux';

import ModifyBlock from './modifyBlock';
import CardGroup from './cardGroup';

export default function ModifyCards({ activeStyle, cardData, styleId, roomType, setIndividualPrice }) {
  const [activeMod, setActiveMod] = useState(0);

  const pinState = useSelector((state) => state.generalStates).pin;

  return (
    <>
      {cardData?.map((cardItem, index) => {

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
    </>
  )
}
