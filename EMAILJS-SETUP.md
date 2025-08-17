# EmailJS Setup Instructions

## 🚀 Hướng dẫn thiết lập EmailJS để form liên hệ hoạt động

### 📋 Bước 1: Tạo tài khoản EmailJS
1. Truy cập [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Đăng ký tài khoản miễn phí
3. Verify email của bạn

### 📧 Bước 2: Thiết lập Email Service
1. Trong Dashboard, click **"Add New Service"**
2. Chọn email provider:
   - **Gmail** (recommended)
   - **Outlook** 
   - **Yahoo**
   - Hoặc SMTP custom
3. Nhập thông tin đăng nhập email
4. **Lưu Service ID** (ví dụ: `service_abc123`)

### 📝 Bước 3: Tạo Email Template
1. Click **"Create New Template"**
2. Thiết lập template:
   ```
   Subject: New Contact from {{from_name}}
   
   From: {{from_name}} ({{from_email}})
   Subject: {{subject}}
   
   Message:
   {{message}}
   
   ---
   Sent from Tuan Tran Portfolio
   ```
3. **Lưu Template ID** (ví dụ: `template_xyz789`)

### 🔑 Bước 4: Lấy Public Key
1. Vào **Account** → **General**
2. Copy **Public Key** (ví dụ: `abcXYZ123`)

### ⚙️ Bước 5: Cập nhật Configuration
Mở file `email-config.js` và thay đổi:

```javascript
const EMAIL_CONFIG = {
    PUBLIC_KEY: 'abcXYZ123',           // Thay bằng Public Key của bạn
    SERVICE_ID: 'service_abc123',      // Thay bằng Service ID của bạn  
    TEMPLATE_ID: 'template_xyz789'     // Thay bằng Template ID của bạn
};
```

### 🎯 Bước 6: Test Form
1. Mở website trong browser
2. Điền form liên hệ và submit
3. Kiểm tra email nhận được

## 📊 EmailJS Free Tier
- ✅ **200 emails/month** miễn phí
- ✅ **Unlimited templates**
- ✅ **Basic analytics**
- ✅ **Email delivery tracking**

## 🔧 Troubleshooting

### Lỗi thường gặp:
1. **"Public Key not valid"**
   - Kiểm tra lại Public Key trong Dashboard
   
2. **"Service not found"**
   - Verify Service ID chính xác
   
3. **"Template not found"**
   - Verify Template ID và template đã publish

4. **Email không nhận được**
   - Kiểm tra spam folder
   - Verify email service setup đúng

### Test Configuration:
```javascript
// Thêm vào console để test
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: 'Test User',
    from_email: 'test@email.com',
    subject: 'Test Subject',
    message: 'Test message'
}).then(response => {
    console.log('SUCCESS!', response);
}).catch(error => {
    console.log('FAILED...', error);
});
```

## 🎨 Features đã implement:
- ✅ **Form validation** (tất cả fields required)
- ✅ **Email validation** (regex check)
- ✅ **Loading states** (button disabled khi sending)
- ✅ **Success/Error notifications** (toast messages)
- ✅ **Form reset** sau khi gửi thành công
- ✅ **Professional styling** cho notifications
- ✅ **Multi-language support** (EN/VI)

## 📱 Responsive Design:
- ✅ Desktop, tablet, mobile optimized
- ✅ Touch-friendly notifications
- ✅ Accessible form elements

---

**🎯 Sau khi setup xong, form liên hệ sẽ gửi email trực tiếp đến `tranvantuanit210@gmail.com`**
