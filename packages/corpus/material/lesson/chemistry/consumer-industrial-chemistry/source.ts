import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/consumer-industrial-chemistry",
  domain: "chemistry",
  key: "lesson.chemistry.consumer-industrial-chemistry",
  kind: "lesson",
  routeSlugs: {
    en: "consumer-and-industrial-chemistry",
    id: "kimia-konsumen-dan-industri",
    de: "verbraucher-und-industriechemie",
    ms: "kimia-konsumer-dan-industri",
  },
  sections: ["consumer-products"],
  slug: "consumer-industrial-chemistry",
  translations: {
    en: {
      description: "Explain soap, additives, medicines and nanotechnology.",
      title: "Consumer and Industrial Chemistry",
    },
    id: {
      description: "Jelaskan sabun, zat aditif, obat, dan nanoteknologi.",
      title: "Kimia Konsumen dan Industri",
    },
    de: {
      description: "Erklär Seife, Zusatzstoffe, Arzneien und Nanotechnik.",
      title: "Verbraucher- und Industriechemie",
    },
    ms: {
      description: "Terangkan sabun, bahan tambah, ubat dan nanoteknologi.",
      title: "Kimia Konsumer dan Industri",
    },
  },
};

export default lesson;
