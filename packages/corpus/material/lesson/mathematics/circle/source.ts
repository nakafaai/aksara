import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsCircleMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/circle",
  domain: "mathematics",
  key: "lesson.mathematics.circle",
  kind: "lesson",
  routeSlugs: { en: "circle", id: "lingkaran" },
  sections: [
    {
      routeSlugs: {
        en: "central-angle-and-inscribed-angle",
        id: "sudut-pusat-dan-sudut-keliling",
      },
      slug: "central-angle-and-inscribed-angle",
      translations: {
        en: {
          title: "Central Angle and Inscribed Angle",
        },
        id: {
          title: "Sudut Pusat dan Sudut Keliling",
        },
      },
    },
    {
      routeSlugs: {
        en: "circle-and-arc-circle",
        id: "lingkaran-dan-busur-lingkaran",
      },
      slug: "circle-and-arc-circle",
      translations: {
        en: {
          title: "Circle and Arc Circle",
        },
        id: {
          title: "Lingkaran dan Busur Lingkaran",
        },
      },
    },
    {
      routeSlugs: { en: "circle-and-chord", id: "lingkaran-dan-tali-busur" },
      slug: "circle-and-chord",
      translations: {
        en: {
          title: "Circle and Chord",
        },
        id: {
          title: "Lingkaran dan Tali Busur",
        },
      },
    },
    {
      routeSlugs: {
        en: "circle-and-tangent-line",
        id: "lingkaran-dan-garis-singgung",
      },
      slug: "circle-and-tangent-line",
      translations: {
        en: {
          title: "Circle and Tangent Line",
        },
        id: {
          title: "Lingkaran dan Garis Singgung",
        },
      },
    },
    {
      routeSlugs: {
        en: "external-tangent-line-and-internal-tangent-line",
        id: "garis-singgung-persekutuan-luar-dan-dalam",
      },
      slug: "external-tangent-line-and-internal-tangent-line",
      translations: {
        en: {
          title: "External Tangent Line and Internal Tangent Line",
        },
        id: {
          title: "Garis Singgung Persekutuan Luar dan Dalam",
        },
      },
    },
    {
      routeSlugs: {
        en: "properties-of-angle-in-circle",
        id: "sifat-sudut-dalam-lingkaran",
      },
      slug: "properties-of-angle-in-circle",
      translations: {
        en: {
          title: "Properties of Angle in Circle",
        },
        id: {
          title: "Sifat Sudut dalam Lingkaran",
        },
      },
    },
  ],
  slug: "circle",
  translations: {
    en: {
      description: "Relate central and inscribed angles in circles.",
      title: "Circle",
    },
    id: {
      description: "Hubungkan sudut pusat dan keliling pada lingkaran.",
      title: "Lingkaran",
    },
  },
});
