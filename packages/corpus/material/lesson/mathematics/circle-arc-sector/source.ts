import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsCircleArcSectorMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/circle-arc-sector",
  domain: "mathematics",
  key: "lesson.mathematics.circle-arc-sector",
  kind: "lesson",
  routeSlugs: {
    de: "kreisboegen-und-kreissektoren",
    en: "circle-arc-sector",
    id: "busur-dan-juring-lingkaran",
    ms: "lengkok-dan-sektor-bulatan",
  },
  sections: [
    {
      routeSlugs: { de: "bogen", en: "arc", id: "busur", ms: "lengkok" },
      slug: "arc",
    },
    {
      routeSlugs: {
        de: "mittelpunktswinkel-ueber-einem-bogen",
        en: "central-angle-on-arc",
        id: "sudut-pusat-pada-busur",
        ms: "sudut-pusat-pada-lengkok",
      },
      slug: "central-angle-on-arc",
    },
    {
      routeSlugs: {
        de: "mittelpunktswinkel-im-kreissektor",
        en: "central-angle-on-sector",
        id: "sudut-pusat-pada-juring",
        ms: "sudut-pusat-pada-sektor",
      },
      slug: "central-angle-on-sector",
    },
    {
      routeSlugs: {
        de: "sehne",
        en: "chord",
        id: "tali-busur",
        ms: "perentas",
      },
      slug: "chord",
    },
    {
      routeSlugs: {
        de: "kreisbogen",
        en: "circle-arc",
        id: "busur-lingkaran",
        ms: "lengkok-bulatan",
      },
      slug: "circle-arc",
    },
    {
      routeSlugs: {
        de: "kreissektor",
        en: "circle-sector",
        id: "juring-lingkaran",
        ms: "luas-sektor-bulatan",
      },
      slug: "circle-sector",
    },
    {
      evidenceUrls: [
        "https://www.nist.gov/pml/owm/circumference-area-and-volume",
        "https://link.springer.com/article/10.1007/s00407-026-00365-z",
        "https://www.open.edu/openlearn/science-maths-technology/mathematics-statistics/egyptian-mathematics/content-section-1.1.1",
        "https://mathshistory.st-andrews.ac.uk/HistTopics/Pi_through_the_ages/",
        "https://mathshistory.st-andrews.ac.uk/Miller/mathsym/constants/",
        "https://mathshistory.st-andrews.ac.uk/Biographies/Zu_Chongzhi/",
        "https://mathshistory.st-andrews.ac.uk/Biographies/Lambert/",
        "https://mathshistory.st-andrews.ac.uk/Biographies/Lindemann/",
      ],
      routeSlugs: {
        de: "geschichte-der-kreiszahl-pi",
        en: "pi-history",
        id: "sejarah-nilai-pi",
        ms: "sejarah-nilai-pi",
      },
      slug: "pi-history",
    },
    {
      evidenceUrls: [
        "https://imagine.gsfc.nasa.gov/features/cosmic/earth_info.html",
        "https://www.aps.org/apsnews/2006/06/eratosthenes-measures-earth",
      ],
      routeSlugs: {
        de: "bogenlaenge-und-sektorflaeche",
        en: "relationship-between-arc-length-and-sector-area",
        id: "hubungan-panjang-busur-dan-luas-juring",
        ms: "hubungan-panjang-lengkok-dan-luas-sektor",
      },
      slug: "relationship-between-arc-length-and-sector-area",
    },
    {
      routeSlugs: { de: "sektor", en: "sector", id: "juring", ms: "sektor" },
      slug: "sector",
    },
    {
      routeSlugs: {
        de: "kreissegment",
        en: "segment",
        id: "tembereng",
        ms: "tembereng",
      },
      slug: "segment",
    },
  ],
  slug: "circle-arc-sector",
  translations: {
    de: {
      description: "Verbinde Bogenlänge, Mittelpunktswinkel und Fläche.",
      title: "Kreisbögen und Kreissektoren",
    },
    en: {
      description: "Relate arc length, central angles, and sector area.",
      title: "Circle Arcs and Sectors",
    },
    id: {
      description: "Hubungkan busur, sudut pusat, dan luas juring.",
      title: "Busur dan Juring Lingkaran",
    },
    ms: {
      description: "Kaitkan panjang lengkok, sudut pusat dan luas sektor.",
      title: "Lengkok dan Sektor Bulatan",
    },
  },
});
