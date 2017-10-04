import React from 'react'

export function Icon ({iconName, alt}) {
  return <svg className={'icon icon-'+iconName}>
    <use xlinkHref={'symbol-defs.svg#icon-'+iconName}></use>
  </svg>
}
