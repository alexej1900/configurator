import { useSelector } from 'react-redux';

import Pin from './pin';

import styles from './pin.module.scss';

export default function PinsList ({ data, roomState, pinClickHandler }) {
  const { generalStates } = useSelector((state) => state);

  return (
    <div className={styles.pins} id='pinList'>
      {data.map((item, index) => {

        const checked = (roomState?.modifications && roomState?.modifications[item.modificationName]) ? true : false;
        const individual = (roomState?.modifications && roomState?.modifications[item.modificationName]?.individualFormat === true) ? true : false;
        const style = item.modificationVisibility ? 'style' : '';

        if (item.modificationPin.length > 0) {
          return (
            <Pin 
              key={index} 
              top= {item.modificationPin[0]?.positionY} 
              left = {String(item.modificationPin[0]?.positionX)} 
              type={style}
              classes={generalStates.pin === item.modificationName ? 'active' : ''}
              clickHandle={() => pinClickHandler(item.modificationName)}  
              checked={checked}
              individual={individual}
            />
          )
        }}     
      )} 
    </div>  
  )
}
