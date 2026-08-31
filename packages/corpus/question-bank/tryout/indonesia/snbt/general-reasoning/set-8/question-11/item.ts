import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Jeder Bezirk der Stadt muss Hochwasserstatus erhalten.",
        },
        {
          isCorrect: false,
          label: "Bezirk X kann keinen Hochwasserstatus erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Alle Menschen in der Stadt müssen die Stadt sofort verlassen.",
        },
        {
          isCorrect: true,
          label:
            "Die registrierten Einwohnerinnen und Einwohner von Bezirk X erhalten eine Evakuierungsanordnung.",
        },
        {
          isCorrect: false,
          label:
            "Ob die registrierten Einwohnerinnen und Einwohner von Bezirk X eine Evakuierungsanordnung erhalten, lässt sich nicht bestimmen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every district in the city must enter flood status.",
        },
        {
          isCorrect: false,
          label: "District X cannot enter flood status.",
        },
        {
          isCorrect: false,
          label: "Every person in the city must leave immediately.",
        },
        {
          isCorrect: true,
          label:
            "Registered residents of District X receive an evacuation order.",
        },
        {
          isCorrect: false,
          label:
            "It cannot be determined whether registered residents of District X receive an evacuation order.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap distrik di kota pasti berstatus banjir.",
        },
        {
          isCorrect: false,
          label: "Distrik X tidak mungkin berstatus banjir.",
        },
        {
          isCorrect: false,
          label: "Semua warga kota harus segera meninggalkan kota.",
        },
        {
          isCorrect: true,
          label:
            "Penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
        },
        {
          isCorrect: false,
          label:
            "Tidak dapat ditentukan apakah penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
        },
      ],
    },
  },
};

export default item;
