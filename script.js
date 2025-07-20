document.addEventListener('DOMContentLoaded', function() {
    // Get the modal elements
    const contactModal = document.getElementById('contact-modal');
    const contactLink = document.getElementById('contact-link'); // "Contact" in nav
    const heroCtaButton = document.getElementById('hero-cta-button'); // "Get a Free Quote" in hero
    const closeButton = document.querySelector('.close-button');
    const navLinks = document.getElementById('nav-links'); // For closing mobile nav
    const menuToggle = document.querySelector('.menu-toggle'); // Mobile menu toggle button

    // Function to open the modal
    function openModal() {
        if (contactModal) { // Ensure modal element exists before trying to add class
            contactModal.classList.add('show');
            // Optional: Hide mobile nav if it's open when modal opens
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
            document.body.style.overflow = 'hidden'; // Prevent scrolling background when modal is open
        }
    }

    // Function to close the modal
    function closeModal() {
        if (contactModal) { // Ensure modal element exists before trying to remove class
            contactModal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling to background
        }
    }

    // Event listeners to open the modal
    if (contactLink) {
        contactLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior (scrolling/page jump)
            openModal();
        });
    }

    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior (scrolling/page jump)
            openModal();
        });
    }

    // Event listener to close the modal when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Event listener to close the modal if the user clicks outside of the modal content
    window.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            closeModal();
        }
    });

    // Handle form submission (this is still just a placeholder for now!)
    const modalContactForm = document.getElementById('modal-contact-form');
    if (modalContactForm) {
        modalContactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission (page reload)

            // --- Demo only: For now, we'll just show an alert and close the modal ---
            alert('Form submitted successfully! (This is a demo. In a real site, your message would be sent.)');
            closeModal(); // Close the modal
            modalContactForm.reset(); // Clear the form fields
            // --- End Demo ---

            /*
            // In a real application, you would send the form data to a server here.
            // For example, using the Fetch API:
            const formData = new FormData(modalContactForm);
            fetch('/your-form-submission-endpoint', { // Replace with your actual endpoint
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // or .text() if your server doesn't return JSON
            })
            .then(data => {
                console.log('Success:', data);
                alert('Thank you for your message! We will get back to you soon.');
                closeModal(); // Close modal on successful submission
                modalContactForm.reset(); // Clear form fields
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again.');
            });
            */
        });
    }

    // Mobile menu toggle functionality
    if (menuToggle && navLinks) { // Ensure both elements exist
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const expanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Smooth scrolling for internal links (excluding modal triggers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.id !== 'contact-link' && anchor.id !== 'hero-cta-button') { // Exclude modal triggers
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // Close mobile nav after clicking a link
                if (navLinks && navLinks.classList.contains('active')) { // Ensure navLinks exists
                    navLinks.classList.remove('active');
                    if (menuToggle) { // Ensure menuToggle exists
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        }
    });
});