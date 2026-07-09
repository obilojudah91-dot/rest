# Smart Foods - External Services Setup Guide

This guide helps you set up the third-party services required for Smart Foods: Cloudinary (images), Stripe (payments), and Gmail (email).

## 1. Cloudinary - Image Storage

Cloudinary handles image uploads and storage for products, gallery, user avatars, etc.

### Setup

1. **Sign Up**
   - Go to https://cloudinary.com
   - Click "Sign Up" → "Create account"
   - Choose plan: Free tier ($25/month credit) is sufficient for testing

2. **Get Credentials**
   - After login, go to Dashboard
   - Copy these three values:
     - **Cloud Name** (top of page)
     - **API Key** (under "API Keys" section)
     - **API Secret** (under "API Keys" section)

3. **Add to Environment Variables**
   
   **For Render Backend**:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   **For Local Development** (in `backend/.env`):
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Test Upload**
   - Use the Cloudinary Console to test uploads
   - Or test via backend API once deployed

### Features Unlocked
- Product image uploads
- Gallery image uploads
- User avatar uploads
- Image transformations (resize, optimize)

---

## 2. Stripe - Payment Processing

Stripe handles credit card payments for online orders.

### Setup

1. **Sign Up**
   - Go to https://stripe.com
   - Click "Sign Up"
   - Choose "For your company"
   - Fill in business details

2. **Get Test Keys**
   - Go to Dashboard
   - Click "Developers" (top right)
   - Click "API Keys" in sidebar
   - You'll see two sets of keys:
     - **Test Keys** (for development)
     - **Live Keys** (for production)
   
   Copy the **Test Keys**:
   - **Publishable Key** starts with `pk_test_`
   - **Secret Key** starts with `sk_test_`

3. **Add to Environment Variables**
   
   **For Render Backend** (use test keys for staging):
   ```
   STRIPE_SECRET_KEY=sk_test_your_test_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
   ```

   **For Vercel Frontend**:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
   ```

   **For Local Development** (in both `backend/.env` and `frontend/.env.local`):
   ```env
   # Backend
   STRIPE_SECRET_KEY=sk_test_your_test_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
   
   # Frontend
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
   ```

4. **Test Payments**
   - Use Stripe test cards during development:
     - **Success**: `4242 4242 4242 4242`
     - **Decline**: `4000 0000 0000 0002`
     - **Require auth**: `4000 0025 0000 3155`
   - Any expiry date in future works (e.g., 12/25)
   - Any 3-digit CVC (e.g., 123)

5. **Switch to Live Keys**
   - When ready for production, replace test keys with live keys
   - Live keys start with `pk_live_` and `sk_live_`
   - **IMPORTANT**: Never commit live keys to repository
   - Only store in Render and Vercel environment variables

### Features Unlocked
- Credit card payments
- Payment processing
- Invoice generation
- Refund handling

### Test Workflow
1. Place order on frontend using test card `4242 4242 4242 4242`
2. Should succeed and create payment record
3. Check Stripe Dashboard → Payments to see transaction
4. Test refund via admin dashboard

---

## 3. Gmail - Email Service

Gmail sends email notifications for orders, reservations, and password resets.

### Setup

1. **Prepare Gmail Account**
   - Sign in to https://myaccount.google.com
   - Enable 2-Step Verification:
     - Left sidebar → Security
     - Click "2-Step Verification"
     - Follow setup process

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select **App**: Mail
   - Select **Device**: Windows Computer (or your device)
   - Click **Generate**
   - Copy the 16-character password shown (spaces included)

3. **Add to Environment Variables**
   
   **For Render Backend**:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EMAIL_FROM=noreply@smartfoods.com
   ```

   **For Local Development** (in `backend/.env`):
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EMAIL_FROM=noreply@smartfoods.com
   ```

4. **Test Email**
   - Create an order as customer
   - Should receive order confirmation email
   - Check spam folder if not in inbox

### Features Unlocked
- Order confirmation emails
- Reservation confirmation emails
- Password reset emails
- Notification emails
- Staff alerts

### Email Templates
Smart Foods will send emails for:
- **Order Confirmation**: When order is placed
- **Order Status Update**: When order status changes
- **Password Reset**: When user requests password reset
- **Welcome Email**: When new account is created (optional)

### Troubleshooting

**"App password not working"**
- Ensure 2FA is enabled first
- Regenerate password at myaccount.google.com/apppasswords
- Use exact 16-character password (with spaces)
- Restart backend after changing password

**"Emails not sending"**
- Check backend logs for errors
- Verify email credentials in environment variables
- Test with direct Gmail SMTP: `telnet smtp.gmail.com 587`
- Check Gmail "Less secure app access" isn't blocking (if using old method)

---

## 4. Optional Services

### Reddit or Firebase for Analytics
- Not required for MVP
- Can add later for advanced analytics

### SendGrid for Email (Alternative)
- If Gmail doesn't work, try SendGrid (free tier)
- Similar setup process
- Update `EMAIL_HOST` and `EMAIL_USER` in environment variables

---

## Environment Variables Summary

### All External Services - Complete List

```env
# CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# STRIPE (use test keys for staging)
STRIPE_SECRET_KEY=sk_test_your_test_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here

# EMAIL (Gmail with app password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=noreply@smartfoods.com
```

---

## Timeline for Setup

1. **Day 1**: Create Cloudinary and Stripe accounts (~15 min)
2. **Day 1**: Set up Gmail app password (~10 min)
3. **Day 1**: Add all environment variables to `.env` files (~5 min)
4. **Day 2**: Test locally with sample data (~30 min)
5. **Day 2**: Deploy to Render and test (~20 min)
6. **Day 2**: Deploy to Vercel and test end-to-end (~20 min)

**Total Setup Time**: ~2 hours

---

## Testing Each Service

### Test Cloudinary
```bash
curl -X POST https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload \
  -F "file=@test.jpg" \
  -F "api_key=YOUR_API_KEY"
```

### Test Stripe
- Login to Stripe Dashboard
- Go to Developers → Webhooks
- You should see webhook events from your application

### Test Gmail
- Create order in frontend
- Check email inbox for confirmation
- Check spam folder if missing

---

## Moving to Production

When deploying to production:

### 1. Update Stripe Keys
```env
# Change from test to live
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
```

### 2. Update Email
- Set up custom domain email (optional)
- Or use separate production Gmail account
- Update `EMAIL_USER` and `EMAIL_PASSWORD` in Render

### 3. Verify All Settings
- [ ] Cloudinary credentials correct
- [ ] Stripe live keys set (not test keys!)
- [ ] Email service configured
- [ ] All environment variables in Render match production requirements

---

## Support

- **Cloudinary Help**: https://cloudinary.com/documentation
- **Stripe Docs**: https://stripe.com/docs
- **Gmail Setup**: https://support.google.com/accounts/answer/185833
- **SMTP Documentation**: https://support.google.com/mail/answer/7126229

---

**Next Steps**: 
1. Set up all three services now
2. Add credentials to `.env` files
3. Test locally
4. Deploy to Render and Vercel
5. Refer to [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for complete deployment steps
