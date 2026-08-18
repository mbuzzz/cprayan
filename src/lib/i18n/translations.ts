export type Language = "id" | "en" | "ar" | "zh";

export interface Translations {
  nav: {
    home: string;
    products: string;
    services: string;
    work: string;
    about: string;
    contact: string;
    startProject: string;
    login: string;
    logout: string;
    dashboard: string;
    adminPanel: string;
    search: string;
    cart: string;
  };
  hero: {
    badge: string;
    titleFirst: string;
    titleSecond: string;
    titleThird: string;
    subtitle: string;
    exploreMarketplace: string;
    customSolutions: string;
    featuredShowcase: string;
    viewCaseStudy: string;
  };
  marketplace: {
    title: string;
    subtitle: string;
    all: string;
    featuredBadge: string;
    viewAll: string;
    noProducts: string;
    ready: string;
  };
  categories: {
    badge: string;
    title: string;
    subtitle: string;
    explore: string;
  };
  pillars: {
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
  };
  agency: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  creator: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  splitCta: {
    productTitle: string;
    productDesc: string;
    productBtn: string;
    customTitle: string;
    customDesc: string;
    customBtn: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    productsTitle: string;
    contactTitle: string;
    address: string;
    allRightsReserved: string;
  };
  theme: {
    toggleLight: string;
    toggleDark: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: "Beranda",
      products: "Produk",
      services: "Layanan",
      work: "Portofolio",
      about: "Tentang Kami",
      contact: "Kontak",
      startProject: "Get Started",
      login: "Masuk",
      logout: "Keluar",
      dashboard: "Dasbor",
      adminPanel: "Panel Admin",
      search: "Cari Produk",
      cart: "Keranjang Belanja",
    },
    hero: {
      badge: "Studio Digital Kreatif & Enterprise",
      titleFirst: "SOLUSI",
      titleSecond: "DIGITAL",
      titleThird: "KREATIF",
      subtitle:
        "PT. Rayan Smart Kreatif menghadirkan solusi teknologi enterprise, dari rekayasa perangkat lunak kustom hingga aset produk digital premium untuk mengakselerasi bisnis Anda.",
      exploreMarketplace: "Jelajahi Marketplace",
      customSolutions: "Solusi Kustom",
      featuredShowcase: "PROYEK UNGGULAN",
      viewCaseStudy: "Lihat Studi Kasus",
    },
    marketplace: {
      title: "Produk digital siap pakai untuk developer & kreator.",
      subtitle:
        "Tingkatkan kecepatan pengembangan Anda dengan UI kit, source code, dan template berkualitas tinggi karya engineer kami.",
      all: "Semua",
      featuredBadge: "Unggulan",
      viewAll: "Lihat Semua Produk",
      noProducts: "Belum ada produk yang dipublikasikan.",
      ready: "Siap Pakai",
    },
    categories: {
      badge: "Kategori & Solusi",
      title: "Temukan yang ingin Anda bangun.",
      subtitle: "Jelajahi koleksi aset digital terbaik yang dikurasi secara presisi.",
      explore: "Jelajahi Koleksi",
    },
    pillars: {
      p1Title: "Kualitas Utama",
      p1Desc:
        "Setiap piksel, animasi, dan baris kode dirancang dengan cermat mengikuti standar industri enterprise terbaik.",
      p2Title: "Bangun Lebih Cepat",
      p2Desc:
        "Hemat ratusan jam kerja dengan arsitektur modular yang kokoh dan siap produksi.",
      p3Title: "Skalabilitas Tinggi",
      p3Desc:
        "Dirancang untuk tumbuh dari MVP hingga platform multi-wilayah dengan performa tinggi.",
    },
    agency: {
      badge: "Layanan Agensi & Rekayasa Kustom",
      title: "Butuh solusi perangkat lunak khusus?",
      subtitle:
        "Kami bermitra dengan bisnis dan korporasi untuk merancang, membangun, dan mengelola ekosistem digital kustom berskala besar.",
      cta: "Lihat Layanan Agensi",
    },
    timeline: {
      title: "Dari Ide Menjadi Produk",
      subtitle:
        "Metodologi rekayasa digital presisi kami untuk menghasilkan platform berkinerja tinggi.",
      step1Title: "Discover (Eksplorasi)",
      step1Desc:
        "Perumusan kebutuhan mendalam, arsitektur sistem, dan pemilihan teknologi tepat guna.",
      step2Title: "Design (Desain)",
      step2Desc:
        "Desain sistem antarmuka UX/UI presisi, interaksi visual, dan pengujian prototipe.",
      step3Title: "Build (Pembangunan)",
      step3Desc:
        "Pengembangan kode type-safe, integrasi API, pengujian otomatis, dan keamanan.",
      step4Title: "Grow (Pertumbuhan)",
      step4Desc:
        "Deploy berkelanjutan, pemantauan performa, optimasi SEO, dan eskalasi infrastruktur.",
    },
    creator: {
      badge: "Mitra Ekosistem",
      title: "Jadilah Kreator",
      subtitle:
        "Bergabunglah dengan marketplace kurasi kami dan pasarkan produk digital, template, serta script berkualitas Anda ke audiens global.",
      cta: "Daftar Jadi Kreator",
    },
    splitCta: {
      productTitle: "Butuh produk digital?",
      productDesc: "Jelajahi marketplace kami untuk aset dan template siap pakai.",
      productBtn: "Belanja Sekarang",
      customTitle: "Butuh sistem kustom?",
      customDesc: "Konsultasikan proyek web, aplikasi mobile, atau software enterprise Anda.",
      customBtn: "Hubungi Kami",
    },
    footer: {
      description:
        "PT. Rayan Smart Kreatif adalah entitas teknologi terintegrasi yang menghadirkan produk digital terkurasi dan rekayasa perangkat lunak berskala global.",
      quickLinks: "Navigasi Cepat",
      productsTitle: "Kategori Produk",
      contactTitle: "Hubungi Kami",
      address: "Indonesia",
      allRightsReserved: "Hak Cipta Dilindungi Undang-Undang.",
    },
    theme: {
      toggleLight: "Beralih ke Mode Terang",
      toggleDark: "Beralih ke Mode Gelap",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      services: "Services",
      work: "Work",
      about: "About Us",
      contact: "Contact",
      startProject: "Start a Project",
      login: "Login",
      logout: "Logout",
      dashboard: "Dashboard",
      adminPanel: "Admin Panel",
      search: "Search Products",
      cart: "Shopping Cart",
    },
    hero: {
      badge: "Creative & Enterprise Digital Studio",
      titleFirst: "CREATIVE",
      titleSecond: "DIGITAL",
      titleThird: "SOLUTIONS",
      subtitle:
        "PT. Rayan Smart Kreatif delivers enterprise technology solutions, from bespoke software engineering to premium digital assets to accelerate your business.",
      exploreMarketplace: "Explore Marketplace",
      customSolutions: "Custom Solutions",
      featuredShowcase: "FEATURED SHOWCASE",
      viewCaseStudy: "View Case Study",
    },
    marketplace: {
      title: "Digital products, ready to build on.",
      subtitle:
        "Accelerate your workflow with our meticulously crafted UI kits, templates, and comprehensive toolsets.",
      all: "All",
      featuredBadge: "Featured",
      viewAll: "View All Products",
      noProducts: "No products published yet.",
      ready: "Ready to Use",
    },
    categories: {
      badge: "Categories & Solutions",
      title: "Find what you're building.",
      subtitle: "Browse our categories to find the perfect foundation for your project.",
      explore: "Explore Collection",
    },
    pillars: {
      p1Title: "Quality First",
      p1Desc:
        "Every pixel, animation, and line of code is meticulously engineered to meet stringent enterprise standards.",
      p2Title: "Build Faster",
      p2Desc:
        "Stop reinventing boilerplate. Start with solid architectural foundations and focus on your core differentiators.",
      p3Title: "Ready to Scale",
      p3Desc:
        "Modern modular architecture built to scale effortlessly from agile MVP to multi-region production loads.",
    },
    agency: {
      badge: "Agency & Bespoke Engineering",
      title: "Need something custom?",
      subtitle:
        "We partner with businesses and enterprises to design, engineer, and manage scalable cloud platforms and custom software.",
      cta: "View Agency Services",
    },
    timeline: {
      title: "From Idea to Product",
      subtitle:
        "Our rigorous Swiss-inspired engineering methodology for building high-performing digital platforms.",
      step1Title: "Discover",
      step1Desc:
        "Thorough requirements scoping, architectural blueprints, and technology stack selection.",
      step2Title: "Design",
      step2Desc:
        "Objective UX/UI systems, design tokens, interactive prototyping, and brand precision.",
      step3Title: "Build",
      step3Desc:
        "Clean, type-safe development, automated testing, API integrations, and database tuning.",
      step4Title: "Grow",
      step4Desc:
        "Continuous deployment, monitoring, SEO optimization, analytics tracking, and scaling.",
    },
    creator: {
      badge: "Ecosystem Partners",
      title: "Become a Creator",
      subtitle:
        "Join our curated marketplace and distribute your high-grade digital products, templates, and scripts to a global audience.",
      cta: "Apply to Sell",
    },
    splitCta: {
      productTitle: "Need a product?",
      productDesc: "Browse our curated marketplace of production-ready digital assets.",
      productBtn: "Shop Now",
      customTitle: "Need something unique?",
      customDesc: "Hire our specialized studio for custom software engineering and branding.",
      customBtn: "Contact Us",
    },
    footer: {
      description:
        "PT. Rayan Smart Kreatif is an integrated technology entity providing curated digital products and enterprise bespoke engineering worldwide.",
      quickLinks: "Quick Navigation",
      productsTitle: "Product Categories",
      contactTitle: "Get in Touch",
      address: "Indonesia",
      allRightsReserved: "All rights reserved.",
    },
    theme: {
      toggleLight: "Switch to Light Mode",
      toggleDark: "Switch to Dark Mode",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      products: "المنتجات",
      services: "الخدمات",
      work: "الأعمال",
      about: "من نحن",
      contact: "اتصل بنا",
      startProject: "ابدأ مشروعاً",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      dashboard: "لوحة التحكم",
      adminPanel: "لوحة الإدارة",
      search: "بحث عن المنتجات",
      cart: "سلة التسوق",
    },
    hero: {
      badge: "استوديو رقمي إبداعي للمؤسسات والشركات",
      titleFirst: "حلول",
      titleSecond: "رقمية",
      titleThird: "إبداعية",
      subtitle:
        "تقدم شركة ريان سمارت كرياتيف حلولاً تقنية متطورة للمؤسسات، من هندسة البرمجيات المخصصة إلى الأصول الرقمية المتميزة لتسريع أعمالك.",
      exploreMarketplace: "استكشف المتجر",
      customSolutions: "حلول مخصصة",
      featuredShowcase: "المشروع المميز",
      viewCaseStudy: "عرض دراسة الحالة",
    },
    marketplace: {
      title: "منتجات رقمية جاهزة للانطلاق والتطوير.",
      subtitle:
        "سرّع وتيرة عملك باستخدام حزم واجهات المستخدم، وقوالب البرمجيات، والأدوات الشاملة المصممة بدقة عالية.",
      all: "الكل",
      featuredBadge: "مميز",
      viewAll: "عرض جميع المنتجات",
      noProducts: "لا توجد منتجات منشورة حالياً.",
      ready: "جاهز للاستخدام",
    },
    categories: {
      badge: "التصنيفات والحلول",
      title: "اعثر على ما تبنيه بدقة.",
      subtitle: "تصفح تصنيفاتنا للعثور على الأساس المثالي لمشروعك الرقمي القادم.",
      explore: "استكشف المجموعة",
    },
    pillars: {
      p1Title: "الجودة أولاً",
      p1Desc:
        "تم تصميم كل بكسل ورسم متحرك وسطر برمجي بدقة فائقة لتلبية أعلى معايير الشركات العالمية.",
      p2Title: "بناء أسرع",
      p2Desc:
        "لا داعي لإعادة اختراع الأساسيات. ابدأ بأسس معمارية قوية وركز على ما يميز علامتك التجارية.",
      p3Title: "قابلية التوسع",
      p3Desc:
        "بنية معمارية معيارية حديثة مصممة لتتوسع بسلاسة من نموذج أولي إلى إنتاج متعدد المناطق.",
    },
    agency: {
      badge: "خدمات الوكالة والهندسة المخصصة",
      title: "هل تحتاج إلى نظام مخصص؟",
      subtitle:
        "نحن نتشارك مع الشركات والمؤسسات لتصميم وهندسة وإدارة منصات سحابية قابلة للتطوير وبرمجيات مخصصة.",
      cta: "عرض خدمات الوكالة",
    },
    timeline: {
      title: "من الفكرة إلى المنتج النهائي",
      subtitle:
        "منهجيتنا الهندسية الصارمة المستوحاة من الدقة السويسرية لبناء منصات رقمية عالية الأداء.",
      step1Title: "الاستكشاف (Discover)",
      step1Desc:
        "تحديد نطاق المتطلبات الشاملة، المخططات الهندسية، واختيار التقنيات المثالية.",
      step2Title: "التصميم (Design)",
      step2Desc:
        "أنظمة واجهة وتجربة مستخدم دقيقة، ونماذج أولية تفاعلية تعكس قوة العلامة التجارية.",
      step3Title: "التطوير (Build)",
      step3Desc:
        "برمجة نظيفة وآمنة من الأخطاء، تكامل الواجهات البرمجية، واختبارات الأمان المؤتمتة.",
      step4Title: "النمو (Grow)",
      step4Desc:
        "النشر المستمر، المراقبة السحابية، تحسين محركات البحث، وتوسيع نطاق البنية التحتية.",
    },
    creator: {
      badge: "شركاء النظام البيئي",
      title: "كن شريكاً ومبدعاً معنا",
      subtitle:
        "انضم إلى متجرنا الرقمي وانشر منتجاتك وقوالبك عالية الجودة لجمهور واسع حول العالم.",
      cta: "التقديم كبائع",
    },
    splitCta: {
      productTitle: "هل تبحث عن منتج رقمي؟",
      productDesc: "تصفح متجرنا المنسق للأصول الرقمية الجاهزة للإنتاج الفوري.",
      productBtn: "تسوق الآن",
      customTitle: "هل تحتاج إلى حل فريد؟",
      customDesc: "وظف استوديونا المتخصص لتطوير البرمجيات المخصصة والهوية الرقمية.",
      customBtn: "تواصل معنا",
    },
    footer: {
      description:
        "شركة ريان سمارت كرياتيف هي كيان تقني متكامل يقدم منتجات رقمية مختارة وهندسة برمجيات متقدمة للشركات عالمياً.",
      quickLinks: "روابط سريعة",
      productsTitle: "تصنيفات المنتجات",
      contactTitle: "تواصل معنا",
      address: "إندونيسيا",
      allRightsReserved: "جميع الحقوق محفوظة.",
    },
    theme: {
      toggleLight: "التبديل إلى الوضع الفاتح",
      toggleDark: "التبديل إلى الوضع الداكن",
    },
  },
  zh: {
    nav: {
      home: "首页",
      products: "数字产品",
      services: "定制服务",
      work: "项目案例",
      about: "关于我们",
      contact: "联系我们",
      startProject: "开启项目",
      login: "登录",
      logout: "退出登录",
      dashboard: "用户中心",
      adminPanel: "管理后台",
      search: "搜索产品",
      cart: "购物车",
    },
    hero: {
      badge: "创意与企业级数字化工作室",
      titleFirst: "创意",
      titleSecond: "数字",
      titleThird: "解决方案",
      subtitle:
        "PT. Rayan Smart Kreatif 提供企业级技术解决方案，从定制化软件开发到高阶数字资产，助力您的业务快速腾飞。",
      exploreMarketplace: "探索数字市场",
      customSolutions: "定制解决方案",
      featuredShowcase: "精选项目案例",
      viewCaseStudy: "查看案例详情",
    },
    marketplace: {
      title: "即开即用，为开发者打造的高品质数字产品。",
      subtitle:
        "借助我们经过严格打磨的UI套件、源代码与全套工程工具，大幅提升您的开发交付效率。",
      all: "全部",
      featuredBadge: "推荐",
      viewAll: "查看所有产品",
      noProducts: "暂无发布的产品。",
      ready: "即开即用",
    },
    categories: {
      badge: "分类与解决方案",
      title: "精准发现您所需的一切。",
      subtitle: "浏览我们精选的数字资产库，为您的下一个宏大项目奠定坚实基础。",
      explore: "探索该分类",
    },
    pillars: {
      p1Title: "品质至上",
      p1Desc:
        "每一个像素、动画与每一行代码都经过精心雕琢，严格符合企业级生产标准。",
      p2Title: "极速交付",
      p2Desc:
        "无需从零重复造轮子。从坚固稳健的模块化架构出发，专注于核心竞争优势。",
      p3Title: "从容扩展",
      p3Desc:
        "现代化模块体系，支持从轻量MVP平滑扩展至多区域、高并发的企业生产负载。",
    },
    agency: {
      badge: "专业机构与定制工程",
      title: "需要专属定制方案？",
      subtitle:
        "我们与企业及创新团队深度合作，量身设计、构建并维护高可用云平台与专属软件系统。",
      cta: "了解定制服务",
    },
    timeline: {
      title: "从灵感到卓越产品",
      subtitle:
        "借鉴瑞士精密工艺理念的数字化工程方法论，交付超高水准的数字系统。",
      step1Title: "探索调研",
      step1Desc:
        "深度需求挖掘、系统架构蓝图规划与最适技术栈遴选。",
      step2Title: "精密设计",
      step2Desc:
        "客观精准的UI/UX设计系统、设计规范令牌与高保真交互原型。",
      step3Title: "工程构建",
      step3Desc:
        "类型安全的现代化开发、API无缝集成、自动化单元测试与安全审计。",
      step4Title: "持续增长",
      step4Desc:
        "持续集成交付、全链路性能监控、SEO搜索引擎优化与云架构弹性扩容。",
    },
    creator: {
      badge: "生态伙伴计划",
      title: "成为创作者与合作伙伴",
      subtitle:
        "加入我们严格策展的数字市场，将您优质的模板、源码与数字资产推向全球开发者与企业客户。",
      cta: "申请入驻销售",
    },
    splitCta: {
      productTitle: "需要即用型产品？",
      productDesc: "探索我们为生产环境精心挑选的高品质数字资产。",
      productBtn: "立即选购",
      customTitle: "需要专属研发？",
      customDesc: "聘请我们的专业团队为您定制开发高端软件系统与数字化品牌。",
      customBtn: "即刻联系",
    },
    footer: {
      description:
        "PT. Rayan Smart Kreatif 是一家综合型技术实体，致力于为全球客户提供高品质数字产品与定制软件工程开发。",
      quickLinks: "快捷导航",
      productsTitle: "产品分类",
      contactTitle: "联系方式",
      address: "印度尼西亚",
      allRightsReserved: "版权所有，保留一切权利。",
    },
    theme: {
      toggleLight: "切换至明亮模式",
      toggleDark: "切换至深色模式",
    },
  },
};
