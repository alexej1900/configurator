
import Image from 'next/image';

import { useSelector } from "react-redux";

import styles from './pin.module.scss';

export default function Pin ({top, left, clickHandle, type, classes, checked, individual}) {

  const { generalStates } = useSelector((state) => state);
  const sidebarState = generalStates.open;

  console.log(sidebarState);

  let leftStyle;

  if (!sidebarState) leftStyle = {left: `calc(${left}% - 36rem)`};
  else leftStyle = {left: `calc(${left}% )`};

  const topPos = `top${top}`
  const leftPos = `left${left}`

  // const pos = left <= 100 

  // ? {
  //   top: `${top}%`,
  //   // left: `${50 - left}%`,
  //   left: `${left}%`,
  //   position: 'absolute',
  //   cursor: 'pointer'
  // }
  // : {
  //   top: `${top}%`,
  //   right: `${100 - left}%`,
  //   position: 'absolute',
  //   cursor: 'pointer'
  // }

  const disabledImage = () => {
    return checked 
      ? individual 
        ? classes === 'active' 
          ? <Image width="36" height="48" src={'/individ-pin_green.svg'} /> 
          : <Image width="36" height="48" src={'/individ-pin.svg'} /> 
      
        : classes === 'active' 
          ? <Image width="36" height="48" src={'/check-green.svg'} /> 
          : <Image width="36" height="48" src={'/checked.svg'} /> 
      : classes === 'active' 
        ? <Image width="36" height="48" src={type === 'style' ? '/style_active.svg' : '/edit_active.svg'} />
        : <Image width="36" height="48" src={type === 'style' ? '/edit_style.svg' : '/edit.svg'} />;
  };
    
  return (
    <div 
    style={leftStyle}
    className={`
      ${styles.pin} 
      ${styles[topPos]}
      ${classes}`} 
      // style={pos} 
      onClick={()=>clickHandle()}>
      {disabledImage()}
    </div>
  )
}
