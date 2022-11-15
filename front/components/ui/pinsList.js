import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Pin from './pin';

import styles from './pin.module.scss';

export default function PinsList ({ data, roomState, pinClickHandler }) {
  const router = useRouter();

  const { generalStates } = useSelector((state) => state);
  const sidebarState = generalStates.open;

  useEffect(() => {

    if (sidebarState) {
    const id2 = window.setTimeout(() => {
        document.querySelector('#pinList')?.classList.add(styles.animate)
    }, 500);

    const id3 = window.setTimeout(() => {
        document.querySelector('#pinList')?.classList.remove(styles.animate)
    }, 3500);
    
    return () => { 
        window.clearTimeout(id2)
        window.clearTimeout(id3)
    };
  }
}, [router.asPath])
  
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
              classes={generalStates.activeMod === item.modificationName ? 'active' : ''}
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
