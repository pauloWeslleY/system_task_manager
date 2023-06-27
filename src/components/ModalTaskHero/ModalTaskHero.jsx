import React, { Component } from 'react'

import styles from './styles.module.css'

export class ModalTaskHero extends Component {
  render() {
    return (
      <div className={styles.hero_modal__overlay}>
        <div className={styles.hero_modal}>{this.props.children}</div>
      </div>
    )
  }
}
