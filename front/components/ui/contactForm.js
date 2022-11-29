import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { useMutation} from '@apollo/client';

import TinyURL from 'tinyurl';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import validator from 'validator';

import { saveData } from '../../gql/index';

import styles from './contactForm.module.scss';
import { useEffect, useState } from 'react';
import { resetState } from '../../redux/actions';
import Popup from './popup';

export default function ContactForm({rooms}) {

  const [isContactReady, setIsContactReady] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [link, setLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const router = useRouter();
  const dispatch = useDispatch();

  // console.log('router', router)
  const state = useSelector(state => state)

  const checkHandler = () => {
    setIsContactReady(!isContactReady)
  }

  useEffect(() => {
    madeUrl()
  }, []);

  const [save_users_default_Entry, {data, loading, error}] = useMutation(saveData);

  const validateData = async(e) => {

    if (!validator.isEmail(email)) {
      alert("Please, enter valid Email!");
      return
    }

    if (!validator.isMobilePhone(phone)) {
      alert("Please, enter valid Phone!");
      return
    }

    // saveAsPdfHandler(false); 

    save_users_default_Entry({ variables: { 
      resultName: name + ' ' + surname,
      userEmail: email, 
      userPhone: phone, 
      userData: link,
      authorId: 3,
    } });

    if(!loading && phone && email){
      setShowSuccess(true);

      setTimeout(() => { 
        setShowSuccess(false);
        setName('');
        setSurname('');
        setEmail('');
        setPhone('');
       }, 2500)
    }
  }

  const submitHandler = () => {
    const longURL = window.location.href + '#' + JSON.stringify(state);
    
    const type = "text/plain";
    TinyURL.shorten(longURL, function(shortURL, err) {
        if (err)
          console.log(err)
        const blob = new Blob([shortURL], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        navigator.clipboard.write(data);

        alert(`Link ist:  ${shortURL}`);
      });
  }

  const onConfirm = () => {
    setIsPopup(false);
    router.push('/');
    
    setTimeout(() => { 
      dispatch(resetState());
     }, 0);
  }

  const onCancel = () => {
    setIsPopup(false);
  }

  const madeUrl = async() => {
    const longURL = window.location.href + '#' + JSON.stringify(state);
    
    TinyURL.shorten(longURL, function(shortURL, err) {
        if (err)
          console.log(err)
          setLink(shortURL);
      });
  }

  const saveAsPdfHandler = async(isSave) => {
    const apartmentImage = document.getElementById('apartmentImage');
    const stats = document.getElementById('stats');
    const finalRooms = document.getElementsByClassName('finalRoom');

    const pdfDOC = new jsPDF("p", "mm", "a4"); 

    pdfDOC.text(`Name: ${name}`, 20, 10);
    pdfDOC.text(`Vorame: ${surname}`, 20, 20);
    pdfDOC.text(`Email: ${email}`, 20, 30);
    pdfDOC.text(`Telefonnummer: ${phone}`, 20, 40);
    isContactReady && pdfDOC.text(`Rückruf: Ya`, 140, 40);

    pdfDOC.text(`Link to settings: ${link}`, 20, 50);

    await getPdfPage(apartmentImage, pdfDOC, false, 50, 60, 2);
    await getPdfPage(stats, pdfDOC, false, 50, 170, 2);


    for (let i = 0; i < finalRooms.length; i++) {
      await getPdfPage(finalRooms[i], pdfDOC, true, 10, 20, 1);
    }

    isSave && pdfDOC.save('summary.pdf');   //Download the rendered PDF.
  }

  const getPdfPage = async(div, pdfDOC, addPage, x, y, scale) => {
    addPage && pdfDOC.addPage();
    const divHeight = div.clientHeight
    const divWidth = 1440;
    const ratio = divHeight / divWidth;

    await html2canvas(div, { scale: '2' }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      
      const width = pdfDOC.internal.pageSize.getWidth();
      let height = pdfDOC.internal.pageSize.getHeight();
      height = ratio * width;

      pdfDOC.addImage(imgData, 'JPEG', x ? x : 0, y ? y : 0, (width - 20)/scale, (height - 10)/scale);

    })  

    return pdfDOC
  }

  return (
    <>
      <section className={`${styles.contactForm}`}>
        <div className={styles.text__inner}>
          <div className={styles.contactForm_header}>
            <img src='./summary.svg' alt="summary" className={styles.contactForm_icon}/> 
            <h3>Konfigurator abschliessen</h3>
          </div>
          <div className={styles.formular}>
            <p >Sie können sich Ihre Konfiguration ganz einfach per PDF auf Ihre Emailadresse senden.</p> 
            <p >Sollten Sie eine neue Konfiguration starten wollen, löschen Sie bitte Ihre Browserdaten.</p>
            <form className={styles.form}> 
              <div className={`${styles.success__message}  ${showSuccess && styles.active}`}  >
                <span>Ihre Kontakte wurden an das Unternehmen gesendet</span>
              </div>
              
              <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Vorname" 
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
              />
              <input 
                type="email" 
                placeholder="Emailadresse" 
                pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={styles.clienEmail}
                />
              <input 
                type="tel" 
                placeholder="Telefonnummer" 
                pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className={styles.clienPhone}
              />

              <div className={`${styles.toggle} toggle`}>
                <span>Bitte um Kontaktaufnahme </span>
                <input type="checkbox" id="test" className={styles.checkbox} onClick={checkHandler}/>
                <label htmlFor="test"> Ja / Nein</label>
              </div>

              <button 
                className={`${styles.submitBtn}`} 
                onClick={(e) => {
                  e.preventDefault();
                  validateData(e)
                }} 
                disabled={showSuccess}
                title='Kontakte werden gesendet. Warten Sie auf einen Anruf'
                
              >
                {loading ? 'Senden...' : 'Per Email zusenden '}
              </button>
              <button 
                className={`${styles.saveBtn}`} 
                onClick={(e) => {
                  e.preventDefault();
                  saveAsPdfHandler(true);
                }} 
                title='Sie können alle Einstellungen in einer PDF-Datei speichern'
              >
                  als PDF speichern
                </button>
              <button 
                className={`${styles.saveBtn}`} 
                onClick={(e) => {
                  e.preventDefault();
                  submitHandler();
                }}
                title='Sie können alle Einstellungen als Link speichern'
              >
                Link weiterleiten
              </button>
            </form>
          </div>
          
            <button 
              className={`${styles.resetBtn}`} 
              onClick={() => setIsPopup(true)}
              title='RESET YOUR DATA'
            >
              RESET
            </button>
        </div>
        
      </section>

      {isPopup && <Popup 
        description='Durch die Bestätigung werden Sie zur Hauptseite weitergeleitet. Ihre vorherigen Einstellungen werden zurückgesetzt' 
        onConfirm={onConfirm}
        onCancel={onCancel}
        />}
    </>
  )
}
