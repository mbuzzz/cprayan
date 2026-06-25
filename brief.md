# COMPREHENSIVE BRIEF: MANUAL PAYMENT VIA WHATSAPP SYSTEM  
## PT. Rayan Smart Kreatif  

---  

## 1. SYSTEM OVERVIEW & ARCHITECTURE  

### **1.1 Definisi Sistem**  

Sistem Manual Payment via WhatsApp adalah metode pembayaran sederhana dimana customer yang telah melakukan checkout dapat menghubungi tim PT. Rayan melalui aplikasi WhatsApp untuk melakukan proses pembayaran dengan panduan langsung dari tim.  

**Alasan Implementasi:**  
- Biaya rendah (tidak perlu payment gateway dengan fee)  
- Sesuai untuk market lokal Indonesia  
- Personal touch untuk customer  
- Fleksibel dalam menerima berbagai metode pembayaran  
- MVP (Minimum Viable Product) untuk launch awal  
- Dapat di-upgrade ke auto payment gateway di masa depan  

### **1.2 Stakeholders**  

**Customer:**  
- Membuat order di website  
- Menghubungi tim via WhatsApp  
- Melakukan pembayaran sesuai instruksi  
- Download produk digital setelah pembayaran verified  

**Admin/Team:**  
- Menerima order dari customer  
- Guide customer dalam memilih metode pembayaran  
- Verifikasi pembayaran dari customer  
- Konfirmasi payment di sistem  
- Trigger delivery produk digital  

**System:**  
- Track order status secara real-time  
- Generate nomor referensi unik  
- Manage deadline pembayaran (24 jam)  
- Send automated notifications  
- Handle expiry orders  

### **1.3 Key Requirements**  

**Functional Requirements:**  
- Generate unique reference number per order  
- Integrate dengan WhatsApp (click-to-chat)  
- Auto-generate order within 24 hours deadline  
- Track payment status progression  
- Send automated reminders (12 jam, 23 jam)  
- Verify payment oleh admin  
- Auto-deliver product digital after paid  
- Generate & send invoice  

**Non-Functional Requirements:**  
- Response time < 2 detik untuk order creation  
- WhatsApp integration real-time  
- Email delivery < 5 menit  
- Scalable untuk 1000+ orders/bulan  
- High availability (99.9% uptime)  
- Secure payment data handling  
- GDPR compliant  

---  

## 2. COMPLETE USER FLOW  

### **2.1 Customer Journey: Standard Flow**  

**Phase 1: Checkout Process**  

1. **Add Products to Cart**  
   - Customer browse produk di website  
   - Select produk dan quantity  
   - Add to cart  
   - Checkout button  

2. **Step 1 - Review Cart**  
   - Display semua items di cart  
   - Show subtotal, tax estimation  
   - Option untuk continue shopping atau proceed  
   - Clear button untuk empty cart  
   - Can modify quantity  

3. **Step 2 - Shipping Information**  
   - Form dengan fields:  
     - Full Name (required, text input)  
     - Email (required, email input dengan validation)  
     - Phone Number (required, format +62)  
     - Street Address (required, textarea)  
     - City/District (required, dropdown)  
     - Province (required, dropdown)  
     - Postal Code (required, numeric)  
     - Notes (optional, textarea)  
   - Auto-calculate shipping cost based on location  
   - Option untuk save address untuk pesanan berikutnya  
   - Shipping method selector (Standard 5-7 hari, Express 2-3 hari, Same-day)  
   - Update total amount berdasarkan shipping method  

4. **Step 3 - Payment Method Selection**  
   - Display 3 metode:  
     - Credit/Debit Card (Auto gateway - future)  
     - Bank Transfer (Auto gateway - future)  
     - Manual Payment via WhatsApp (CURRENT)  
   - Show icon, deskripsi, dan badge untuk setiap metode  
   - Select Manual Payment via WhatsApp  

**Phase 2: Manual Payment Page**  

5. **Order Information Display**  
   - Display generated Order ID (e.g., #ORD-20240115-0001)  
   - Display Reference Number (e.g., REF-ABC123XYZ)   
   - Show all order details:  
     - List produk dengan quantity dan price  
     - Subtotal  
     - Tax (10%)  
     - Shipping cost  
     - Discount (jika ada)  
     - Total Amount (prominently displayed)  
   - Display order summary card dengan sticky behavior di sidebar  

6. **WhatsApp Integration**  
   - Large button "Chat dengan Tim via WhatsApp"  
   - Button pre-filled dengan message template  
   - Message template include:  
     - Greeting  
     - Order ID & Reference number  
     - List produk yang dibeli  
     - Total amount  
     - Customer info (name, email, phone)  
     - Request untuk assist pembayaran  
   - Button warna WhatsApp green (#25D366)  
   - Secondary contact options:  
     - Call number  
     - Email address  
     - Office hours info  
   - Display payment methods tersedia di tim  

7. **Payment Timeline Info**  
   - Visual step-by-step guide:  
     1. Chat dengan team  
     2. Confirm details  
     3. Choose payment method  
     4. Make payment  
     5. Verification  
     6. Product delivered  
   - Include timing estimation (usually 5-15 menit)  

8. **Important Notes Section**  
   - Highlight key info:  
     - Payment deadline: 24 hours  
     - Confirmation via email  
     - Product delivery setelah verified  
     - Can extend deadline jika needed  
     - Support available during office hours  

9. **Click WhatsApp Button**  
   - Redirect ke WhatsApp dengan pre-filled message  
   - Message automatically populate dengan order details  
   - Order status di backend changed to "contact_requested"  
   - Track this interaction  

**Phase 3: Payment Communication**  

10. **Team Response (Admin Side)**  
    - Receive notification di WhatsApp group  
    - Verify customer identity & order details  
    - Confirm order information  
    - Provide payment instructions  
    - Send payment method details (bank account, e-wallet, dll)  
    - Answer customer questions  
    - Guide pembayaran step-by-step  

11. **Customer Makes Payment**  
    - Based on team guidance, customer choose payment method:  
      - Bank Transfer (BCA, Mandiri, BNI, Citibank, etc)  
      - E-Wallet (OVO, Dana, GoPay, Linkaja, etc)  
      - BNPL (Akulaku, Kredivo, dll)  
      - Cash pickup (untuk area tertentu)  
    - Customer melakukan transfer/pembayaran  
    - Send proof/screenshot ke team  

12. **Team Verification**  
    - Receive payment screenshot/proof  
    - Verify amount matches order total  
    - Verify bank/e-wallet identifier  
    - Check customer identity  
    - Mark order as "payment_verified" di backend  
    - System automatically updates to "paid"  
    - Team confirm ke customer via WhatsApp  

**Phase 4: Order Completion**  

13. **Auto-Delivery Process**  
    - System detect order marked as paid  
    - Generate download links untuk semua items  
    - Create secure download tokens  
    - Set download expiry (30 hari dari paid)  
    - Auto-send email dengan:  
      - Download links  
      - Invoice/receipt  
      - Product instructions/requirements  
      - Thank you message  
      - Support contact info  

14. **Customer Download**  
    - Customer receive email with download link  
    - Click download link  
    - Secure download dengan token verification  
    - Can download multiple times (within 30-day window)  
    - Track download activity  

15. **Order Completion**  
    - Order marked as "completed"  
    - Download history saved  
    - Invoice archived  
    - Available dalam customer dashboard  

---  

### **2.2 Customer Journey: Timeout/Expiry Flow**  

**Scenario: Customer tidak bayar dalam 24 jam**  

1. **Hour 12 Reminder**  
   - Automated reminder sent via WhatsApp (if no payment yet)  
   - Message include:  
     - Order details  
     - Reference number  
     - Amount pending  
     - Deadline countdown  
     - Link to chat team  
   - Also send email reminder  

2. **Hour 23 Final Reminder**  
   - Final urgent reminder  
   - Highlight: "Pesanan Anda akan expired dalam 1 jam"  
   - Include all order details  
   - Urgent tone  
   - Direct contact number  

3. **Hour 24 - Order Expired**  
   - Order marked as "cancelled"  
   - Customer notified via email  
   - Cannot download atau access order  
   - Option untuk "Re-order" dengan fresh order ID  
   - Inventory/stock return (if applicable untuk future)  

4. **Recovery Option**  
   - Customer dapat request extension (1-2 jam lebih)  
   - Contact team untuk extend deadline  
   - Team approve/reject extension  
   - If extended, send new deadline notification  

---  

### **2.3 Admin/Team Journey**  

**Daily Workflow:**  

1. **Morning - Check Pending Orders**  
   - Admin login ke dashboard  
   - View filter "Pending Manual Payment Orders"  
   - See list orders yang belum dibayar  
   - Prioritize based on timestamp (oldest first)  
   - Review order details  

2. **Receive WhatsApp Contact**  
   - Customer hubungi via WhatsApp dengan pre-filled message  
   - Receive notification di team WhatsApp group  
   - Review order info dari message  
   - Verify customer identity if needed  

3. **Confirm Order Details**  
   - Extract order ID & reference dari message  
   - Lookup order di system  
   - Verify customer info matches  
   - Send confirmation message ke customer  
   - Provide payment options  

4. **Guide Payment**  
   - Present available payment methods:  
     - Bank accounts (with display format)  
     - E-wallet numbers  
     - Instructions untuk BNPL  
     - Pickup options (if applicable)  
   - Specify reference number untuk transfer  
   - Answer customer questions  
   - Update order status to "awaiting_payment" di backend  

5. **Receive Payment Proof**  
   - Customer send screenshot/proof  
   - Review proof:  
     - Amount matches  
     - Reference/note includes order ID  
     - Bank/wallet identifier correct  
     - Timestamp reasonable  
   - Confirm dengan customer  

6. **Verify & Confirm Payment**  
   - Login ke admin dashboard  
   - Navigate to order detail  
   - Click "Verify Payment" button  
   - Fill form:  
     - Payment method used (dropdown)  
     - Amount received  
     - Payment reference/transaction ID  
     - Upload proof document (screenshot)  
     - Notes/comments  
   - System mark order as "payment_verified"  
   - System auto-mark as "paid"  
   - Email confirmation sent ke customer  
   - Download links auto-generated  

7. **Follow-up Pending Orders**  
   - Check orders approaching 24-hour deadline  
   - Send reminder messages  
   - Monitor for responses  
   - Mark cancelled orders yang expired  
   - Process refunds (if applicable)  

8. **End of Day Report**  
   - Review daily manual payment orders processed  
   - Check success rate  
   - Monitor any issues  
   - Plan follow-ups untuk next day  

---  

## 3. DATABASE STRUCTURE & DATA MODEL  

### **3.1 Orders Table - Key Fields**  

**Identifiers:**  
- `id` - Primary key  
- `order_number` - Business ID (ORD-20240115-0001)  
- `reference_number` - Customer-facing reference (REF-ABC123XYZ)  

**Customer Information:**  
- `customer_name` - Full name  
- `customer_email` - Email address  
- `customer_phone` - Phone number  
- `shipping_address` - Full address  
- `shipping_city` - City/district  
- `shipping_province` - Province/state  
- `shipping_postal_code` - Postal code  

**Order Details:**  
- `subtotal` - Sum of products (before tax/shipping)  
- `tax` - Tax amount (calculated)  
- `shipping_cost` - Shipping cost (based on method)  
- `discount` - Discount amount (if promo applied)  
- `total_amount` - Final amount to pay  

**Payment Information:**  
- `payment_method` - Type (auto_gateway / manual_whatsapp)  
- `payment_status` - Current status (pending, contact_requested, awaiting_payment, payment_verified, paid, failed, cancelled)  
- `payment_method_used` - Actual method used (bank_transfer, ewallet, cash, dll)  
- `payment_initiated_at` - When payment process started  
- `payment_verified_at` - When admin verified payment  
- `payment_notes` - Admin notes about payment  

**Order Status:**  
- `order_status` - Overall status (pending, processing, completed, cancelled, refunded)  

**Tracking Information:**  
- `payment_deadline` - Auto-calculated 24 hours from creation  
- `first_contact_at` - When customer first contacted via WA  
- `last_contact_at` - Latest contact time  
- `whatsapp_contact_count` - Track how many times customer clicked WA  
- `reminder_sent_at` - Track reminder emails sent  
- `expired_at` - When order expired  

**Metadata:**  
- `user_id` - User if registered, null untuk guest  
- `metadata` - JSON field untuk additional custom data  
- `created_at` / `updated_at` - Timestamps  
- `deleted_at` - Soft delete timestamp  

---  

### **3.2 Order Items Table**  

**Item Information:**  
- `id` - Primary key  
- `order_id` - Foreign key to orders  
- `product_id` - Foreign key to products  
- `product_name` - Name of product (denormalized)  
- `product_price` - Price at purchase time  
- `quantity` - Number of items  
- `subtotal` - Calculated total for this item  

**Digital Download:**  
- `download_url` - URL to download product  
- `download_token` - Secure token untuk validate download request  
- `download_expires_at` - When download link expires (30 hari)  
- `download_count` - Track how many times downloaded  
- `first_downloaded_at` - First download timestamp  
- `last_downloaded_at` - Latest download timestamp  

---  

### **3.3 Payment Verifications Table**  

**Tracking payment confirmations:**  
- `id` - Primary key  
- `order_id` - Which order  
- `verified_by_user_id` - Which admin verified  
- `amount_received` - Actual amount paid  
- `payment_method` - Method used (dropdown)  
- `payment_reference` - Bank ref atau transaction ID  
- `verification_notes` - Admin notes about verification  
- `proof_document` - JSON array dengan paths ke proof files (screenshot)  
- `verification_status` - verified / rejected / pending  
- `verified_at` - When verified  

**Purpose:**  
- Audit trail untuk payment verification  
- Track all verification attempts  
- Store proof documents untuk reference  
- Enable rejection dengan reason  

---  

### **3.4 Payment Reminders Table**  

**Automated reminders tracking:**  
- `id` - Primary key  
- `order_id` - Which order  
- `reminder_type` - whatsapp / email / both  
- `attempt_number` - Which reminder attempt (1st, 2nd, dll)  
- `sent_at` - When reminder was sent  
- `status` - pending / sent / failed  
- `error_message` - If failed, why  

**Purpose:**  
- Track reminder history  
- Prevent duplicate reminders  
- Log failures untuk investigation  
- Enable retry mechanism  

---  

## 4. FRONTEND COMPONENTS SPECIFICATION  

### **4.1 New Pages Required**  

**Page: Checkout Manual Payment**  
- **Purpose**: Main page setelah customer select manual payment method  
- **Location**: `/checkout/manual-payment`  
- **Components**:  
  - Order summary card (sticky sidebar)  
  - Reference number display dengan copy button  
  - Order details section (items, prices, totals)  
  - WhatsApp contact button (prominent)  
  - Contact methods display (email, phone, hours)  
  - Payment methods available  
  - Important notes section (24-hour deadline, etc)  
  - Timeline visual guide  

**Page: Order Detail/Status**  
- **Purpose**: Customer dapat track order status kapan saja  
- **Location**: `/orders/:id` atau `/dashboard/orders/:id`  
- **Components**:  
  - Order header (ID, reference, status)  
  - Status timeline (visual steps)  
  - Current status message  
  - Payment countdown timer (jika pending)  
  - Order items list  
  - Order summary  
  - Download links (jika completed)  
  - Contact button jika still pending  

---  

### **4.2 UI Components - New or Modified**  

**1. WhatsApp Button Component**  
- **Variants**: Primary action button  
- **Size**: sm, md, lg  
- **Color**: WhatsApp green (#25D366)  
- **Icon**: WhatsApp logo  
- **States**: Default, Hover, Active, Loading, Disabled  
- **Behavior**: Click → Open WhatsApp dengan pre-filled message  
- **Usage**: Checkout page, order status page, customer dashboard  

**2. Reference Number Display Component**  
- **Content**:   
  - Large monospace font  
  - Reference number highlighted  
  - Copy button dengan feedback  
  - Order ID display  
  - QR code (optional)  
- **Functionality**:  
  - Click to copy reference  
  - Visual feedback "Copied!"  
  - Timestamp display  
- **Usage**: Checkout page, confirmation, order status  

**3. Order Status Timeline Component**  
- **Visual**: Vertical timeline dengan 6-7 steps  
- **Steps**:   
  1. Order Created  
  2. Contact Sent/Requested  
  3. Awaiting Payment  
  4. Payment Verified  
  5. Paid  
  6. Processing  
  7. Completed  
- **Features**:  
  - Current step highlighted  
  - Completed steps dengan checkmark  
  - Step description text  
  - Timeline connector lines  
  - Status message untuk current step  
- **Interactivity**:   
  - Show/hide additional info per step  
  - Timestamps untuk completed steps  

**4. Payment Countdown Component**  
- **Display**: "Payment expires in: HH:MM:SS"  
- **Color**: Green → Amber → Red (based on time left)  
- **Update**: Every second  
- **Messaging**:   
  - Normal (24+ hours left)  
  - Urgent (1 hour left)  
  - Expired (time up)  
- **Usage**: Order status page (jika pending payment)  

**5. Order Summary Card Component**  
- **Content**:  
  - Products list dengan prices  
  - Subtotal  
  - Tax  
  - Shipping  
  - Discount (if applicable)  
  - Total (prominent)  
  - Order ID & Reference  
- **Layout**: Sticky sidebar (desktop), bottom section (mobile)  
- **States**:  
  - Show breakdown  
  - Collapsible (mobile)  
  - Print-friendly  

**6. Step Indicator Component**  
- **Display**: Progress through checkout steps  
- **Steps**: Cart Review → Shipping → Payment  
- **Features**:  
  - Current step highlighted  
  - Completed steps dengan checkmark  
  - Step label  
  - Percentage complete  
- **Responsive**: Horizontal (desktop), Vertical (mobile)  

**7. Payment Method Selector Component**  
- **Display**: Card-based selector untuk payment methods  
- **Options**:  
  - Credit/Debit Card (auto gateway - future)  
  - Bank Transfer (auto gateway - future)  
  - Manual WhatsApp (current)  
- **Per Option**:  
  - Icon  
  - Name & description  
  - Badge (jika recommended)  
  - Radio button selector  
- **Features**:  
  - Hover effect  
  - Selected state highlight  
  - Enable/disable based on availability  

**8. Manual Payment Info Component**  
- **Content**:  
  - Description tentang proses  
  - Step-by-step guide (6 steps)  
  - Contact information card  
  - Payment methods tersedia  
  - Important notes box  
  - Office hours  
- **Layout**: Card-based, easy to scan  
- **Styling**: Soft orange background, good contrast  

---  

### **4.3 Modified Components**  

**Checkout Page**  
- Add new step untuk payment method selection  
- Integrate WhatsApp flow  
- Handle both auto dan manual payment methods  

**Order Item Card**  
- Show download button (jika completed & paid)  
- Show expiry timer (jika downloading)  
- Show status badge (pending, paid, downloaded)  

**Navigation/Navbar**  
- Add link ke Orders/Dashboard  
- Show notification badge (pending orders count)  

---  

### **4.4 Form Validations - Frontend**  

**Checkout Forms:**  
- All required fields harus filled  
- Email format validation  
- Phone number format validation (must be +62 format)  
- Address fields not empty  
- Postal code numeric only  
- Shipping method selected  
- Payment method selected  

**Error Display:**  
- Inline error messages below fields  
- Red border pada field dengan error  
- Summary of errors at top  
- Disable submit button sampai valid  

---  

## 5. BACKEND LOGIC & SERVICES  

### **5.1 Order Creation Service**  

**Input:**  
- Cart items (product ID, quantity)  
- Shipping info (name, email, phone, address, etc)  
- Shipping method selected  
- Payment method selected (manual_whatsapp)  

**Process:**  
- Validate all input data  
- Calculate subtotal dari cart items  
- Calculate tax (10% of subtotal)  
- Calculate shipping cost based on method  
- Apply discount (jika applicable)  
- Calculate total = subtotal + tax + shipping - discount  
- Generate unique reference number (REF-XXXXX format)  
- Generate unique order number (ORD-YYYYMMDD-XXXX format)  
- Create order record di database  
- Create order items records (one per product)  
- Set payment_deadline = now + 24 hours  
- Set payment_status = "pending"  
- Set order_status = "pending"  
- Return order object dengan semua details  

**Output:**  
- Order object dengan ID, reference number, order details, totals  

---  

### **5.2 WhatsApp Contact Tracking Service**  

**Trigger:** Ketika customer click WhatsApp button  

**Process:**  
- Receive order ID  
- Update order:  
  - Set payment_status = "contact_requested"  
  - Set first_contact_at = now (jika belum set)  
  - Set last_contact_at = now  
  - Increment whatsapp_contact_count  
- Log event untuk analytics  
- Send confirmation email ke customer (optional)  
- Notify admin di backend (optional notification)  

**Output:**  
- Confirmation response  

---  

### **5.3 Payment Status Update Service**  

**Input:**  
- Order ID  
- New status (contact_requested, awaiting_payment, payment_verified, paid, failed, cancelled)  
- Optional: payment method, notes, metadata  

**Process:**  
- Validate order exists  
- Validate status transition valid (e.g., cannot go from paid → pending)  
- Update order dengan new status  
- Set appropriate timestamps based on status:  
  - awaiting_payment → set payment_initiated_at  
  - payment_verified → set payment_verified_at  
  - paid → set order_status = "processing", trigger product delivery  
- Log status change untuk audit trail  
- Send notification email jika significant change (e.g., paid)  
- Trigger relevant events/jobs  

**Output:**  
- Updated order object  

---  

### **5.4 Payment Verification Service**  

**Input:**  
- Order ID  
- Amount received  
- Payment method used  
- Payment reference/transaction ID  
- Proof document(s) - uploaded files/screenshots  
- Notes from admin  

**Process:**  
- Fetch order dari database  
- Validate order exists & payment_status = "awaiting_payment"  
- Validate amount received = order total_amount (exact match)  
- Validate payment method valid (bank_transfer, ewallet, dll)  
- Validate payment reference format jika applicable  
- Store payment verification record:  
  - Link to order  
  - Link to admin user  
  - Amount, method, reference  
  - Proof documents  
  - Status = "verified"  
  - Verified timestamp  
- Update order:  
  - payment_status = "payment_verified"  
  - payment_method_used = selected method  
  - payment_verified_at = now  
- Generate download links untuk order items  
- Trigger product delivery job  
- Send confirmation email ke customer  
- Notify admin (optional)  

**Output:**  
- Verification record created  
- Order marked as verified  

---  

### **5.5 Download Link Generation Service**  

**Input:**  
- Order ID  

**Process:**  
- Fetch order & order items  
- For each order item:  
  - Generate secure download token (HMAC-based)  
  - Create download URL dengan token  
  - Set download_expires_at = now + 30 days  
  - Save ke database  
  - Create download record (track ability)  
- Store all download URLs  
- Return list dengan all download details  

**Output:**  
- List download links dengan tokens & expiry info  

---  

### **5.6 Automated Reminder Service** (Job/Scheduler)  

**Trigger:** Scheduled job - every hour  

**Process:**  
- Query orders dengan payment_status = "pending" atau "awaiting_payment"  
- Filter untuk orders belum expired  
- For each order:  
  - Calculate time since creation  
  - If 12 hours elapsed & no reminder yet:  
    - Create reminder record (attempt_number = 1)  
    - Send WhatsApp reminder message  
    - Send email reminder  
    - Set status = "sent"  
    - Set reminder_sent_at = now  
  - If 23 hours elapsed & no 2nd reminder yet:  
    - Create reminder record (attempt_number = 2)  
    - Send urgent WhatsApp reminder  
    - Send urgent email  
    - Set status = "sent"  
- Handle failures & log  

**Output:**  
- Reminder records created  
- Notifications sent  

---  

### **5.7 Order Expiry Service** (Job/Scheduler)  

**Trigger:** Scheduled job - every 30 menit  

**Process:**  
- Query orders dengan payment_status belum "paid" atau "cancelled"  
- Filter untuk orders dengan payment_deadline < now  
- For each expired order:  
  - Update payment_status = "cancelled"  
  - Update order_status = "cancelled"  
  - Set expired_at = now  
  - Send expiry notification email ke customer  
  - Offer re-order option  
- Log expired orders  

**Output:**  
- Expired orders marked & notified  

---  

## 6. API ENDPOINTS SPECIFICATION  

### **6.1 Order Endpoints**  

**POST /api/orders**  
- **Purpose**: Create new order  
- **Auth**: Required (user) atau guest  
- **Input**: Cart items, shipping info, payment method  
- **Output**: Order object dengan reference number  
- **Status**: 201 Created  

**GET /api/orders/:id**  
- **Purpose**: Fetch order details  
- **Auth**: Required (owner or admin)  
- **Output**: Full order object dengan items, totals, status  
- **Status**: 200 OK  

**GET /api/orders**  
- **Purpose**: List customer's orders  
- **Auth**: Required  
- **Params**: Page, limit, status filter  
- **Output**: Paginated list of orders  
- **Status**: 200 OK  

**PUT /api/orders/:id/contact-requested**  
- **Purpose**: Track customer contact via WhatsApp  
- **Auth**: Public (track event)  
- **Output**: Updated order  
- **Status**: 200 OK  

---  

### **6.2 Payment Endpoints**  

**PUT /api/orders/:id/payment-status**  
- **Purpose**: Update payment status (admin only)  
- **Auth**: Required (admin)  
- **Input**: New status, optional metadata  
- **Output**: Updated order  
- **Status**: 200 OK  

**POST /api/orders/:id/verify-payment**  
- **Purpose**: Verify payment & mark paid  
- **Auth**: Required (admin)  
- **Input**: Amount, method, reference, proof documents  
- **Output**: Payment verification record, order marked paid  
- **Status**: 201 Created  

**GET /api/orders/:id/payment-status**  
- **Purpose**: Get current payment status (customer can check)  
- **Auth**: Required (owner)  
- **Output**: Current status, timeline, messages  
- **Status**: 200 OK  

---  

### **6.3 Download Endpoints**  

**GET /api/orders/:id/downloads**  
- **Purpose**: Get download links for order  
- **Auth**: Required (owner)  
- **Output**: List of download URLs dengan tokens  
- **Status**: 200 OK  

**GET /api/download/:token**  
- **Purpose**: Actual download endpoint  
- **Auth**: Token validation only  
- **Process**: Validate token, check expiry, track download, return file  
- **Output**: File stream  
- **Status**: 200 OK atau 404/410  

---  

### **6.4 Admin Endpoints**  

**GET /api/admin/orders**  
- **Purpose**: List all orders with filters  
- **Auth**: Required (admin)  
- **Params**: Page, limit, status filter, date range, search  
- **Output**: Paginated list all orders  
- **Status**: 200 OK  

**GET /api/admin/orders/:id**  
- **Purpose**: Full order details untuk admin  
- **Auth**: Required (admin)  
- **Output**: Order dengan all sensitive info, notes, activity log  
- **Status**: 200 OK  

**POST /api/admin/orders/:id/payment-verification**  
- **Purpose**: Admin verify payment  
- **Auth**: Required (admin)  
- **Input**: Payment details, proof  
- **Output**: Verification record created  
- **Status**: 201 Created  

**GET /api/admin/analytics/manual-payments**  
- **Purpose**: Analytics dashboard untuk manual payments  
- **Auth**: Required (admin)  
- **Output**: Stats (total, pending, verified, completed, expired)  
- **Status**: 200 OK  

---  

## 7. NOTIFICATION SYSTEM  

### **7.1 Email Notifications**  

**Email 1: Order Confirmation (Immediate)**  
- **To**: customer_email  
- **Subject**: "Order Confirmed - Ready to Pay via WhatsApp"  
- **Content**:  
  - Order details (ID, reference, products)  
  - Total amount  
  - Instructions untuk contact via WhatsApp  
  - WhatsApp number & button  
  - Payment deadline (24 hours)  
  - Contact support info  
- **Trigger**: Immediately after order creation  

**Email 2: Reminder - 12 Hours (Scheduled)**  
- **To**: customer_email (jika still pending)  
- **Subject**: "Reminder: Complete Your Payment"  
- **Content**:  
  - Order ID & reference  
  - Amount pending  
  - "Contact us on WhatsApp" button  
  - Payment deadline countdown  
  - Support contact  
- **Trigger**: 12 jam after order creation  

**Email 3: Urgent Reminder - 23 Hours (Scheduled)**  
- **To**: customer_email (jika still pending)  
- **Subject**: "URGENT: Your Order is Expiring Soon!"  
- **Content**:  
  - Order akan expire dalam 1 jam  
  - Highlighted deadline  
  - WhatsApp urgent link  
  - Call number  
  - Strong CTA untuk complete payment  
- **Trigger**: 23 jam after order creation  

**Email 4: Payment Verified (Immediate)**  
- **To**: customer_email  
- **Subject**: "Payment Received! ✓"  
- **Content**:  
  - Thank you message  
  - Payment verified confirmation  
  - Download link(s) untuk products  
  - Invoice attached  
  - Product requirements/instructions  
  - Support contact untuk issues  
- **Trigger**: When admin mark payment verified  

**Email 5: Order Expired (Scheduled)**  
- **To**: customer_email  
- **Subject**: "Your Order Has Expired"  
- **Content**:  
  - Order expired notification  
  - Deadline passed message  
  - Re-order option (new link)  
  - Ask untuk help/questions  
- **Trigger**: 24+ hours after creation tanpa payment  

---  

### **7.2 In-App Notifications**  

**Toast Notifications (Auto-dismiss):**  
- Order created successfully  
- WhatsApp link copied  
- Reference number copied  
- Payment status updated  
- Error messages  

**Modal/Persistent Notifications:**  
- Payment deadline warning (sticky)  
- Order expired message  
- Payment verified confirmation  

---  

### **7.3 Admin Notifications (Backend)**  

**New Order Notification**  
- Trigger: Immediately when order created  
- Method: Dashboard badge, email, Slack (optional)  
- Content: Order ID, customer, total amount  

**Customer Contacted via WhatsApp**  
- Trigger: When customer click WhatsApp button  
- Method: Dashboard notification, optional team alert  
- Content: Order ID, reference, customer name  

**Payment Verification Needed**  
- Trigger: None (manual - admin check)  
- Method: Dashboard "Pending Verification" tab  
- Content: List orders awaiting verification  

---  

## 8. SECURITY & DATA PROTECTION  

### **8.1 Input Validation**  

**Server-Side Validation:**  
- All form inputs validated on backend  
- Email format validation dengan RFC standard  
- Phone number format validation (must be Indonesian format)  
- Address fields not empty & reasonable length  
- Numeric fields checked untuk data type  
- Amount validation (must equal total)  
- Reference number format validation  

**Client-Side Validation:**  
- Real-time validation dengan user feedback  
- Prevent form submission jika invalid  
- Show error messages clearly  

### **8.2 Payment Security**  

**Amount Verification:**  
- Verify amount received = order total amount (exact match)  
- Prevent typos/discrepancies  
- Log all verification attempts  

**Reference Number Tracking:**  
- Unique reference per order (prevent duplicates)  
- Reference include dalam all communications  
- Verify reference dalam payment proof  

**Payment Proof Security:**  
- Require screenshot/proof document  
- Store proof documents securely  
- Verify proof shows correct amount & reference  
- Anti-tampering (visual inspection by human)  

### **8.3 Download Security**  

**Token-Based Downloads:**  
- Generate cryptographically secure tokens (HMAC-SHA256)  
- Token tied to specific order item & customer  
- Token expire after 30 days  
- Token single-use (optional - can allow multiple downloads within 30 days)  
- Download tracked (who, when, how many times)  
- Invalid token → 404 error  

**File Security:**  
- Files stored outside public directory  
- Access controlled via token validation  
- Prevent directory traversal attacks  
- Serve file dengan secure headers (no execute, download-only)  

### **8.4 Data Protection**  

**Sensitive Information:**  
- Never store full credit card numbers  
- Minimal PII storage (required fields only)  
- Payment proofs encrypted at rest  
- Customer data access logged  

**GDPR Compliance:**  
- Data download option (export customer data)  
- Data deletion option (account removal)  
- Privacy policy updated  
- Terms & conditions clarified  

### **8.5 Access Control**  

**Customer Can:**  
- View own orders only  
- Download own products only  
- Track own payment status  

**Admin Can:**  
- View all orders  
- Verify payments  
- Update status  
- Send notifications  
- View analytics  

**Role-Based:**  
- User role, Admin role, Superadmin role  
- Permissions per role defined  
- Access logged untuk audit  

---  

## 9. ERROR HANDLING & EDGE CASES  

### **9.1 Error Scenarios**  

**Customer Errors:**  
1. **Missing Fields in Checkout**  
   - Error message: "Mohon lengkapi semua field yang wajib diisi"  
   - Action: Highlight missing fields, disable submit  

2. **Invalid Phone Number**  
   - Error message: "Format nomor telepon tidak valid (harus +62...)"  
   - Action: Show example format, auto-format if possible  

3. **Order Already Expired**  
   - Error message: "Pesanan Anda telah kadaluarsa. Silakan buat pesanan baru"  
   - Action: Show re-order button/link  

4. **Cannot Access Other's Order**  
   - Error message: "Anda tidak memiliki akses ke pesanan ini"  
   - Action: Redirect ke dashboard  

5. **Download Token Expired**  
   - Error message: "Link download sudah kadaluarsa. Silakan hubungi support untuk link baru"  
   - Action: Show support contact info  

6. **Download Link Invalid/Tampered**  
   - Error message: "Link download tidak valid. Silakan coba lagi"  
   - Action: Log suspicious activity, offer support help  

---  

### **9.2 Admin Errors**  

1. **Payment Amount Mismatch**  
   - Warning: "Jumlah pembayaran tidak sesuai dengan total order (Expected: Rp X, Received: Rp Y)"  
   - Action: Require admin clarification before confirming  

2. **Missing Proof Document**  
   - Error: "Silakan upload bukti pembayaran (screenshot)"  
   - Action: Disable submit button  

3. **Duplicate Payment Verification**  
   - Warning: "Order ini sudah pernah diverifikasi sebelumnya"  
   - Action: Show previous verification details, confirm if creating new one  

4. **Cannot Update Expired Order**  
   - Error: "Pesanan ini sudah expired dan tidak bisa diupdate"  
   - Action: Show only view/cancel options  

---  

### **9.3 System Errors**  

1. **Email Send Failed**  
   - Action: Retry with exponential backoff (1 min, 5 min, 15 min)  
   - Log error untuk investigation  
   - Alert admin jika continues to fail  

2. **WhatsApp API Down**  
   - Fallback: Show manual phone/email contact options  
   - Message: "Silakan hubungi kami via telepon atau email"  
   - Action: Monitor API status, resume when available  

3. **Database Connection Error**  
   - Error message: "Terjadi kesalahan teknis. Silakan coba beberapa saat"  
   - Action: Log error, alert devops, retry with user consent  

---  

### **9.4 Edge Cases Handling**  

**Guest Checkout:**  
- Allow guest orders (no user login required)  
- Use email untuk identification  
- Store order reference untuk later access (via email link)  

**Multiple Orders Same Customer:**  
- Allow customer order multiple times  
- Each order = separate reference number & deadline  
- Track all orders dalam dashboard  

**Duplicate WhatsApp Clicks:**  
- Allow multiple clicks (may want to resend order)  
- Track all clicks dalam whatsapp_contact_count  
- Don't duplicate order, update existing  

**Payment Amount Less Than Total:**  
- Reject & ask for full amount  
- Admin note what customer said/sent  
- Follow-up with customer  

**Payment Amount More Than Total:**  
- Accept (over-payment)  
- Track excess amount  
- Offer refund atau credit untuk future orders  

---  

## 10. ADMIN DASHBOARD FEATURES  

### **10.1 Manual Payment Orders View**  

**List Display:**  
- Table dengan columns:  
  - Order ID & Reference  
  - Customer Name  
  - Order Date  
  - Amount  
  - Payment Status (badge colored)  
  - Last Contact (time ago)  
  - Actions (View, Contact, Verify, Cancel)  
- Sortable columns (date, amount, status)  
- Filterable:  
  - Status filter (pending, awaiting payment, verified, completed)  
  - Date range  
  - Customer search  
  - Amount range  
- Pagination (20 per page)  
- Bulk actions (mark as expired, send reminder)  

**Status Color Coding:**  
- Pending: Gray  
- Contact Requested: Blue  
- Awaiting Payment: Orange  
- Payment Verified: Light Green  
- Paid: Dark Green  
- Expired: Red  

---  

### **10.2 Order Detail View (Admin)**  

**Order Information Section:**  
- Order ID, Reference, Customer Name, Email, Phone  
- Order Date, Status, Payment Status  
- Shipping address & method  
- Products ordered (table)  
- Order totals (subtotal, tax, shipping, total)  

**Payment Status Section:**  
- Timeline dari order creation ke current  
- Contact requests history (count, timestamps)  
- Payment verification records (if any)  
- Timestamps untuk each status change  
- Payment method selected (if paid)  

**Payment Verification Section (if pending):**  
- Form untuk verify payment:  
  - Payment method dropdown  
  - Amount received (pre-fill dengan order total)  
  - Payment reference/transaction ID  
  - Upload proof document(s)  
  - Notes text area  
  - "Verify Payment" button  
- Real-time validation  

**Actions Available:**  
- "Send Reminder" - WhatsApp/Email  
- "Verify Payment" - If awaiting  
- "Mark as Paid" - Force (if needed)  
- "Extend Deadline" - Add 24 hours  
- "Cancel Order" - With reason/note  
- "Refund" - If applicable  

**Activity Log:**  
- Timeline dari all activities:  
  - Order created  
  - Customer contacted (timestamps)  
  - Admin messages sent  
  - Status changes  
  - Who did it (admin user)  
  - When it happened  

---  

### **10.3 Analytics Dashboard**  

**KPIs Display:**  
- Total manual payment orders (today, this week, this month)  
- Conversion rate (completed / total)  
- Pending orders count  
- Verified but not yet paid count  
- Expired orders count  
- Average verification time  

**Charts:**  
- Orders timeline (line chart - daily)  
- Payment status distribution (pie/donut chart)  
- Revenue from manual payments (line chart)  
- Order value distribution (histogram)  

**Performance Metrics:**  
- Average response time (first contact to verification)  
- Success rate percentage  
- Most popular payment methods  
- Busiest hours/days  

**Filters:**  
- Date range selector  
- Payment method filter  
- Team member filter (if assigned)  
- Customer segment filter  

---  

### **10.4 Settings for Manual Payment**  

**Configurable Options:**  
- Payment deadline duration (default 24 jam, editable)  
- Reminder timing (e.g., 12 & 23 jam mark)  
- WhatsApp business number  
- Default payment methods to offer  
- Max extension times allowed  
- Download link expiry duration (default 30 days)  

---  

## 11. IMPLEMENTATION ROADMAP & PHASES  

### **Phase 1: MVP Foundation (Week 1-2)**  
- Order creation dengan basic fields  
- Manual reference number generation  
- Simple order status tracking  
- Basic frontend pages (checkout, status)  
- Email notifications (basic)  

### **Phase 2: Core Functionality (Week 3-4)**  
- WhatsApp integration (click-to-chat)  
- Payment verification workflow  
- Download link generation  
- Admin verification interface  
- Reminder system (scheduled jobs)  

### **Phase 3: Enhancement (Week 5-6)**  
- Analytics dashboard  
- Admin bulk actions  
- Payment method tracking  
- Detailed activity logging  
- Error handling & edge cases  

### **Phase 4: Polish & Testing (Week 7-8)**  
- Security audit  
- Performance optimization  
- User testing & feedback  
- Bug fixes  
- Documentation  

### **Phase 5: Launch (Week 9)**  
- Production deployment  
- Team training  
- Customer communication  
- Go-live support  

---  

## 12. SUCCESS METRICS & KPIs  

**Customer Metrics:**  
- Conversion rate (checkout → payment verified)  
- Average time to payment (order creation → verified)  
- Customer satisfaction (satisfaction survey)  
- Support tickets related to payment  
- Download success rate  

**Business Metrics:**  
- Total revenue from manual payments  
- Average order value  
- Repeat customer rate  
- Cost per transaction (labor/time)  
- Payment success rate  

**Operational Metrics:**  
- Admin response time (order received → first contact)  
- Verification time (customer contacts → payment verified)  
- Expired orders rate  
- Email delivery rate  
- System uptime  

**Target Goals:**  
- 80%+ conversion rate (checkout → paid)  
- Average 2-3 hours verification time  
- <5% expired orders  
- 99.9% system uptime  
- Customer satisfaction >4.5/5  

---  

## KESIMPULAN  

Sistem Manual Payment via WhatsApp adalah solusi sederhana, biaya-efektif, dan user-friendly untuk mendukung transaksi PT. Rayan Smart Kreatif. Sistem ini dapat berfungsi sebagai MVP awal dan dapat dengan mudah di-upgrade ke payment gateway otomatis di masa depan ketika business scale up.   

Dengan alur yang jelas, tracking yang baik, dan automation untuk reminder & expiry, sistem ini menciptakan experience yang smooth bagi customer dan efisien untuk admin team.
