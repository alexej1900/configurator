import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

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

  const sendEmail = (e) => {
    e.preventDefault();
    // console.log('result');
    // console.log('form.current', form.current);
    emailjs.sendForm('service_aos1en7', 'contact_form', form.current, '8qkbLqZrCzlRn69yP')
      .then((result) => {       
          console.log('Your mail is sent!');
      }, (error) => {
          console.log(error.text);
      });
  };

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

  // Ajax call to submit the form and show the success page
  const submitContactForm = (ev) => {
    ev.preventDefault();
    submitButton.disabled = true;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = () => {
      if (xhr.status === 200) {
        formWrapper.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      } else if (xhr.status === 404) {
        alert('Error: your message was not sent');
      }
    };
    xhr.send(serialize(ev.target));
  };

  // contact.addEventListener('submit', submitContactForm);











  return (
    <>
      <section className={`${styles.contactForm}`}>
        <div className={styles.text__inner}>
          
          <div className={styles.formular}>
            
            <form className={styles.form} ref={form}> 
            <input 
                type="hidden" 
                name="user_link"
                value={link}
              />              
              <input 
                type="text" 
                placeholder="Name" 
                name="user_name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Vorname" 
                name="user_surName"
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
              />
              <input 
                type="email" 
                placeholder="Emailadresse" 
                pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$" 
                name="user_email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={styles.clienEmail}
              />
              <input 
                type="tel" 
                placeholder="Telefonnummer" 
                pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                name="user_tel"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className={styles.clienPhone}
              />

              <div className={`${styles.form_buttons}`}>
                <div className={`${styles.form_button} ${styles.button__cancel}`} onClick={onCancel}>Abbrechnen</div>
                <div className={`${styles.form_button} ${styles.button__confirm}`} onClick={(e) => {
                  onConfirm();
                  sendEmail(e)
                  }}>Bestätigen</div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
