// EmailJS Configuration
// Bạn cần thay đổi các values này sau khi setup EmailJS account

const EMAIL_CONFIG = {
    // Từ EmailJS Dashboard: https://dashboard.emailjs.com/admin
    PUBLIC_KEY: 'TDsNnpYYDEGLKMx0J', // User ID từ EmailJS
    SERVICE_ID: 'service_7a71upf', // Service ID (Gmail, Outlook, etc.)
    TEMPLATE_ID: 'template_yi7drz7' // Template ID cho email
};

// EmailJS Service
class EmailService {
    constructor() {
        this.init();
    }

    init() {
        // Initialize EmailJS với public key
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
        }
    }

    async sendEmail(formData) {
        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'tranvantuanit210@gmail.com' // Email nhận - giữ nguyên personal email
            };

            const response = await emailjs.send(
                EMAIL_CONFIG.SERVICE_ID,
                EMAIL_CONFIG.TEMPLATE_ID,
                templateParams
            );

            const isVietnamese = document.documentElement.lang === 'vi';
            return {
                success: true,
                message: isVietnamese ? 'Email đã được gửi thành công!' : 'Email sent successfully!',
                response
            };
        } catch (error) {
            console.error('EmailJS Error:', error);
            const isVietnamese = document.documentElement.lang === 'vi';
            return {
                success: false,
                message: isVietnamese ? 'Gửi email thất bại. Vui lòng thử lại.' : 'Failed to send email. Please try again.',
                error
            };
        }
    }
}

// Form Handler
class ContactFormHandler {
    constructor() {
        this.emailService = new EmailService();
        this.form = document.getElementById('contactForm');
        this.submitButton = null;
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.submitButton = this.form.querySelector('.btn-submit');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Send email
            const result = await this.emailService.sendEmail(data);

            if (result.success) {
                this.showNotification('success', result.message);
                this.form.reset();
            } else {
                this.showNotification('error', result.message);
            }
        } catch (error) {
            this.showNotification('error', 'An unexpected error occurred.');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm(data) {
        const { name, email, subject, message } = data;
        const isVietnamese = document.documentElement.lang === 'vi';

        if (!name || !email || !subject || !message) {
            const errorMsg = isVietnamese 
                ? 'Vui lòng điền đầy đủ tất cả các trường.' 
                : 'Please fill in all fields.';
            this.showNotification('error', errorMsg);
            return false;
        }

        if (!this.isValidEmail(email)) {
            const errorMsg = isVietnamese 
                ? 'Vui lòng nhập địa chỉ email hợp lệ.' 
                : 'Please enter a valid email address.';
            this.showNotification('error', errorMsg);
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setLoadingState(loading) {
        if (!this.submitButton) return;

        const btnText = this.submitButton.querySelector('.btn-text');
        const btnIcon = this.submitButton.querySelector('.btn-icon i');
        
        // Detect language based on HTML lang attribute
        const isVietnamese = document.documentElement.lang === 'vi';
        
        if (loading) {
            this.submitButton.disabled = true;
            this.submitButton.classList.add('loading');
            if (btnText) {
                btnText.textContent = isVietnamese ? 'Đang gửi...' : 'Sending...';
            }
            if (btnIcon) {
                btnIcon.className = 'fas fa-clock';
            }
        } else {
            this.submitButton.disabled = false;
            this.submitButton.classList.remove('loading');
            if (btnText) {
                btnText.textContent = isVietnamese ? 'Gửi tin nhắn' : 'Send Message';
            }
            if (btnIcon) {
                btnIcon.className = 'fas fa-paper-plane';
            }
        }
    }

    showNotification(type, message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
}

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
});

// CSS cho notifications (inject vào head)
const notificationCSS = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 350px;
}

.notification.notification-success {
    background: linear-gradient(135deg, #10b981, #059669);
    border-left: 4px solid #047857;
}

.notification.notification-error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    border-left: 4px solid #b91c1c;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.notification-content i {
    font-size: 1.1rem;
}

.btn-submit.loading {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-submit.loading .btn-bg {
    background: linear-gradient(135deg, #64748b, #475569);
}
</style>
`;

// Inject CSS
document.head.insertAdjacentHTML('beforeend', notificationCSS);
