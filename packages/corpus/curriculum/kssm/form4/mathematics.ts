import { mathematicsStandards } from "#corpus/curriculum/kssm/documents";
import {
  kssmForm4CombinedProbabilityUnit,
  kssmForm4UngroupedDispersionUnit,
} from "#corpus/curriculum/kssm/form4/mathematics/statistics";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Mathematics chapters, in the order of their DSKP. */
export const kssmForm4MathematicsTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-mathematics-quadratic-functions-and-equations-in-one-variable-quadratic-function",
        level: "lesson",
        materialKeys: ["lesson.mathematics.quadratic-function"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 1.1, Standard Pembelajaran 1.1.1 hingga 1.1.8",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-mathematics-quadratic-functions-and-equations-in-one-variable",
    materialCard: {
      de: {
        description: "Zeichne Parabeln und löse quadratische Gleichungen.",
        title: "Quadratische Funktionen und Gleichungen in einer Variablen",
      },
      en: {
        description: "Sketch parabolas and solve quadratic equations.",
        title: "Quadratic Functions and Equations in One Variable",
      },
      id: {
        description: "Gambar parabola dan selesaikan persamaan kuadrat.",
        title: "Fungsi dan Persamaan Kuadrat Satu Variabel",
      },
      ms: {
        description: "Lakar parabola dan selesaikan persamaan kuadratik.",
        title: "Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "quadratische-funktionen-und-gleichungen-in-einer-variablen",
        title: "Quadratische Funktionen und Gleichungen in einer Variablen",
      },
      en: {
        routeSlug: "quadratic-functions-and-equations-in-one-variable",
        title: "Quadratic Functions and Equations in One Variable",
      },
      id: {
        routeSlug: "fungsi-dan-persamaan-kuadrat-satu-variabel",
        title: "Fungsi dan Persamaan Kuadrat Satu Variabel",
      },
      ms: {
        routeSlug: "fungsi-dan-persamaan-kuadratik-dalam-satu-pemboleh-ubah",
        title: "Fungsi dan Persamaan Kuadratik dalam Satu Pemboleh Ubah",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-mathematics-number-bases-number-base",
        level: "lesson",
        materialKeys: ["lesson.mathematics.number-base"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 2.1",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-mathematics-number-bases",
    materialCard: {
      de: {
        description: "Lies Stellenwerte, rechne um, addiere und subtrahiere.",
        title: "Zahlensysteme",
      },
      en: {
        description: "Read place value, convert bases, add and subtract.",
        title: "Number Bases",
      },
      id: {
        description: "Baca nilai tempat, ubah basis, jumlahkan, dan kurangkan.",
        title: "Basis Bilangan",
      },
      ms: {
        description: "Baca nilai tempat, tukar asas, tambah dan tolak.",
        title: "Asas Nombor",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "zahlensysteme", title: "Zahlensysteme" },
      en: { routeSlug: "number-bases", title: "Number Bases" },
      id: { routeSlug: "basis-bilangan", title: "Basis Bilangan" },
      ms: { routeSlug: "asas-nombor", title: "Asas Nombor" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-mathematics-logical-reasoning-logic",
        level: "lesson",
        materialKeys: ["lesson.mathematics.logic"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 3.1 hingga 3.2",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-mathematics-logical-reasoning",
    materialCard: {
      de: {
        description: "Prüfe Implikationen und ziehe gültige Schlüsse.",
        title: "Logisches Schließen",
      },
      en: {
        description: "Test implications and build valid arguments.",
        title: "Logical Reasoning",
      },
      id: {
        description: "Uji implikasi dan susun penalaran yang sah.",
        title: "Penalaran Logis",
      },
      ms: {
        description: "Uji implikasi dan bina hujah yang sah.",
        title: "Penaakulan Logik",
      },
    },
    order: 30,
    translations: {
      de: { routeSlug: "logisches-schliessen", title: "Logisches Schließen" },
      en: { routeSlug: "logical-reasoning", title: "Logical Reasoning" },
      id: { routeSlug: "penalaran-logis", title: "Penalaran Logis" },
      ms: { routeSlug: "penaakulan-logik", title: "Penaakulan Logik" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-mathematics-operations-on-sets-set-operation",
        level: "lesson",
        materialKeys: ["lesson.mathematics.set-operation"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 4.1 hingga 4.3",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-mathematics-operations-on-sets",
    materialCard: {
      de: {
        description: "Bilde Schnitt und Vereinigung und zähle Elemente.",
        title: "Mengenoperationen",
      },
      en: {
        description: "Form intersections and unions and count elements.",
        title: "Operations on Sets",
      },
      id: {
        description: "Tentukan irisan, gabungan, dan banyak anggota.",
        title: "Operasi Himpunan",
      },
      ms: {
        description: "Tentukan persilangan, kesatuan dan bilangan unsur.",
        title: "Operasi Set",
      },
    },
    order: 40,
    translations: {
      de: { routeSlug: "mengenoperationen", title: "Mengenoperationen" },
      en: { routeSlug: "operations-on-sets", title: "Operations on Sets" },
      id: { routeSlug: "operasi-himpunan", title: "Operasi Himpunan" },
      ms: { routeSlug: "operasi-set", title: "Operasi Set" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-mathematics-network-in-graph-theory-graph-network",
        level: "lesson",
        materialKeys: ["lesson.mathematics.graph-network"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 4, Standard Kandungan 5.1",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-4-mathematics-network-in-graph-theory",
    materialCard: {
      de: {
        description: "Bestimme Grade, Bäume und kürzeste Wege.",
        title: "Netzwerke in der Graphentheorie",
      },
      en: {
        description: "Find degrees, trees and shortest paths.",
        title: "Network in Graph Theory",
      },
      id: {
        description: "Tentukan derajat, pohon, dan lintasan terpendek.",
        title: "Jaringan dalam Teori Graf",
      },
      ms: {
        description: "Tentukan darjah, pokok dan laluan terpendek.",
        title: "Rangkaian dalam Teori Graf",
      },
    },
    order: 50,
    translations: {
      de: {
        routeSlug: "netzwerke-in-der-graphentheorie",
        title: "Netzwerke in der Graphentheorie",
      },
      en: {
        routeSlug: "network-in-graph-theory",
        title: "Network in Graph Theory",
      },
      id: {
        routeSlug: "jaringan-dalam-teori-graf",
        title: "Jaringan dalam Teori Graf",
      },
      ms: {
        routeSlug: "rangkaian-dalam-teori-graf",
        title: "Rangkaian dalam Teori Graf",
      },
    },
  }),
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
