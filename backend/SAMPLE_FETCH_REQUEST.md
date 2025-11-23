# Sample Fetch Request for React Contact Form

## Basic Fetch Request

```javascript
async function submitContactForm(data) {
  const res = await fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}
```

## Complete Example with Error Handling

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Success handling
      alert('Message sent successfully!');
      // Reset form
    } else {
      // Error handling
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    // Network error handling
    console.error('Network error:', error);
    alert('Failed to send message. Please try again.');
  }
};
```

## Using with React State

```javascript
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);
  setSuccess(false);

  try {
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setSuccess(true);
      // Reset form
    } else {
      setError(data.error);
    }
  } catch (error) {
    setError('Network error. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```
