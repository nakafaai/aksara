import { unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Additional Mathematics chapters, in the order of their DSKP. */
export const kssmForm5AdditionalMathematicsTopicNodes = [
  unitNode({
    key: "form-5-additional-mathematics-circular-measure",
    order: 10,
    translations: {
      de: { routeSlug: "bogenmass", title: "Bogenmaß" },
      en: { routeSlug: "circular-measure", title: "Circular Measure" },
      id: { routeSlug: "ukuran-radian", title: "Ukuran Radian" },
      ms: { routeSlug: "sukatan-membulat", title: "Sukatan Membulat" },
    },
  }),
  unitNode({
    key: "form-5-additional-mathematics-differentiation",
    order: 20,
    translations: {
      de: { routeSlug: "differentialrechnung", title: "Differentialrechnung" },
      en: { routeSlug: "differentiation", title: "Differentiation" },
      id: { routeSlug: "turunan", title: "Turunan" },
      ms: { routeSlug: "pembezaan", title: "Pembezaan" },
    },
  }),
  unitNode({
    key: "form-5-additional-mathematics-integration",
    order: 30,
    translations: {
      de: { routeSlug: "integralrechnung", title: "Integralrechnung" },
      en: { routeSlug: "integration", title: "Integration" },
      id: { routeSlug: "integral", title: "Integral" },
      ms: { routeSlug: "pengamiran", title: "Pengamiran" },
    },
  }),
  unitNode({
    key: "form-5-additional-mathematics-permutation-and-combination",
    order: 40,
    translations: {
      de: {
        routeSlug: "permutationen-und-kombinationen",
        title: "Permutationen und Kombinationen",
      },
      en: {
        routeSlug: "permutation-and-combination",
        title: "Permutation and Combination",
      },
      id: {
        routeSlug: "permutasi-dan-kombinasi",
        title: "Permutasi dan Kombinasi",
      },
      ms: {
        routeSlug: "pilih-atur-dan-gabungan",
        title: "Pilih Atur dan Gabungan",
      },
    },
  }),
  unitNode({
    key: "form-5-additional-mathematics-probability-distribution",
    order: 50,
    translations: {
      de: {
        routeSlug: "wahrscheinlichkeitsverteilungen",
        title: "Wahrscheinlichkeitsverteilungen",
      },
      en: {
        routeSlug: "probability-distribution",
        title: "Probability Distribution",
      },
      id: { routeSlug: "distribusi-peluang", title: "Distribusi Peluang" },
      ms: {
        routeSlug: "taburan-kebarangkalian",
        title: "Taburan Kebarangkalian",
      },
    },
  }),
  unitNode({
    key: "form-5-additional-mathematics-trigonometric-functions",
    order: 60,
    translations: {
      de: {
        routeSlug: "trigonometrische-funktionen",
        title: "Trigonometrische Funktionen",
      },
      en: {
        routeSlug: "trigonometric-functions",
        title: "Trigonometric Functions",
      },
      id: { routeSlug: "fungsi-trigonometri", title: "Fungsi Trigonometri" },
      ms: { routeSlug: "fungsi-trigonometri", title: "Fungsi Trigonometri" },
    },
  }),
  unitNode({
    key: "form-5-additional-mathematics-linear-programming",
    order: 70,
    translations: {
      de: { routeSlug: "lineare-optimierung", title: "Lineare Optimierung" },
      en: { routeSlug: "linear-programming", title: "Linear Programming" },
      id: { routeSlug: "program-linear", title: "Program Linear" },
      ms: {
        routeSlug: "pengaturcaraan-linear",
        title: "Pengaturcaraan Linear",
      },
    },
  }),
  unitNode({
    key: "form-5-additional-mathematics-kinematics-of-linear-motion",
    order: 80,
    translations: {
      de: {
        routeSlug: "kinematik-geradliniger-bewegung",
        title: "Kinematik geradliniger Bewegung",
      },
      en: {
        routeSlug: "kinematics-of-linear-motion",
        title: "Kinematics of Linear Motion",
      },
      id: {
        routeSlug: "kinematika-gerak-lurus",
        title: "Kinematika Gerak Lurus",
      },
      ms: {
        routeSlug: "kinematik-gerakan-linear",
        title: "Kinematik Gerakan Linear",
      },
    },
  }),
];
