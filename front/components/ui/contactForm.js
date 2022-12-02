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
  const [link, setLink] = useState('');

  const state = useSelector(state => state)

  useEffect(() => {
    madeUrl()
  }, []);


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
