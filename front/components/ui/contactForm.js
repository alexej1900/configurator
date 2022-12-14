import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

import TinyURL from 'tinyurl';

import styles from './contactForm.module.scss';
import { useEffect, useState } from 'react';


export default function ContactForm({rooms, onConfirm, onCancel}) {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [link, setLink] = useState('');

  const form = useRef();

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

  const serialize = (form) => {
    // Setup our serialized data
    const serialized = [];
    // Loop through each field in the form
    for (let i = 0; i < form.elements.length; i += 1) {
      const field = form.elements[i];
      // eslint-disable-next-line no-continue
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (let n = 0; n < field.options.length; n += 1) {
          // eslint-disable-next-line no-continue
          if (!field.options[n].selected) continue;
          serialized.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.options[n].value)}`);
        }
      } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`);
      }
    }
    return serialized.join('&');
  };

  const submitContactForm = async(ev) => {
    ev.preventDefault();
    // submitButton.disabled = true;

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://lora-quartier.ch/', true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // xhr.onload = () => {
    //   if (xhr.status === 200) {
    //     // formWrapper.classList.add('hidden');
    //     // formSuccess.classList.remove('hidden');
    //     alert('Success');
    //   } else if (xhr.status === 404) {
    //     alert('Error: your message was not sent');
    //   }
    // };
    // xhr.send(serialize(ev.target));

    // const csrfToken = getCsrfToken('CRAFT_CSRF_TOKEN')

    // await fetch('https://staging.immokonfigurator.ch/token', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     'Access-Control-Allow-Origin': '*',
    //     'Accept': 'application/json',
    //     'access-control-expose-headers': 'access-control-allow-headers',
    //   },
    //   mode: 'no-cors',
    //   }).then((result) => console.log('result',...result.headers));

    await fetch('https://staging.immokonfigurator.ch/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
      },
      mode: 'no-cors',
      // 'CRAFT_CSRF_TOKEN': csrfToken,
      body: serialize(ev.target)
      })
      // .then((res) => res.json())
      .then((result) => console.log(result));

      // // .then(json)
      // .then(function (data) {
      // console.log('Request succeeded with JSON response', data);
      // })
      // .catch(function (error) {
      // console.log('Request failed', error);
      // });

  };

  // contact.addEventListener('submit', submitContactForm);


  return (
    <>
      <section className={`${styles.contactForm}`}>
        <div className={styles.text__inner}>
          
          <div className={styles.formular}>
            
            <form method="post" className={styles.form} ref={form} onSubmit={(e) => {
                  onConfirm();
                  submitContactForm(e)
                }}> 
              <input 
                type="hidden" 
                name="user_link"
                value={link}
              />  
              <input 
                type="hidden" 
                name="fromEmail"
                id="fromEmail"
                value={'info@immokonfigurator.com'}
              />      
              <input 
                type="hidden" 
                name="fromName"
                value={`${name} ${surname}`} 
              />
              <input 
                type="text" 
                placeholder="Name" 
                name="user_name"
                id='messege'
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Vorname" 
                name="fromSurname"
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
              />
              <input 
                type="email" 
                placeholder="Emailadresse" 
                pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$" 
                name="message[Mail]"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={styles.clienEmail}
              />
              <input 
                type="tel" 
                placeholder="Telefonnummer" 
                pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                name="message[Phone]"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className={styles.clienPhone}
              />

              <div className={`${styles.form_buttons}`}>
                <div className={`${styles.form_button} ${styles.button__cancel}`} onClick={onCancel}>Abbrechnen</div>
                <button type="submit" className={`${styles.form_button} ${styles.button__confirm}`} >Bestätigen</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
