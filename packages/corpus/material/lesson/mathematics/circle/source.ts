import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsCircleMaterial = defineLessonMaterial({
  assetRoot: "material/lesson/mathematics/circle",
  domain: "mathematics",
  key: "lesson.mathematics.circle",
  kind: "lesson",
  routeSlugs: { de: "kreisgeometrie", en: "circle", id: "lingkaran" },
  sections: [
    {
      routeSlugs: {
        de: "mittelpunkt-und-umfangswinkel",
        en: "central-angle-and-inscribed-angle",
        id: "sudut-pusat-dan-sudut-keliling",
      },
      slug: "central-angle-and-inscribed-angle",
    },
    {
      routeSlugs: {
        de: "kreis-und-kreisbogen",
        en: "circle-and-arc-circle",
        id: "lingkaran-dan-busur-lingkaran",
      },
      slug: "circle-and-arc-circle",
    },
    {
      routeSlugs: {
        de: "kreis-und-sehne",
        en: "circle-and-chord",
        id: "lingkaran-dan-tali-busur",
      },
      slug: "circle-and-chord",
    },
    {
      routeSlugs: {
        de: "kreis-und-tangente",
        en: "circle-and-tangent-line",
        id: "lingkaran-dan-garis-singgung",
      },
      slug: "circle-and-tangent-line",
    },
    {
      routeSlugs: {
        de: "aeussere-und-innere-gemeinsame-tangente",
        en: "external-tangent-line-and-internal-tangent-line",
        id: "garis-singgung-persekutuan-luar-dan-dalam",
      },
      slug: "external-tangent-line-and-internal-tangent-line",
    },
    {
      routeSlugs: {
        de: "winkelsaetze-am-kreis",
        en: "properties-of-angle-in-circle",
        id: "sifat-sudut-dalam-lingkaran",
      },
      slug: "properties-of-angle-in-circle",
    },
  ],
  slug: "circle",
  translations: {
    de: {
      description: "Vergleiche Mittel- und Umfangswinkel am Kreis.",
      title: "Kreisgeometrie",
    },
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
