import Link from 'next/link';

import { useDispatch } from 'react-redux';

import { changeStyleVisibility, changeRoomVisibility} from '/redux/actions/index';

import { useQuery } from '@apollo/client';
import { headerSettings } from '../../gql/index';

import styles from './styleChooseButtons.module.scss';
import { useEffect, useState } from 'react';

export default function StyleChooseButtons({room, styleTypeSet, activeStyle, styleId}) {
  const dispatch = useDispatch();

	const [currentStyleId, setCurrentStyleId] = useState(styleId);

	useEffect(() => {
		setCurrentStyleId(styleId)
	},[styleId])

  const { data, error, loading } = useQuery(headerSettings);
	if (loading) return null;
	if(error) return `Error ${error}`;

	let roomData = data.entries.filter((data) => data.__typename === 'rooms_default_Entry');
	
	let nextLink, prevLink;

	if (room === 'type') {
		nextLink = {link: '/'+roomData[0].title.toLowerCase(), title: roomData[0].title, icon: 'nextRoom'};
		prevLink = '/';
	} else {
		for (let i = 0; i < roomData.length; i++) {   
			if (roomData[i].title.toLowerCase() === room) {
				nextLink = roomData[i+1]?.title 
					?  {link: '/'+roomData[i+1].title.toLowerCase(), title: roomData[i+1].title, icon: 'nextRoom'}
					:  {link: '/summary', title: 'Abschliessen', icon: 'checkIcon'};

				prevLink = roomData[i-1]?.title ? roomData[i-1].title.toLowerCase() : '/type';
			}
		}
	}

	const changeStyle = () => {
		activeStyle(++currentStyleId%3);
		// dispatch(changeStyleVisibility(true))
	}

  const nextStepClick = () => {
    room === 'type' ?  changeStyle(): dispatch(changeRoomVisibility(false));
  }

	const nextLinkIcon = nextLink?.icon;
			
	return (
		<div className={styles.style__button}>
			<div className={styles.btn__wrapper}>
				{nextLink && 
					<>
						<Link href={`${nextLink.link}`}>
							<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__next} ${styles[nextLinkIcon]} center`} onClick={styleTypeSet}>
								{nextLink.title}
							</a>
						</Link>   
            <div className={`${styles.btn} ${styles.btn__primary} ${styles.btn__back} center`} onClick={nextStepClick}>
              {room === 'type' ? 'Nächster Stil': 'Ausstattung'}
            </div>
					</>
				}
			</div>
	</div>
  )
}
