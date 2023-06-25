import styles from './styles.module.css'

export function ModalTaskHero({ children }) {
  return (
    <div className={styles.hero_modal__overlay}>
      <div className={styles.hero_modal}>{children}</div>
    </div>
  )
}
