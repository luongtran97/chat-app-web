export const localService = {
  setItem : (value, key) => {
    let dataJson = JSON.stringify(value)
    localStorage.setItem(dataJson, key)
  },
  getItem: (key) => {
    let dataJson = localStorage.getItem(key)
    return JSON.parse(dataJson)
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
  }
}