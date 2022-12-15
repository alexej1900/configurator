
import styles from './loadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}>
      </div>
    </div>
  );
}