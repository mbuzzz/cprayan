# 🚀 PT. RAYAN SMART KREATIF — Web Platform & Digital Marketplace

Platform Digital Agency, Showcase Portofolio, dan Marketplace Produk Digital berskala enterprise yang dibangun dengan **Next.js 16**, **Tailwind CSS v4**, **Prisma ORM**, **NextAuth.js**, dan terintegrasi penuh dengan **Payment Gateway Sumopod**.

---

## 🛠️ Arsitektur & Teknologi (Tech Stack)

- **Frontend & Backend**: Next.js 16 (App Router, Server Actions, Turbopack)
- **Styling & UI**: Tailwind CSS v4, Lucide Icons, Obsidian & Gold Luxury Theme
- **Database**: 
  - **Local Development**: SQLite (`prisma/dev.db`)
  - **Production**: PostgreSQL 16 + **PgBouncer** (Connection Pooling Mode: `transaction`)
- **ORM**: Prisma Client v6
- **Autentikasi**: NextAuth.js (Session & Role-Based Access Control)
- **Payment Gateway**: Sumopod Payment Gateway (QRIS, E-Wallet, VA, Webhook Auto-Verification)
- **Containerization**: Docker & Docker Compose

---

## 💻 1. Panduan Menjalankan di Lokal (Local Development)

Secara default, mode lokal menggunakan SQLite sehingga Anda tidak memerlukan instalasi database eksternal:

### Langkah-langkah:
1. **Clone repository dan install dependensi:**
   ```bash
   git clone git@github.com:mbuzzz/cprayan.git
   cd cprayan
   npm install
   ```

2. **Siapkan file `.env`:**
   ```bash
   cp .env.example .env
   ```

3. **Sinkronisasi Database SQLite & Seed Data Awal:**
   ```bash
   npx prisma db push
   npx prisma generate
   node prisma/seed.js
   ```

4. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```

5. **Akses Aplikasi:**
   - Halaman Publik: `http://localhost:3000`
   - Panel Admin: `http://localhost:3000/admin`
   - Kredensial Admin Default:
     - **Email**: `admin@rayansmartkreatif.id`
     - **Password**: `@r4y4N.W3b`

---

## 🐳 2. Panduan Setup Production (Docker + PostgreSQL 16 + PgBouncer)

Arsitektur production dirancang untuk performa tinggi, ketahanan lonjakan trafik (high concurrency), dan zero connection exhaust menggunakan **PgBouncer** connection pooler.

```mermaid
graph TD
    Client[Pengunjung / Pembeli] -->|HTTPS 443| Nginx[Nginx Reverse Proxy + SSL]
    Nginx -->|Port 3000| Web[Next.js App Container: rayanweb-app]
    Web -->|Port 6432| PgBouncer[PgBouncer Pooler: rayanweb-pgbouncer]
    PgBouncer -->|Port 5432| Postgres[(PostgreSQL 16: rayanweb-db)]
    Sumopod[Sumopod Payment Gateway] -->|Webhook POST| Web
```

### Langkah 1: Persiapan VPS / Server Linux
Pastikan server Anda telah terinstall **Docker** dan **Docker Compose (v2)**:
```bash
# Update OS & install Docker
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable docker && sudo systemctl start docker
```

### Langkah 2: Clone Repository & Konfigurasi `.env.production`
```bash
git clone git@github.com:mbuzzz/cprayan.git
cd cprayan
cp .env.production .env
```

Edit file `.env` di server Anda (`nano .env`):
```env
# Database Credentials
POSTGRES_USER=rayan
POSTGRES_PASSWORD=ganti_dengan_password_sangat_aman_2026!
POSTGRES_DB=rayanweb

# Database Connection via PgBouncer
DATABASE_URL="postgresql://rayan:ganti_dengan_password_sangat_aman_2026!@pgbouncer:6432/rayanweb?pgbouncer=true&schema=public"
DIRECT_URL="postgresql://rayan:ganti_dengan_password_sangat_aman_2026!@db:5432/rayanweb?schema=public"

# NextAuth Security
NEXTAUTH_SECRET=generate_dengan_openssl_rand_base64_32
NEXTAUTH_URL=https://rayan.web.id
NEXT_PUBLIC_APP_URL=https://rayan.web.id

# Sumopod Payment Gateway (Ganti dengan API Key Production Anda)
SUMOPOD_BASE_URL=https://api-pay.sumopod.com/api/v1
SUMOPOD_API_KEY=your_production_api_key_here
SUMOPOD_WEBHOOK_SECRET=your_production_webhook_secret_here
```

### Langkah 3: Sesuaikan `prisma/schema.prisma` ke PostgreSQL
Sebelum build docker di production, sesuaikan provider database di `prisma/schema.prisma`:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### Langkah 4: Jalankan Docker Compose
Jalankan seluruh stack container (PostgreSQL 16, PgBouncer, dan Next.js Web App):
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Periksa status container:
```bash
docker compose -f docker-compose.prod.yml ps
```
Pastikan ketiga container (`rayanweb-db`, `rayanweb-pgbouncer`, dan `rayanweb-app`) berstatus **Up / Healthy**.

### Langkah 5: Migrasi Database & Seed Data Awal di Container
Jalankan sinkronisasi database dan seeder admin di dalam container web:
```bash
# Push skema database ke PostgreSQL
docker exec -it rayanweb-app npx prisma db push

# Generate client
docker exec -it rayanweb-app npx prisma generate

# Seed akun admin & data default
docker exec -it rayanweb-app node prisma/seed.js
```

---

## 🌐 3. Konfigurasi Domain, Nginx Reverse Proxy & SSL Let's Encrypt

Buat file konfigurasi Nginx di VPS Anda (`/etc/nginx/sites-available/rayan.web.id`):

```nginx
server {
    server_name rayan.web.id www.rayan.web.id;

    # Client body size untuk upload file produk (.zip)
    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan konfigurasi dan pasang SSL gratis Let's Encrypt:
```bash
sudo ln -s /etc/nginx/sites-available/rayan.web.id /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install SSL otomatis via Certbot
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d rayan.web.id -d www.rayan.web.id
```

---

## 💳 4. Pengaturan Sumopod Payment Gateway di Production

1. **Daftarkan Webhook URL**:
   Masuk ke dashboard merchant Sumopod Anda dan atur Webhook URL ke:
   ```
   https://rayan.web.id/api/webhooks/sumopod
   ```
2. **Switch Mode**:
   Cukup pastikan `SUMOPOD_BASE_URL` diset ke URL Production (`https://api-pay.sumopod.com/api/v1`) dan `SUMOPOD_API_KEY` diisi dengan API Key live pada file `.env` server Anda.
3. **Uji Coba Transaksi**:
   Lakukan transaksi produk di halaman `/products` -> `/checkout`. Setelah pembayaran sukses via QRIS, webhook Sumopod akan otomatis memverifikasi dan membuka tombol download file `.zip` di halaman `/checkout/success`.

---

## 🛡️ 5. Perawatan & Pemeliharaan (Maintenance Commands)

### Melihat Log Real-time:
```bash
# Log Next.js Application
docker compose -f docker-compose.prod.yml logs -f web

# Log PgBouncer Connection Pool
docker compose -f docker-compose.prod.yml logs -f pgbouncer

# Log PostgreSQL
docker compose -f docker-compose.prod.yml logs -f db
```

### Backup Database PostgreSQL:
```bash
docker exec -t rayanweb-db pg_dump -U rayan rayanweb > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database PostgreSQL:
```bash
cat backup_file.sql | docker exec -i rayanweb-db psql -U rayan -d rayanweb
```

### Update Versi Aplikasi (CI/CD Deployment):
```bash
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build web
```

---

## 📄 Lisensi & Hak Cipta
Hak Cipta © 2026 **PT. Rayan Smart Kreatif**. Seluruh hak cipta dilindungi undang-undang.
