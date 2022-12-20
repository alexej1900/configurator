import Image from 'next/image'

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import setVariables from './../utils/setVariables';
import getSettings from './api/getSettings';
import getLinkWithoutTypeRoom from './api/getLinkWithoutTypeRoom';
import checkIsStylePageExist from './api/checkIsStylePageExist';

import Button from '../components/ui/button';
import FormToggle from '../components/ui/formToggle';
import { introScreen } from '../gql/index';

import { useDispatch, useSelector } from "react-redux";
import { changeApartSize, changeIsStyleRoomState, setBrandSettings, setRooms } from "../redux/actions/index";

import styles from '../assets/scss/layout/_welcome.module.scss';
import LoadingSpinner from '../components/ui/loadingSpinner';

export default function Home() {
  const [link, setLink] = useState(false);
console.log('index');
  const dispatch = useDispatch();

  const apartSize = useSelector((state) => state.apartSize);

  const settings = getSettings();

  const linkWithoutTypeRoom = getLinkWithoutTypeRoom();
  const checkStylePage = checkIsStylePageExist();

  let pageBg;

  useEffect(() => {
    settings.then((data) => {
      const logo = data.settings?.brandLogo[0].url;
      const headerBgPicture = data.settings?.headerBackgroundPicture[0] ? data.settings?.headerBackgroundPicture[0].url : false;
      const headerBg = data.settings?.headerBackgroundColor;
      pageBg = data?.welcomePageBg ? settings.welcomePageBg : '';

      setVariables(data.settings);
      dispatch(setRooms(data.rooms));
      dispatch(setBrandSettings(logo, headerBgPicture, headerBg));
    })
  }, [settings]);

  useEffect(() => {
    checkStylePage.then((isExist) => {
      dispatch(changeIsStyleRoomState(isExist ? true : false));

      linkWithoutTypeRoom.then((data) => {
        !isExist ? setLink(data) : setLink('/type');
      })
    }) 
  }, [checkStylePage]);


  const { data, error, loading } = useQuery(introScreen);
  // if (loading) return <p>Loading...</p>;
  if (loading) return <LoadingSpinner full={true}/>;
  if(error) return <p> Error</p>;

  const welcomeScreen = data.globalSets[0].welcomeScreen[0];
  const apartmentImage = apartSize.size ==='large' ? welcomeScreen.bigRoomImage[0] : welcomeScreen.smallRoomImage[0];

  return (
    <>
      <div className={styles.welcome} style={{background: pageBg}}>
        <div className={styles.welcome__inner}>
          <div className={`${styles.halfLine} ${styles.content}`}>
            <h2 className={`${styles.title}`}>{welcomeScreen.introText}</h2>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: welcomeScreen.paragraph }}></div>

            <FormToggle 
              tab1={welcomeScreen.bigRoomTitle} 
              tab1Action={() => dispatch(changeApartSize('large', welcomeScreen.bigApartmentPrice, apartmentImage))}
              tab2={welcomeScreen.smallRoomTitle}
              tab2Action={() => dispatch(changeApartSize('small', welcomeScreen.smallApartmentPrice, apartmentImage))}
            />

            <div 
              className={`${styles.submitBtn} center`} 

              // If user didn't choosed size of apartment will be setted initial large size
              onClick={apartSize.image === '' 
                ? () => dispatch(changeApartSize('large', welcomeScreen.bigApartmentPrice, apartmentImage)) 
                : null}
            >              
              <Button title="Wahl bestätigen"  href={!link ? "/type" : `${link}`} classes="btn btn--primary btn--check"/>
            </div>

          </div>
          <div className={`${styles.halfLine} ${styles.planImage}`}>
            <Image 
              src={apartmentImage.url} 
              width={apartmentImage.width} 
              height={apartmentImage.height} 
              priority 
              placeholder="blur"
              blurDataURL={'/component.png'}
              alt="Apartment Image"
            />
          </div>
        </div>
      </div>
    </>
  )
}
