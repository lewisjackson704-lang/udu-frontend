/**
 * Utility to format numbers with compact notation
 * @param {number} num - The number to format
 * @param {string} [locale="en-US"] - The locale to use for formatting
 * @returns {string} - The formatted number
 */
export const formatNumber = (num, locale = "en-US") => {
  if (typeof num !== "number") {
    console.warn("formatNumber expects a number as input.");
    return "N/A";
  }

  return new Intl.NumberFormat(locale, { notation: "compact" }).format(num);
};

/**
 * Utility to format dates
 * @param {string|Date} date - The date to format
 * @param {string} [locale="en-US"] - The locale to use for formatting
 * @param {Object} [options] - Additional options for date formatting
 * @returns {string} - The formatted date
 */
export const formatDate = (
  date,
  locale = "en-US",
  options = { month: "short", day: "numeric", year: "numeric" }
) => {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }

    return parsedDate.toLocaleDateString(locale, options);
  } catch (error) {
    console.warn("formatDate encountered an error:", error.message);
    return "Invalid Date";
  }
};
