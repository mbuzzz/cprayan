const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({});

async function main() {
  console.log('Start seeding...');

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rayanweb.id' },
    update: {},
    create: {
      email: 'admin@rayanweb.id',
      name: 'Admin Rayan',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // 2. Create Categories
  const categories = [
    { name: 'Scripts & Code', slug: 'scripts-code', description: 'Source code and scripts' },
    { name: 'Presentation (PPT)', slug: 'presentations', description: 'PowerPoint & Keynote Templates' },
    { name: 'Fonts', slug: 'fonts', description: 'Premium Fonts & Typography' },
    { name: 'Graphics', slug: 'graphics', description: 'Vectors, Illustrations, Images' },
    { name: 'Audio', slug: 'audio', description: 'Music tracks and sound effects' },
    { name: 'Web Themes', slug: 'web-themes', description: 'Website Themes & Templates' }
  ];

  const createdCategories = {};
  for (const cat of categories) {
    createdCategories[cat.slug] = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }

  // 3. Create Products
  const posSystem = await prisma.product.upsert({
    where: { slug: 'rayan-pos-system' },
    update: { categoryId: createdCategories['scripts-code'].id },
    create: {
      title: "Rayan POS System Premium",
      slug: "rayan-pos-system",
      description: "Sistem Point of Sale (POS) premium berbasis web dengan fitur manajemen stok, laporan penjualan, kasir, dan multi-outlet.",
      price: 499000,
      version: "2.1.0",
      categoryId: createdCategories['scripts-code'].id,
      screenshots: JSON.stringify(["/asset/logorayan.png"]),
      featured: true,
    }
  });

  const pptTemplate = await prisma.product.upsert({
    where: { slug: 'corporate-pitch-deck' },
    update: {},
    create: {
      title: "CorporatePro - Pitch Deck PPT Template",
      slug: "corporate-pitch-deck",
      description: "Template presentasi PowerPoint premium dengan lebih dari 100+ slide unik, infografis animasi, dan desain korporat elegan.",
      price: 150000,
      version: "1.0.0",
      categoryId: createdCategories['presentations'].id,
      screenshots: JSON.stringify(["/asset/logorayan.png"]),
      featured: true,
    }
  });

  const customFont = await prisma.product.upsert({
    where: { slug: 'luxuria-serif-font' },
    update: {},
    create: {
      title: "Luxuria - Elegant Serif Font",
      slug: "luxuria-serif-font",
      description: "Font serif yang sangat elegan dan berkelas. Sempurna untuk logo, undangan pernikahan, majalah fashion, dan branding mewah.",
      price: 75000,
      version: "1.0.0",
      categoryId: createdCategories['fonts'].id,
      screenshots: JSON.stringify(["/asset/logorayan.png"]),
      featured: true,
    }
  });

  const audioTrack = await prisma.product.upsert({
    where: { slug: 'cinematic-epic-trailer' },
    update: {},
    create: {
      title: "Cinematic Epic Trailer (Royalty Free)",
      slug: "cinematic-epic-trailer",
      description: "Trek audio sinematik yang kuat dan epik. Cocok untuk latar belakang trailer film, video YouTube intro, dan game.",
      price: 120000,
      version: "1.0.0",
      categoryId: createdCategories['audio'].id,
      screenshots: JSON.stringify(["/asset/logorayan.png"]),
      featured: false,
    }
  });
  
  const graphicPack = await prisma.product.upsert({
    where: { slug: 'cyberpunk-vector-pack' },
    update: {},
    create: {
      title: "Cyberpunk City - Vector Illustration Pack",
      slug: "cyberpunk-vector-pack",
      description: "Paket ilustrasi vektor bertema Cyberpunk & Sci-Fi. Berisi 25+ elemen, karakter, dan background yang bisa di-edit (EPS/AI).",
      price: 90000,
      version: "1.0.0",
      categoryId: createdCategories['graphics'].id,
      screenshots: JSON.stringify(["/asset/logorayan.png"]),
      featured: false,
    }
  });

  // 4. Create Projects (Portfolio)
  const projEcom = await prisma.project.upsert({
    where: { slug: 'e-commerce-premium' },
    update: {},
    create: {
      title: "Premium E-Commerce Platform",
      slug: "e-commerce-premium",
      description: "Platform e-commerce dengan fitur lengkap, payment gateway, dan dashboard admin yang komprehensif.",
      content: "<p>Proyek ini bertujuan untuk membangun sebuah ekosistem e-commerce...</p>",
      techStack: JSON.stringify(["Next.js", "Tailwind", "PostgreSQL", "Stripe"]),
      screenshots: JSON.stringify(["/asset/logorayan.png"]),
      featured: true,
    }
  });

  // 5. Create Default Site Settings
  const siteSettings = [
    { key: 'site_name', value: 'PT. Rayan Smart Kreatif' },
    { key: 'site_description', value: 'Premium Digital Agency & Marketplace' },
    { key: 'hero_title', value: 'Bangun Masa Depan Bisnis Digital Anda' },
    { key: 'hero_subtitle', value: 'PT. Rayan Smart Kreatif menghadirkan solusi teknologi enterprise, dari pengembangan sistem kustom hingga aset produk digital premium.' },
    { key: 'about_story', value: 'PT. Rayan Smart Kreatif didirikan dengan semangat untuk menghadirkan solusi digital yang tidak hanya cerdas, tetapi juga memiliki nilai estetika premium dan profesionalitas tinggi.' },
    { key: 'about_vision', value: 'Menjadi perusahaan teknologi digital terdepan di Indonesia yang dikenal karena inovasi cerdas, kualitas desain premium, dan solusi yang memberdayakan bisnis untuk bersaing secara global.' },
    { key: 'about_mission', value: JSON.stringify(['Menghadirkan produk digital inovatif dengan standar kualitas tertinggi.', 'Memberikan pelayanan profesional dan elegan kepada setiap klien.']) },
    { key: 'contact_address', value: 'Gedung Perkantoran Sudirman, Lt. 12\nJl. Jend. Sudirman Kav. 1\nJakarta Pusat, 10220' },
    { key: 'contact_email', value: 'hello@rayanweb.id\nsupport@rayanweb.id' },
    { key: 'contact_phone', value: '+62 812 3456 7890\n(Senin - Jumat, 09:00 - 17:00)' },
    { key: 'whatsapp_number', value: '6281234567890' },
    { key: 'social_media', value: JSON.stringify({ instagram: 'https://instagram.com/rayanweb', linkedin: 'https://linkedin.com/company/rayanweb' }) }
  ];

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting
    });
  }

  // 6. Create Services
  const servicesData = [
    {
      title: "Web Development",
      description: "Pembuatan website company profile, e-commerce, dan sistem informasi dengan desain modern, responsif, dan performa tinggi.",
      features: JSON.stringify(["Custom UI/UX Design", "SEO Optimized", "CMS Integration", "Fast Loading"]),
      order: 1
    },
    {
      title: "Mobile Apps Development",
      description: "Pengembangan aplikasi native maupun cross-platform untuk Android dan iOS yang user-friendly.",
      features: JSON.stringify(["iOS & Android", "UI/UX Premium", "API Integration", "App Store Deployment"]),
      order: 2
    }
  ];

  for (const service of servicesData) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } });
    if (!existing) {
      await prisma.service.create({ data: service });
    }
  }

  // 7. Create Team Members
  const teamData = [
    { name: "Ahmad Rayan", role: "Chief Executive Officer", description: "Berpengalaman 10+ tahun dalam industri teknologi dan manajemen bisnis.", order: 1 },
    { name: "Sarah Wijaya", role: "Chief Technology Officer", description: "Expert dalam software architecture dan pengembangan solusi enterprise.", order: 2 }
  ];

  for (const member of teamData) {
    const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }

  // 8. Create sample Orders
  const orderProduct = await prisma.product.findFirst({ where: { slug: 'rayan-pos-system' } });
  
  if (orderProduct) {
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const order1 = await prisma.order.create({
      data: {
        orderNumber,
        referenceNumber: `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        customerName: "Budi Santoso",
        customerEmail: "budi.santoso@example.com",
        customerPhone: "081234567890",
        subtotal: orderProduct.price,
        tax: orderProduct.price * 0.11,
        total: orderProduct.price * 1.11,
        orderStatus: "PENDING",
        paymentMethod: "manual_whatsapp",
        paymentDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // +24 hours
        items: {
          create: [
            {
              productId: orderProduct.id,
              productName: orderProduct.title,
              productPrice: orderProduct.price,
              quantity: 1,
              subtotal: orderProduct.price
            }
          ]
        }
      }
    });
    console.log(`Created sample order: ${order1.orderNumber}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });