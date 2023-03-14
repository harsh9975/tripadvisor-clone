import React from 'react'
import BackDrop from '../Backdrop'
import styles from './modal.module.css'

const Modal = ({onClose,children}) => {
  return (
    <>
    <div className={styles.modal}>{children}</div>
    <BackDrop onClick={onClose}/>
    </>
    
  )
}

export default Modal