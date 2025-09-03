//helper function for drupalSettings info
const getDrupalSettings = () => ({
  API: window.drupalSettings?.movieMania || {},
  CSRF_TOKEN: window.drupalSettings?.csrfToken || "",
});

export const saveUser = async (payload) => {
  const{API, CSRF_TOKEN} = getDrupalSettings();
  
  const response = await fetch(`${API.save_info}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": CSRF_TOKEN,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to save user");
  }

  return await response.json();
};