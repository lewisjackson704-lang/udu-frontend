/**
 * Utility to Save Data to Local Storage
 * @param {string} key - The storage key
 * @param {any} value - The value to store
 * @throws {Error} If the storage operation fails
 */
export const saveToStorage = (key, value) => {
  try {
    if (!key) throw new Error("Storage key is required.");
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Failed to save to storage:", error.message);
    throw error;
  }
};

/**
 * Utility to Retrieve Data from Local Storage
 * @param {string} key - The storage key
 * @returns {any|null} - The parsed value or null if the key doesn't exist
 * @throws {Error} If parsing the stored value fails
 */
export const getFromStorage = (key) => {
  try {
    if (!key) throw new Error("Storage key is required.");
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Failed to retrieve from storage:", error.message);
    return null; // Gracefully return null on error
  }
};

/**
 * Utility to Remove Data from Local Storage
 * @param {string} key - The storage key
 * @throws {Error} If the removal operation fails
 */
export const removeFromStorage = (key) => {
  try {
    if (!key) throw new Error("Storage key is required.");
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove from storage:", error.message);
    throw error;
  }
};
