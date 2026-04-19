(function () {
  function clearErrors() {
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (f) { f.classList.remove('error'); });
    document.querySelectorAll('.field-error').forEach(function (el) { el.textContent = ''; el.classList.remove('show'); });
  }

  function showFieldError(fieldId, msg) {
    var field = document.getElementById(fieldId);
    var errEl = document.getElementById(fieldId + 'Error');
    if (field) field.classList.add('error');
    if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
  }

  window.handleSubmit = function (e) {
    e.preventDefault();
    if (document.getElementById('_trap').value) return;
    clearErrors();

    var firstName = document.getElementById('firstName').value.trim();
    var lastName  = document.getElementById('lastName').value.trim();
    var email     = document.getElementById('email').value.trim();
    var business  = document.getElementById('business').value.trim();
    var interest  = document.getElementById('interest').value;

    var hasError = false;
    if (!firstName) { showFieldError('firstName', 'First name is required.'); hasError = true; }
    if (!lastName)  { showFieldError('lastName',  'Last name is required.');  hasError = true; }
    if (!email) {
      showFieldError('email', 'Email address is required.'); hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError('email', 'Please enter a valid email address.'); hasError = true;
    }
    if (!business)  { showFieldError('business', 'Business name is required.'); hasError = true; }
    if (!interest)  { showFieldError('interest', 'Please select a service.');    hasError = true; }

    if (hasError) return;

    var submitBtn = document.querySelector('.form-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    var formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: document.getElementById('phone').value || 'Not provided',
      business: business,
      interest: interest,
      message: document.getElementById('message').value || 'No additional message.'
    };

    fetch('https://formspree.io/f/xvzdpapk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(function (res) {
      if (res.ok) {
        document.getElementById('contactFormWrapper').style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
      } else {
        return res.json().then(function (data) { throw new Error(data.error || 'Submission failed.'); });
      }
    })
    .catch(function () {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email isaac@isaacsdigital.com directly.');
    });
  };
}());
