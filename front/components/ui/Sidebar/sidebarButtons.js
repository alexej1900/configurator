import Link from 'next/link';

import { useQuery } from '@apollo/client';
import { headerSettings } from '../../../gql/index';

import { useDispatch, useSelector } from "react-redux";
import { changeRoomVisibility, changeStyleVisibility } from "../../../redux/actions/index";

import styles from './sidebar.module.scss';

export default function SidebarButtons({ room, styleTypeSet, roomType }) {
	const dispatch = useDispatch();

	const generalStates = useSelector((state) => state.generalStates);

	const { data, error, loading } = useQuery(headerSettings);
	if (loading) return null;
	if(error) return `Error ${error}`;

	let roomData = data.entries.filter((data) => data.__typename === 'rooms_default_Entry');
	
	let nextLink, prevLink;

	if (room === 'type') {
		nextLink = {link: `/${roomData[0].title.toLowerCase()}`, title: roomData[0].title, icon: 'nextRoom'};
		prevLink = '/';
	} else {
		for (let i = 0; i < roomData.length; i++) {   
			if (roomData[i].title.toLowerCase() === room) {
				nextLink = roomData[i+1]?.title 
					?  {link: `/${roomData[i+1].title.toLowerCase()}`, title: roomData[i+1].title, icon: 'nextRoom'}
					:  {link: '/summary', title: 'Abschliessen', icon: 'checkIcon'};

				prevLink = roomData[i-1]?.title ? roomData[i-1].title.toLowerCase() : generalStates.isStylePageExist ? '/type' : '/';
			}
		}
	}

	const showRoomClick = () => {
		dispatch(changeRoomVisibility(true))
		dispatch(changeStyleVisibility(true));
	}

	const nextLinkIcon = nextLink?.icon;
			
	return (
		<div className={`${styles.sidebar__button} ${roomType === 'type' && styles.sidebar__typeRoomButtons}`}>
			<div className={styles.btn__wrapper}>
				{nextLink && 
					<>
						<Link href={`${prevLink}`} >
							<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__back} center`}>
								Zurück
							</a>
						</Link> 

						<div className={`${styles.btn} ${styles.btn__primary} ${styles.btn__showRoom} center`} onClick={showRoomClick}>
							Raum anzeigen
						</div>

						<Link href={`${nextLink.link}`}>
							<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__next} ${styles[nextLinkIcon]} center`} onClick={styleTypeSet}>
								{nextLink.title}
							</a>
						</Link>    
					</>
				}
			</div>
	</div>
  )
}
