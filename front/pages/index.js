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

import { changeApartSize, changeIsStyleRoomState } from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { setBrandSettings } from "../redux/actions/index";

import styles from '../assets/scss/layout/_welcome.module.scss';

export default function Home() {
  const [link, setLink] = useState(false);

  const dispatch = useDispatch();

  const apartSize = useSelector((state) => state.apartSize);

  const settings = getSettings();
  const linkWithoutTypeRoom = getLinkWithoutTypeRoom();
  const checkStylePage = checkIsStylePageExist();

  let pageBg;

  useEffect(() => {
    settings.then((data) => {
      const logo = data?.brandLogo[0].url;
      const headerBgPicture = data?.headerBackgroundPicture[0] ? data?.headerBackgroundPicture[0].url : false;
      const headerBg = data?.headerBackgroundColor;

      setVariables(data);
      dispatch(setBrandSettings(logo, headerBgPicture, headerBg));
      pageBg = data?.welcomePageBg ? settings.welcomePageBg : '';
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
  if (loading) return <p>Loading...</p>;
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
              tab1Action={() => dispatch(changeApartSize('large', welcomeScreen.bigApartmentPrice, apartmentImage.url))}
              tab2={welcomeScreen.smallRoomTitle}
              tab2Action={() => dispatch(changeApartSize('small', welcomeScreen.smallApartmentPrice, apartmentImage.url))}
            />

            <div 
              className={`${styles.submitBtn} center`} 

              // If user didn't choosed size of apartment will be setted initial large size
              onClick={apartSize.image === '' 
                ? () => dispatch(changeApartSize('large', welcomeScreen.bigApartmentPrice, apartmentImage.url)) 
                : null}
            >              
              <Button title="Wahl bestätigen"  href={!link ? "/type" : `${link}`} classes="btn btn--primary btn--check"/>
            </div>

          </div>
          <div className={`${styles.halfLine} ${styles.planImage}`}>
            <Image src={apartmentImage.url} width={apartmentImage.width} height={apartmentImage.height} />
          </div>
        </div>
      </div>
    </>
  )
}