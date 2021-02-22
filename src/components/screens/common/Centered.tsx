import { FunctionComponent } from 'react';
import styles from './centered.module.css';

export const Centered: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
