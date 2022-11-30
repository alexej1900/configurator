import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { useMutation} from '@apollo/client';

import TinyURL from 'tinyurl';
import validator from 'validator';

import { saveData } from '../../gql/index';

import styles from './contactForm.module.scss';
import { useEffect, useState } from 'react';

export default function ContactForm({rooms}) {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // console.log('router', router)
  const state = useSelector(state => state)

  useEffect(() => {
    madeUrl()
  }, []);

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

  const madeUrl = async() => {
    const longURL = window.location.href + '#' + JSON.stringify(state);
    
    TinyURL.shorten(longURL, function(shortURL, err) {
        if (err)
          console.log(err)
          setLink(shortURL);
      });
  }

  return (
    <>
      <section className={`${styles.contactForm}`}>
        <div className={styles.text__inner}>
          
          <div className={styles.formular}>
            
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
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
