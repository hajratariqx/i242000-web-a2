// Like useState, but the value is saved in localStorage and restored on the next visit.
// `isValid` protects against old or broken saved data.
import { useEffect, useState } from 'react'
import { loadJSON, saveJSON } from '../utils/storage.js'

export function useLocalStorageState(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    const saved = loadJSON(key, initialValue)
    return isValid(saved) ? saved : initialValue
  })

  useEffect(() => {
    saveJSON(key, value)
  }, [key, value])

  return [value, setValue]
}
