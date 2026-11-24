import { mathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { kssmForm4MathematicsFoundationNodes } from "#corpus/curriculum/kssm/form4/mathematics/foundations";
import {
  kssmForm4CombinedProbabilityUnit,
  kssmForm4UngroupedDispersionUnit,
} from "#corpus/curriculum/kssm/form4/mathematics/statistics";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Mathematics chapters, in the order of their DSKP. */
export const kssmForm4MathematicsTopicNodes = [
  ...kssmForm4MathematicsFoundationNodes,
  unitNode({
    children: [
      materialNode({
        key: "form-4-mathematics-linear-inequalities-in-two-variables-linear-equation-inequality",
        level: "lesson",
        materialKeys: ["lesson.mathematics.linear-equation-inequality"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 6.1 hingga 6.2, Standard Pembelajaran 6.1.1 hingga 6.2.4",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-mathematics-linear-inequalities-in-two-variables",
    materialCard: {
      de: {
        description: "Markiere die Bereiche, die Ungleichungen erlauben.",
        title: "Lineare Ungleichungen in zwei Variablen",
      },
      en: {
        description: "Shade the regions that two-variable inequalities allow.",
        title: "Linear Inequalities in Two Variables",
      },
      id: {
        description: "Arsir daerah yang memenuhi pertidaksamaan dua variabel.",
        title: "Pertidaksamaan Linear Dua Variabel",
      },
      ms: {
        description: "Lorek rantau yang memenuhi ketaksamaan linear.",
        title: "Ketaksamaan Linear dalam Dua Pemboleh Ubah",
      },
    },
    order: 60,
    translations: {
      de: {
        routeSlug: "lineare-ungleichungen-in-zwei-variablen",
        title: "Lineare Ungleichungen in zwei Variablen",
      },
      en: {
        routeSlug: "linear-inequalities-in-two-variables",
        title: "Linear Inequalities in Two Variables",
      },
      id: {
        routeSlug: "pertidaksamaan-linear-dua-variabel",
        title: "Pertidaksamaan Linear Dua Variabel",
      },
      ms: {
        routeSlug: "ketaksamaan-linear-dalam-dua-pemboleh-ubah",
        title: "Ketaksamaan Linear dalam Dua Pemboleh Ubah",
      },
    },
  }),
  unitNode({
    key: "form-4-mathematics-graphs-of-motion",
    order: 70,
    translations: {
      de: { routeSlug: "bewegungsdiagramme", title: "Bewegungsdiagramme" },
      en: { routeSlug: "graphs-of-motion", title: "Graphs of Motion" },
      id: { routeSlug: "grafik-gerak", title: "Grafik Gerak" },
      ms: { routeSlug: "graf-gerakan", title: "Graf Gerakan" },
    },
  }),
  kssmForm4UngroupedDispersionUnit,
  kssmForm4CombinedProbabilityUnit,
  unitNode({
    children: [
      materialNode({
        key: "form-4-mathematics-consumer-mathematics-financial-management-financial-planning",
        level: "lesson",
        materialKeys: ["lesson.mathematics.financial-planning"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 10.1",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-mathematics-consumer-mathematics-financial-management",
    materialCard: {
      de: {
        description: "Stelle ein Budget auf und plane ein Sparziel.",
        title: "Finanzplanung",
      },
      en: {
        description: "Build a budget and plan a savings goal.",
        title: "Financial Management",
      },
      id: {
        description: "Susun anggaran dan rencanakan target tabungan.",
        title: "Pengelolaan Keuangan",
      },
      ms: {
        description: "Bina belanjawan dan rancang sasaran simpanan.",
        title: "Pengurusan Kewangan",
      },
    },
    order: 100,
    translations: {
      de: {
        routeSlug: "verbrauchermathematik-finanzplanung",
        title: "Verbrauchermathematik: Finanzplanung",
      },
      en: {
        routeSlug: "consumer-mathematics-financial-management",
        title: "Consumer Mathematics: Financial Management",
      },
      id: {
        routeSlug: "matematika-konsumen-pengelolaan-keuangan",
        title: "Matematika Konsumen: Pengelolaan Keuangan",
      },
      ms: {
        routeSlug: "matematik-pengguna-pengurusan-kewangan",
        title: "Matematik Pengguna: Pengurusan Kewangan",
      },
    },
  }),
];
