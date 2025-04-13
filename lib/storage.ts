export function safeLocalStorageSet(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error: any) {
    console.error(`Error storing data in localStorage for key ${key}:`, error)
    return false
  }
}

/**
 * Safely retrieves a value from localStorage with error handling
 */
export function safeLocalStorageGet<T>(key: string, defaultValue: T): T {
  try {
    const storedValue = localStorage.getItem(key)
    if (storedValue === null) return defaultValue
    return JSON.parse(storedValue) as T
  } catch (error: any) {
    console.error(`Error retrieving data from localStorage for key ${key}:`, error)
    return defaultValue
  }
}

/**
 * Safely removes a value from localStorage with error handling
 */
export function safeLocalStorageRemove(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error: any) {
    console.error(`Error removing data from localStorage for key ${key}:`, error)
    return false
  }
}
