
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { headerSettings } from '../gql/index';

import { changeSidebarState, setInitialState } from '../redux/actions/index';

import { formatNumber } from './../utils/utilities';
import setVariables from './../utils/setVariables';
import getSettings from './api/getSettings';
import getPrices from './api/getPrices';

import FinalRoom from '../components/ui/finalRoom';
import FinalForm from '../components/ui/finalForm';
import Footer from '../components/layout/footer';
 
import styles from './summary.module.scss';

export default function Summary () {
	const dispatch = useDispatch();

	// If we recived link with state from another user
	if (window.location.hash) {

		const initState = JSON.parse(window.location.hash.slice(1)
			.replaceAll('%22', '"')
			.replaceAll('%20', ' ')
			.replaceAll('%C3%BC', 'ü')
			.replaceAll('%C3%B6', 'ö')
			.replaceAll('%C3%A4', 'ä')
		);

		dispatch(setInitialState(initState));

		// console.log('initState', initState)
		window.location.href = location.pathname
	}

  const { apartStyle, apartSize, roomType } = useSelector(state => state);

	// const rooms = Object.keys(roomType);

  const price = apartSize.price;
  const size = apartSize.size;

	
	const { OptionsPrice, IndividualPrice } = getPrices();

  const settings = getSettings();

  useEffect(() => {
    settings.then((data) => {
      setVariables(data);
    })
  }, [settings]);

  useEffect(() => {
    dispatch(changeSidebarState(false));
    return () => dispatch(changeSidebarState(true));
  }, []);

	const { data, error, loading } = useQuery(headerSettings);
  if (loading) return null;
  if(error) return `Error ${error}`;

	const rooms = data.entries
		.filter((item) => (item.__typename === 'rooms_default_Entry'))
		.map((room) => room.title);
	// console.log('roomType', roomType)

  return (
		<>
			<div className={styles.summary} id="summary">

				{apartStyle.image && 
					<div className={`${styles.container} ${styles.mainImage}`} id="mainImage">
						<Image src={apartStyle.image} layout='fill' />				
						{/* <img src={apartStyle.image}/>		 */}
					</div>
				} 

				<div className={`${styles.container}`}>
					<section className={`${styles.summary__overview}`} id="overview">
						<h1 className={`${styles.title} center`}> Ihre Wohnung</h1>

						<div  className={`${styles.summary__overview_content}`}>
							<div className={`${styles.summary__overview_image}`} id="apartmentImage">
								<Image src={apartSize.image} width="381" height="400" />
							</div>
							<div className={`${styles.stats}`} id="stats">
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Wohnung</div>
									<div className="col-4">Nr. 1.11.3</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Grundriss</div>
									<div className="col-4">{size === 'small' ? '3.5' : '4.5'} Zi.</div>
								</div>

								{apartStyle.title && 
									<div className={`${styles.summary__overview_line} row`}>
										<div className="col-8">Interieurlinie</div>
										<div className="col-4">{apartStyle.title}</div>
									</div>
								}
								
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Grundfläche</div>
									<div className="col-4">151m2</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Individuelle Lösungen</div>
									<div className="col-4">{IndividualPrice ? `-${formatNumber(IndividualPrice)}`: 0}</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Zusatzpreis Optionen</div>
									<div className="col-4">{OptionsPrice ? `${formatNumber(OptionsPrice)}`: 0}</div>
								</div>
								<div className={`${styles.summary__overview_line} ${styles.summary__overview_line_heighlite} row`}>
									<div className="col-6">Kaufpreis</div>
									<div className="col-6">CHF {formatNumber(parseInt(price) + OptionsPrice - IndividualPrice)}</div>
								</div>
							</div>
						</div>
						
						{/* <div className="col-4">
							<Image src='/../public/isometry.svg' width="381" height="400" classes="isometry" />
						</div>    */}
					</section>
				</div>

				<div className={`${styles.container} ${styles.notice}`}>
					{/* <div className={`${styles.notice}`}> */}
						<p> Ihre Konfiguration können Sie hier über die Bearbeitungsfunktion bei jeder Auswahl ändern.</p>
					{/* </div> */}
				</div>

				<div className={`${styles.container}`} id="finalRooms">
					{rooms.map((room, index) => <FinalRoom room={roomType[`${room}`]} roomName={room} key={index} style={apartStyle.title}/>)}
				</div> 

				<FinalForm rooms={roomType}/> 
			</div>
			<Footer/>
		</>
  )
}
