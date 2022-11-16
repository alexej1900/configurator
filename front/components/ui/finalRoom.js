
import Image from 'next/image';
import Link from 'next/link';

import { useDispatch} from 'react-redux';
import { 
  changeSidebarState, 
  setSummaryVisibility, 
  changeRoomVisibility, 
  changeActivePin, 
  changeActiveMod 
} from '../../redux/actions/index';

import checkObjIsEmpty from '../../utils/checkObjIsEmpty';
import Card from './card';
import OptionItem from './optionItem';

import styles from './finalRoom.module.scss';

export default function FinalRoom({room, roomName}) {
  const dispatch = useDispatch();
  const roomMods = room.modifications && Object.entries(room.modifications);

  const editClickHandler = (modName) => {
    dispatch(changeSidebarState(true));
    dispatch(changeRoomVisibility(false));
    dispatch(setSummaryVisibility(true));
    dispatch(changeActivePin(modName));
    dispatch(changeActiveMod(modName));

    // dispatch(changeSidebarState(false));
    // dispatch(setSummaryVisibility(true));
  }

  return (
    <section className={`${styles.summary__room} finalRoom` }>
      <div className={`${styles.summary__room_title}`}>
        <h2 className={`${styles.summary__room_roomTitle} center`}>{roomName}</h2>
      </div>

      <div className={`${styles.summary__room_image} row`}>
        <Image classes="ofi" src={room.image} layout="fill"/>
      </div> 
          
      <div className={`${styles.summary__room_data}`}>
        {roomMods.map((data, index)=> {

          const {modGroupTitle, featuredImage, styleTitle, subtitle} = data[1];

          if (!checkObjIsEmpty(data[1])) 
          return (
            <div key={index} className={`${data[1].option ? styles.fullLine : styles.halfLine}`}>

              <div className={`${data[1].option ? styles.halfLine : ''}`}>
                <h5 className={`${styles.summary__room_data_title}`}>{data[0]}  {`${modGroupTitle ?  '- ' + modGroupTitle : ''}`}</h5>
                <div className={`${styles.summary__room_card_wrapper}`}>
                  <div className={`${styles.summary__room_edit_icon}`} >
                    <Link href={`/${roomName}`} >
                      <a className={`${styles.summary__room_edit_icon}`} onClick={() => editClickHandler(data[0])}>
                        <img src={'/edit-simple.svg'}  />
                      </a>		
                    </Link>
                  </div>
                  <Card 
                    title={styleTitle} 
                    subtitle={subtitle} 
                    image={{url: featuredImage, width: '80px', height: '80px', layout: "fixed"}}
                    type="small" 
                    final={true}
                    selectCard={() => null} 
                  />
                </div>
              </div>

              {data[1].option && 
                <div className={`${styles.halfLine}`}>
                  <h5 className={`${styles.summary__room_data_title}`}>Format</h5>
                  <OptionItem 
                    activeOption={0}
                    index={0} 
                    final={true}
                    data={{
                      optionsTitle: data[1].option.title, 
                      optionsSubtitle: data[1].option.subtitle, 
                      optionsPrice: data[1].option.price
                    }} 
                  />
                </div>
              }
            </div>	
          )
        })}
      </div> 
    </section>
  )
}
