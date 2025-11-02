# 🌐 Framestack

Framestack is a full-stack **website development platform** that allows clients to **register, purchase plans, order custom websites, and track their progress** — all in one place. It’s designed to function like **Wix**, but with a personalized developer-driven experience.

---

## 🚀 Features

- **User Authentication:** Clients can register, log in, and manage their accounts securely.  
- **Plans & Pricing:** Browse and purchase website development plans (Basic, Pro, Premium).  
- **Order Management:** Clients can submit detailed website requirements and place orders.  
- **Order Tracking Dashboard:** Track order progress (Pending → In Progress → Completed → Delivered).  
- **Email Notifications:** Automatic updates for registration, order confirmation, and progress.  
- **Admin Panel:** Admins can manage users, plans, and orders through a dedicated portal.  
- **Payment Integration (Coming Soon):** Razorpay/Stripe for smooth online payments.  
- **AI Website Builder (Future Scope):** Generate website templates using AI assistance.

---

## 🛠️ Tech Stack

**Frontend:** React (Vite)  
**Backend:** Django REST Framework  
**Database:** PostgreSQL / MySQL  
**Email Service:** Brevo (SMTP)  
**Hosting:** Render (Frontend + Backend)

---

## 📦 Project Structure

```
Framestack/
├── frontend/        # React + Vite app
├── backend/         # Django REST Framework API
├── static/          # Static files
├── media/           # Uploaded files
└── README.md
```

---

## ⚙️ Installation & Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Make sure to create a `.env` file in both **frontend** and **backend** with your environment variables (API URLs, SMTP credentials, etc.).

---

## 📧 Email Notifications

Framestack uses **Brevo SMTP** to send:
- Order confirmation mails  
- Status update mails  
- Delivery notifications  

---

## 🔒 Environment Variables (Example)

**Backend (.env):**
```
DEBUG=True
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_brevo_login_email
EMAIL_HOST_PASSWORD=your_brevo_smtp_key
```

**Frontend (.env):**
```
VITE_API_END_POINT=https://framestackbackend.onrender.com/api/v1
```

---

## 🧑‍💼 Admin Features
- Manage all client accounts  
- Create/Edit/Delete pricing plans  
- View and update order statuses  
- Send custom email notifications  

---

## 💡 Future Improvements
- Razorpay/Stripe integration for payments  
- AI-powered website builder  
- Client chat/ticket system  
- Automated deployment of client websites  

---

## 📄 License
This project is developed and maintained by **Teja Vendra**.  
© 2025 Framestack. All rights reserved.
