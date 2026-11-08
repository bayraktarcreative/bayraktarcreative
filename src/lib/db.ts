import fs from 'fs';
import path from 'path';
import { DatabaseSchema, Project, Reel, HomepageMedia, SiteSettings, Quote } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');

const DEFAULT_DATA: DatabaseSchema = {
  settings: {
    siteName: 'BAYRAKTAR CREATIVE',
    tagline: 'Every Frame Tells a Story.',
    logoUrl: '',
    faviconUrl: '',
    whatsappNumber: '+905550000000',
    whatsappDefaultMessage: 'Merhaba, Bayraktar Creative hizmetleri hakkında bilgi ve projem için teklif almak istiyorum.',
    email: 'info@bayraktarcreative.com',
    phone: '+90 (212) 000 00 00',
    city: 'İstanbul, Türkiye',
    address: 'Kreatif Prodüksiyon Stüdyosu — İstanbul',
    instagram: 'https://instagram.com/bayraktarcreative',
    youtube: 'https://youtube.com/@bayraktarcreative',
    vimeo: 'https://vimeo.com/bayraktarcreative',
    metaTitle: 'BAYRAKTAR CREATIVE — Sinematik Prodüksiyon & Görüntüleme Stüdyosu',
    metaDescription: 'Drone ve hava çekimleri, sinematik tanıtım filmleri, mimari ve gastronomi prodüksiyonu. Every Frame Tells a Story.',
    footerText: '© 2026 BAYRAKTAR CREATIVE. Tüm hakları saklıdır. Every Frame Tells a Story.',
  },
  media: {
    hero: {
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41559-large.mp4',
      posterImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2000&auto=format&fit=crop',
      title: 'HİKÂYENİZİ\nSİNEMATİK PERSPEKTİFTEN\nANLATIYORUZ.',
      subtitle: 'Markalar, mekânlar ve deneyimler için sıradan görüntülerin ötesinde görsel hikâyeler üretiyoruz.',
      ctaPrimaryText: 'Projeleri Keşfet',
      ctaSecondaryText: 'Teklif Al',
    },
    intro: {
      headline: 'SADECE GÖRÜNTÜ DEĞİL. ETKİ BIRAKAN HİKÂYELER.',
      description: 'Her mekânın, her markanın ve her projenin kendine has bir ritmi vardır. Biz bu ritmi hava perspektifi, sinematik kamera hareketleri ve kusursuz renk tonlarıyla kalıcı bir görsel hafızaya dönüştürüyoruz.',
      subtext: 'Titizlikle kurgulanmış çekim planları, profesyonel ekipmanlar ve yüksek editoryal disiplin ile her sahneye anlam katıyoruz.',
    },
    services: [
      {
        id: 'aerial-drone',
        number: '01',
        title: 'Aerial / Drone Production',
        category: 'Hava Çekimi & Haritalama',
        description: 'Mekânın coğrafyasını ve mimari büyüklüğünü ortaya koyan lisanslı, yüksek çözünürlüklü hava görüntüleme çözümleri.',
        features: ['4K / 60fps Log Çekim', 'Mimari ve Arsa Perspektifi', 'Lisanslı SHGM Pilotajı', 'Pürüzsüz Dinamik Uçuşlar'],
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1600&auto=format&fit=crop',
        focalPoint: 'center',
      },
      {
        id: 'cinematic-film',
        number: '02',
        title: 'Cinematic Film & Photography',
        category: 'Tanıtım Filmi & Fotoğraf',
        description: 'Otel, gayrimenkul ve ticari markalar için editoryal kalitede sinematik tanıtım filmleri ve profesyonel fotoğraf serileri.',
        features: ['Sinema Kameraları & Prime Lensler', 'Profesyonel Aydınlatma Tasarımı', 'Davinci Resolve Renk Kurgusu', 'Özel Ses Tasarımı & Miksaj'],
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop',
        focalPoint: 'center',
      },
      {
        id: 'social-reels',
        number: '03',
        title: 'Social Media & Reels Production',
        category: '9:16 Dikey İçerik Üretimi',
        description: 'Modern sosyal medya algoritmalarına uygun, ilk 2 saniyede dikkat çeken yüksek tempolu dikey video serileri.',
        features: ['9:16 Sinematik Kadrajlama', 'Dinamik Kurgu & Ses Ritimleri', 'Kategoriye Özel Senaryo', 'Haftalık/Aylık İçerik Paketleri'],
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop',
        focalPoint: 'center',
      },
      {
        id: 'interactive-360',
        number: '04',
        title: 'Interactive Experiences / 360°',
        category: 'Sanal Tur Çözümleri',
        description: 'Mekânları ekran başında gezinilebilir kılan, yüksek çözünürlüklü 360 derece etkileşimli sanal tur altyapısı.',
        features: ['Çok Noktalı Panoramik Çekim', 'Masaüstü & Mobil Uyumluluk', 'Web Sitesine Kolay Entegrasyon', 'Hotspot & Bilgi Katmanları'],
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
        focalPoint: 'center',
      },
    ],
    parallaxBg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop',
    aboutImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
    aboutHeadline: 'Her mekânın, her markanın ve her projenin anlatılmayı bekleyen bir hikâyesi vardır.',
    aboutText: 'Bayraktar Creative olarak, teknik mükemmeliyetçiliği sanatsal bir bakış açısıyla harmanlıyoruz. Çekim planlamasından renk düzenlemesine, hava koordinasyonundan son ses miksajına kadar sürecin tüm adımlarını bizzat yönetiyoruz. Amacımız sadece güzel görüntüler yakalamak değil; hedef kitlenizin zihninde kalıcı bir iz bırakmaktır.',
    ctaBg: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop',
    ctaTitle: 'BİRLİKTE ETKİLEYİCİ BİR ŞEY ÜRETELİM.',
    ctaButtonText: 'PROJENİ ANLAT / TEKLİF AL',
    virtualTourBg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
  },
  projects: [
    {
      id: 'proj-1',
      slug: 'aegean-coastal-resort-tanitim-filmi',
      title: 'Ege Kıyı Oteli Sinematik Tanıtımı',
      subtitle: 'Hava perspektifi ve lüks konaklama deneyiminin birleşimi',
      category: 'Drone & Hava Çekimi',
      coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41559-large.mp4',
      year: '2025',
      client: 'Konsept Demo Projesi',
      description: 'Ege kıyılarında konumlanan butik bir tatil kompleksi için gün doğumu hava çekimleri ve iç mekân atmosfer kaydı.',
      fullDescription: 'Bu çalışma, geniş sahil şeridi ve lüks mimari detayların hava perspektifinden nasıl akıcı bir görsel hikâyeye dönüşebileceğini sergilemektedir. Çekimler SHGM onaylı hava sahasında, 10-bit Log formatında gerçekleştirilmiş ve sıcak Akdeniz tonlarıyla derecelendirilmiştir.',
      deliverables: [
        '4K 60fps Sinematik Tanıtım Filmi (90sn)',
        '3 Adet Dikey Sosyal Medya Teaserı (9:16)',
        'Yüksek Çözünürlüklü 40 Kare Mimari Fotoğraf',
        'Davinci Resolve Özel Renk Profili',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop',
      ],
      isFeatured: true,
      order: 1,
      status: 'published',
      isDemo: true,
    },
    {
      id: 'proj-2',
      slug: 'modern-villa-mimari-prodüksiyon',
      title: 'Modern Boğaz Villası Mimari Film',
      subtitle: 'Doğal ışık, brüt beton ve geometrik akış',
      category: 'Mimari & Gayrimenkul',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-building-in-a-sunny-day-41484-large.mp4',
      year: '2025',
      client: 'Konsept Demo Projesi',
      description: 'Yalın çizgiler ve geniş cam cephelerle tasarlanan ultra-lüks konut projesinin gün batımı kurgusu.',
      fullDescription: 'Mimari formların gücünü vurgulamak için gimbal destekli yumuşak kaydırmalar ve alçak irtifa drone geçişleri kullanıldı. Gün batımı saatlerinde iç ve dış aydınlatmanın dengesi titizlikle ayarlandı.',
      deliverables: [
        'Mimari Sunum Filmi (120sn)',
        'Yüksek Dinamik Aralıklı (HDR) Fotoğraf Serisi',
        'Farklı Saat Dilimleri Işık Etüdü',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
      ],
      isFeatured: true,
      order: 2,
      status: 'published',
      isDemo: true,
    },
    {
      id: 'proj-3',
      slug: 'gastronomi-ve-sef-masasi-hikayesi',
      title: 'Fine Dining & Şef Masası',
      subtitle: 'Ateşin, lezzetin ve tabağın mikro estetiği',
      category: 'Gastronomi & Mekân',
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-chef-slicing-meat-on-a-wooden-board-43360-large.mp4',
      year: '2024',
      client: 'Konsept Demo Projesi',
      description: 'Yüksek tempolu mutfak enerjisi ile dingin masa estetiğini buluşturan lezzet odaklı görsel prodüksiyon.',
      fullDescription: 'Makro lensler kullanılarak tabağa dokunuş anları, alev efektleri ve sunum zarafeti yakalandı. Sosyal medyada hızlı tüketim için tasarlanan ritmik müzik kurgusuyla harmanlandı.',
      deliverables: [
        'Mekân ve Mutfak Tanıtım Filmi (60sn)',
        '10 Adet Özel Menü Fotoğrafı',
        'Reels İçerik Kurguları',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
      ],
      isFeatured: true,
      order: 3,
      status: 'published',
      isDemo: true,
    },
    {
      id: 'proj-4',
      slug: 'otomobil-dinamik-yol-cekimleri',
      title: 'Dinamik Yol & Sürüş Perspektifi',
      subtitle: 'Yüksek hız takibi ve sinematik araç çekimi',
      category: 'Sinematik Tanıtım',
      coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41559-large.mp4',
      year: '2024',
      client: 'Konsept Demo Projesi',
      description: 'Zorlu virajlarda FPV ve takip droneları ile gerçekleştirilmiş yüksek adrenalinli sürüş filmi.',
      fullDescription: 'Düşük irtifada yüksek hızlı takip uçuşları ve araç üzeri kamera teçhizatları ile üretilen dinamik sahneler.',
      deliverables: [
        '4K Aksiyon Kurgusu',
        'Ses Tasarımı (Egzoz & Rüzgâr)',
        'Sosyal Medya Varyasyonları',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      ],
      isFeatured: true,
      order: 4,
      status: 'published',
      isDemo: true,
    },
  ],
  reels: [
    {
      id: 'reel-1',
      title: 'Akdeniz Sahil Uçuşu',
      category: 'Drone Reel',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41559-large.mp4',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      description: 'Turkuaz sular üzerinde gün batımında pürüzsüz drone süzülüşü.',
      duration: '0:15',
      order: 1,
      published: true,
      isDemo: true,
    },
    {
      id: 'reel-2',
      title: 'Gece Şehir Işıkları',
      category: 'Mekân & Atmosfer',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41559-large.mp4',
      coverImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop',
      description: 'Metropolün gece ritmi ve köprü ışıkları.',
      duration: '0:12',
      order: 2,
      published: true,
      isDemo: true,
    },
    {
      id: 'reel-3',
      title: 'Şefin Özel Tabağı',
      category: 'Gastronomi',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-chef-slicing-meat-on-a-wooden-board-43360-large.mp4',
      coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      description: 'Yüksek tempolu kurgu ve alev detayı.',
      duration: '0:18',
      order: 3,
      published: true,
      isDemo: true,
    },
    {
      id: 'reel-4',
      title: 'Modern Mimari Detay',
      category: 'Mimari',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-building-in-a-sunny-day-41484-large.mp4',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      description: 'Geometrik cam yansımaları ve akış.',
      duration: '0:14',
      order: 4,
      published: true,
      isDemo: true,
    },
    {
      id: 'reel-5',
      title: 'Sonsuzluk Havuzu & Manzara',
      category: 'Otel & Turizm',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41559-large.mp4',
      coverImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
      description: 'Geniş açıdan lüks dinlenme anı.',
      duration: '0:16',
      order: 5,
      published: true,
      isDemo: true,
    },
  ],
  quotes: [],
};

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
  }
}

export function getDatabase(): DatabaseSchema {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) },
      media: { ...DEFAULT_DATA.media, ...(parsed.media || {}) },
      projects: parsed.projects || DEFAULT_DATA.projects,
      reels: parsed.reels || DEFAULT_DATA.reels,
      quotes: parsed.quotes || DEFAULT_DATA.quotes,
    };
  } catch (error) {
    console.error('Error reading database file:', error);
    return DEFAULT_DATA;
  }
}

export function saveDatabase(data: DatabaseSchema): boolean {
  try {
    ensureDataFile();
    const tempFile = `${DATA_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
    return true;
  } catch (error) {
    console.error('Error saving database:', error);
    return false;
  }
}
