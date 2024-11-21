function php_email_form_submit(thisForm, action, formData) {
  fetch(action, {
    method: 'POST',
    body: formData,
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the response as JSON
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`);
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.ok) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
}
