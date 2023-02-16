const addToLocal = (key, data) => {
  try {
    localStorage.setItem(key, data)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const readFromLocal = (key) => {
  return localStorage.getItem(key)
}

const removeFromLocal = (key) => {
  return localStorage.removeItem(key)
}

const clearLocal = () => {
  return localStorage.clear()
}
