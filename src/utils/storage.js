// Storage utility with expiration support
export const storage = {
  set: (key, value, ttl = 0) => {
    const now = new Date()
    const item = {
      value,
      expires: ttl ? now.getTime() + ttl * 1000 : 0,
    }
    localStorage.setItem(key, JSON.stringify(item))
  },
  
  get: (key) => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null
    
    const item = JSON.parse(itemStr)
    const now = new Date()
    
    if (item.expires && now.getTime() > item.expires) {
      localStorage.removeItem(key)
      return null
    }
    
    return item.value
  },
  
  remove: (key) => {
    localStorage.removeItem(key)
  },
  
  clear: () => {
    localStorage.clear()
  }
}
