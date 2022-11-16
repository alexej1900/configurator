import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeRoomFormatIndividual, changeApartPrice, changeApartIndividualPrice, changeActiveMod } from '../../redux/actions/index';

import Card from './card';
import CheckIcon from './checkIcon';
import OptionsList from './optionsList';

import getModifications from '../../pages/api/getModifications';

import styles from './modifyBlock.module.scss';

export default function ModifyBlock({activeStyle, cardItem, styleId, roomType, activeMod, setActiveMod, activePin, setGroupCheck, groupIndex}) {

  const [collapsed, setCollapsed] = useState(!activeMod);
  const [checked, setChecked] = useState(false);
  const [isInLine, setIsInLine] = useState(!activeMod);
  const [onlyIndividual, setOnlyIndividual] = useState(false);

  const individualPrices = useSelector(state => state.apartPrice.individual);
 
  const dispatch = useDispatch();

  useEffect(() => {
    if (activePin === cardItem.modificationName) {
      setCollapsed(collapsed ? !collapsed : collapsed); 
      setIsInLine(isInLine ? !isInLine : isInLine); 
      setActiveMod();
    } else {
      setCollapsed(true);
    }
  }, [activePin])

  useEffect(() => {
    setCollapsed(!activeMod);
  }, [activeMod])

  useEffect(() => {
    setOnlyIndividual(isIndividualSetted);
  }, [individualPrices])

  const modificationName = cardItem.modificationName;
  const individual = cardItem.individualSolution ? cardItem.individualSolution[0] : null;
  const isIndividualSetted = individualPrices[modificationName] && individualPrices[modificationName] > 0;
  const optionsList = cardItem.optionsList ? cardItem.optionsList : null;

  let modificationImage;
  let modificationTitle;
  let modificationStyle;

  const modifications = getModifications(roomType);

  const listSwitchHandler = () => {
    setCollapsed(!collapsed ); 
    setIsInLine(isInLine ? !isInLine : isInLine); 
    setActiveMod();

    dispatch(changeActiveMod(modificationName));
  }

  const optionsClickHandler = (price) => {
    activeStyle(
      activeIndex, 
      cardItem.modificationName,
      activeModification.modificationImage[0] && activeModification.modificationImage[0].url, 
      activeModification.modificationTitle, 
      activeModification.modificationStyle,
    ); 
    setChecked(true);
    setGroupCheck(groupIndex);
    dispatch(changeApartPrice(cardItem.modificationName, +price));
  }
 
  const individualFormat = () => {
    const individualPrice = cardItem.individualSolution[0].individualSolutionPrice;
    setChecked(true);
    setCollapsed(!activeMod);
    setOnlyIndividual(!isIndividualSetted);

    activeStyle(
      activeIndex, 
      cardItem.modificationName,
      activeModification.modificationImage[0] && activeModification.modificationImage[0].url, 
      activeModification.modificationTitle, 
      activeModification.modificationStyle,
    ); 

    dispatch(changeRoomFormatIndividual(roomType, modificationName, !isIndividualSetted));
    dispatch(changeApartIndividualPrice(cardItem.modificationName, !onlyIndividual ? individualPrice : 0) );
    dispatch(changeApartPrice(cardItem.modificationName, 0));
  }

  const setModsPrice = (price) => {
    dispatch(changeApartPrice(cardItem.modificationName, price));
  }

  const activeModification = (modifications && modifications[`${modificationName}`]) 
    ? {
      modificationImage: [{url: modifications[`${modificationName}`].featuredImage, width: '80px', height: '50px'}],
      modificationStyle: modifications[`${modificationName}`].subtitle,
      modificationTitle: modifications[`${modificationName}`].styleTitle,
      modificationNumber: modifications[`${modificationName}`].index,
      activeOption: modifications[`${modificationName}`].option ? modifications[`${modificationName}`].option.index : undefined,
    } 
    : cardItem.modificationItemExample && cardItem.modificationItemExample[styleId] 
      ? {... cardItem.modificationItemExample[styleId], modificationNumber: styleId, activeOption: 0,} 
      : {... cardItem.modificationItemExample[0], modificationNumber: 0, activeOption: 0} ;

    useEffect(() => {
      if (modifications && modifications[`${modificationName}`]) {
        setChecked(true);
        setIsInLine(false);
      } 
    }, [])
    
  const activeIndex = activeModification.modificationNumber;

  return (
    <>
      <div className={`${styles.card__wrapper} ${collapsed && styles.collapsed} ${isInLine | individual && styles.inLine}`}>
        <div className={styles.card__header} onClick={() => listSwitchHandler()}>
          <div className={`${styles.arrow} ${collapsed && styles.rotate}`}></div>

          <h3 className={styles.mod__title}>{modificationName}
                        {!cardItem.modificationVisibility && <span className={styles.mod__title_unvisible}> (nicht visualisiert) </span>}</h3>

          {cardItem.modificationItemExample.length > 0 &&
            <div className={styles.card_group__number}>
                <span>{cardItem.modificationItemExample.length}</span>
            </div>
          }

          {checked &&
            <div className={styles.checkIcon}>
              <CheckIcon color={styles.checkIconColor}/>
            </div>
          }

        </div>        
        <div className={`${styles.card__list}`}>

          {collapsed | onlyIndividual
            ? <Card
                checked={() => setChecked(true)}
                selectCard= {() => listSwitchHandler()}
                type='small'
                image={!onlyIndividual 
                  ? {url: activeModification.modificationImage[0].url, width: '80px', height: '50px', layout: "fixed"} 
                  : {url: 'individ-icon.svg', width: '30px', height: '30px', layout: "fixed", background: '#00d2d3'}
                }
                subtitle={!onlyIndividual ? activeModification.modificationStyle : 'Individual'}
                title={!onlyIndividual ? activeModification.modificationTitle : ''}
                active = 'true'
                collapsed={collapsed}
              />
            : cardItem.modificationItemExample.map((item, index)=>{

              modificationImage = item.modificationImage;
              modificationTitle = item.modificationTitle;
              modificationStyle = item.modificationStyle;

              return (
                <div key={index} className={`${styles.card__block}`}>
                  <Card
                    selectCard= {() => {
                      activeStyle(
                      index, 
                      cardItem.modificationName,
                      item.modificationImage && item.modificationImage[0].url, 
                      item.modificationTitle, 
                      item.modificationStyle,
                    );
                      setChecked(true);
                      setModsPrice(item.modsAdditionalPrice ? item.modsAdditionalPrice : 0)
                    }
                  }
                    type='small'
                    image={modificationImage[0]}
                    subtitle={modificationStyle}
                    title={modificationTitle}
                    active = {activeIndex === index}
                  /> 
                </div>
              )
            })
          }
        </div>
        {optionsList &&
          <OptionsList 
            selectCard= {optionsClickHandler}
            data={optionsList}
            modificationName={modificationName}
            inLine={isInLine}
            onlyIndividual={collapsed | onlyIndividual}
            activeFormat={activeModification.activeOption}
          />
        }
        {individual?.enableIndividualSolution && 
          <div className={`${styles.individual} ${collapsed  && styles.individual__inLine}`}>
            <span>Ich wünsche eine</span>
              <p className="toggle">Individuelle Lösung 
                <input 
                  type="checkbox" 
                  id={modificationName} 
                  onChange={() => individualFormat()}
                  checked={isIndividualSetted}
                />
                <label htmlFor={modificationName}>Toggle</label>
              </p>
          </div>
        }   
      </div>
    </>
  )
}
