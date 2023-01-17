import styles from './popup.module.scss';

export default function Popup ({ children, onConfirm, onCancel, buttonIsVisible}) {
  return (
    <div className={styles.popup} id='popup'>

      <div className={styles.popup__form}>
        <div className={styles.popup__form_closeBtn} onClick={onCancel}>
          <img src={'/close.svg'} width="26px" height="26px" alt="Close icon"/>
        </div>
        <div className={styles.popup__form_description}>
          {children}
        </div>

        {buttonIsVisible && <div className={`${styles.popup__form_buttons}`}>
          <div className={`${styles.popup__form_button} ${styles.button__cancel}`} onClick={onCancel}>Abbrechnen</div>
          <div className={`${styles.popup__form_button} ${styles.button__confirm}`} onClick={onConfirm}>Bestätigen</div>
        </div>}
        
      </div>
     
    </div>  
  )
}
