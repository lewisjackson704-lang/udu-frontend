/**
 * Upload a file securely to the server.
 * Handles both validation and error scenarios gracefully.
 *
 * @param {File} file - The file to be uploaded.
 * @param {string} uploadUrl - The URL to which the file will be uploaded.
 * @param {Object} [extraHeaders={}] - Optional additional headers for the request.
 * @returns {Promise<Object>} - The JSON response from the server.
 * @throws {Error} - Throws an error if the upload fails.
 */
export const uploadFile = async (file, uploadUrl, extraHeaders = {}) => {
  // Validate the file input
  if (!(file instanceof File)) {
    throw new Error("Invalid file provided. Expected a File object.");
  }

  // Validate the upload URL
  if (typeof uploadUrl !== "string" || !/^https?:\/\//.test(uploadUrl)) {
    throw new Error("Invalid upload URL provided. Must be a valid HTTP or HTTPS URL.");
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

    // Validate server response
    if (!res.ok) {
      const errorText = await res.text();
      const errorMessage = `Upload failed with status ${res.status}: ${errorText}`;
      throw new Error(errorMessage);
    }

    // Parse and return the JSON response
    return await res.json();
  } catch (error) {
    console.error("File upload error:", error.message);

    // Rethrow the error to ensure the caller can handle it
    throw new Error("Failed to upload the file. Please try again later.");
  }
};
