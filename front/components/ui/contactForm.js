import { useEffect, useState } from 'react';

import serialize from '../../utils/serialize';
import checkObjIsEmpty from '../../utils/checkObjIsEmpty';
import madeShortUrl from '../../utils/madeShortUrl';

import LoadingSpinner from './loadingSpinner';

import styles from './contactForm.module.scss';

export default function ContactForm({ onConfirm, onCancel }) {
  const [formValue, setFormValue] = useState(
    { name: '',
      surname: '',
      email: '',
      phone: ''
    });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(async () => {
    const shortURl = await madeShortUrl(window.location.href);
    setLink(shortURl);
  }, []);

  useEffect(() => {
    validate();
  },[formValue]);

  const validate = () => {
    const errors = {};

    if (!/^[A-Za-z]{1,32}$/i.test(formValue.name)) {
      errors.name = 'Please use only letters';
    }

    if (!/^[A-Za-z]{1,32}$/i.test(formValue.surname)) {
      errors.surname = 'Please use only letters';
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue.email)) {
      errors.email = 'Invalid email address';
    }

    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(formValue.phone)) {
      errors.phone = 'Invalid phone format';
    }

    const formValueKeys = Object.keys(formValue);

    formValueKeys.forEach(key => {
      if (!formValue[key]) {
        errors[key] = 'Required';
      } 
    })

    setErrors(errors)
  };

  const changeFormData = (data) => {
    setFormValue({...formValue, ...data});
  }

  const submitContactForm = async(ev) => {
    ev.preventDefault();
    
    if (!checkObjIsEmpty(errors)) return;
    setLoading(true);
    
    await fetch('https://staging.immokonfigurator.ch/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
      },
      mode: 'no-cors',
      body: serialize(ev.target)
      })
      .then((result) => {
        // console.log(result);
        setLoading(false);
        setShowSuccess(true);

        setTimeout(() => { 
          setShowSuccess(false);
          onConfirm();
         }, 2500);
      });
  }

  return (
    <>
      <section className={`${styles.contactForm}`}>
        <div className={styles.text__inner}>
          
          <div className={styles.formular}>
            {loading ? <LoadingSpinner/> :
              <form method="post" className={styles.form} onSubmit={(e) => submitContactForm(e)}> 

                <div className={`${styles.success__message}  ${showSuccess && styles.active}`}  >
                  <span>Vielen Dank f??r Ihr Interesse an einem Eigenheim im Appenzeller Huus. Unser Vermarkter wird mit Ihnen Kontakt aufnehmen.</span>
                </div>      

                <input type="hidden" name="user_link" value={link}/>  
                <input type="hidden" name="fromEmail" value={'info@immokonfigurator.com'}/>      
                <input type="hidden" name="fromName" value={`${formValue.name} ${formValue.surname}`} />

                <input 
                  type="text" 
                  placeholder="Name" 
                  name="name"
                  value={formValue.name} 
                  onChange={(e) => changeFormData({name: e.target.value})} 
                  className={errors.name && styles.contactForm__error}
                />
                {errors.name ? <div className={styles.errors}>{errors.name}</div> : null}
                <input 
                  type="text" 
                  placeholder="Vorname" 
                  name="surname"
                  value={formValue.surname} 
                  onChange={(e) => changeFormData({surname: e.target.value})} 
                  className={errors.surname && styles.contactForm__error}
                />
                {errors.surname ? <div className={styles.errors}>{errors.surname}</div> : null}
                <input 
                  type="email" 
                  placeholder="Emailadresse" 
                  name="message[Mail]"
                  value={formValue.email} 
                  onChange={(e) => changeFormData({email: e.target.value})} 
                  className={errors.email && styles.contactForm__error}
                />
                {errors.email ? <div className={styles.errors}>{errors.email}</div> : null}
                <input 
                  type="tel" 
                  placeholder="Telefonnummer" 
                  name="message[Phone]"
                  value={formValue.phone} 
                  onChange={(e) => changeFormData({phone: e.target.value})} 
                  className={errors.phone && styles.contactForm__error}
                />
                {errors.phone ? <div className={styles.errors}>{errors.phone}</div> : null}

                {!showSuccess && <div className={`${styles.form_buttons}`}>
                  <button className={`${styles.form_button} ${styles.button__cancel}`} onClick={onCancel}>Abbrechnen</button>
                  <button type="submit" className={`${styles.form_button} ${styles.button__confirm}`} disabled={!checkObjIsEmpty(errors) || loading}>Best??tigen</button>
                </div>
                }
              </form>
            }
          </div>
        </div>
      </section>
    </>
  )
}
