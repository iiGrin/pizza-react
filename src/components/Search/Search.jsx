import { useRef, useState } from 'react'
import styles from './Search.module.scss'
import { useDebounce } from '../../hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../store/slices/filtersSlice'

export const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const inputRef = useRef()

  const handleClearInput = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current.focus()
  }

  const updataSearchValue = useDebounce((value) => {
    dispatch(setSearchValue(value))
  }, 500)

  const handleChangeInput = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    updataSearchValue(newValue)
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24 "
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={handleChangeInput}
        className={styles.input}
        placeholder='Найдите свою пиццу...' />
      {value && (
        <svg
          onClick={handleClearInput}
          className={styles.closeIcon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18 17.94 6M18 18 6.06 6" />
        </svg>
      )}

    </div>
  )
}
