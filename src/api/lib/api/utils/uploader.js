/**
 * Utility to Upload a File
 * Handles file uploads securely and ensures proper error handling.
 *
 * @param {File} file - The file to be uploaded.
 * @param {string} uploadUrl - The URL to which the file will be uploaded.
 * @param {Object} [extraHeaders={}] - Optional additional headers for the request.
 * @returns {Promise<Object>} - The JSON response from the server.
 * @throws {Error} - Throws an error if the upload fails.
 */
export const uploadFile = async (file, uploadUrl, extraHeaders = {}) => {
  // Validate inputs
  if (!(file instanceof File)) {
    throw new Error("Invalid file provided. Expected a File object.");
  }
  if (typeof uploadUrl !== "string" || !uploadUrl.startsWith("http")) {
    throw new Error("Invalid upload URL provided.");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        ...extraHeaders, // Include optional headers, e.g., authentication tokens
      },
      body: formData,
    });

    // Check response status
    if (!res.ok) {
      const errorText = await res.text();
      const errorMessage = `Upload failed with status ${res.status}: ${errorText}`;
      throw new Error(errorMessage);
    }

    return await res.json();
  } catch (error) {
    console.error("File upload error:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};
