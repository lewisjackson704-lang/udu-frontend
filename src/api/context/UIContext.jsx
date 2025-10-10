import React, { createContext, useState, useContext } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [showFloatingWheel, setShowFloatingWheel] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [overlayActive, setOverlayActive] = useState(false);

  /**
   * Toggles the visibility of the floating wheel.
   */
  const toggleWheel = () => {
    try {
      setShowFloatingWheel((prev) => !prev);
    } catch (error) {
      console.error("Error toggling floating wheel:", error);
    }
  };

  /**
   * Opens a modal by setting its name and activating the overlay.
   * @param {string} modalName - The name of the modal to open.
   */
  const openModal = (modalName) => {
    try {
      setActiveModal(modalName);
      setOverlayActive(true);
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  /**
   * Closes the currently active modal and deactivates the overlay.
   */
  const closeModal = () => {
    try {
      setActiveModal(null);
      setOverlayActive(false);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  return (
    <UIContext.Provider
      value={{
        showFloatingWheel,
        toggleWheel,
        activeModal,
        openModal,
        closeModal,
        overlayActive,
        setOverlayActive,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

/**
 * Custom hook for consuming the UIContext.
 * Ensures it is used within a valid UIProvider.
 */
export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
};
