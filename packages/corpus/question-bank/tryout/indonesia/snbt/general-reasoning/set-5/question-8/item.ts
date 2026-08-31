import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Einige Einwohner von Jakarta verfügen über eine Geburtsurkunde und einen Personalausweis (KTP).",
        },
        {
          isCorrect: false,
          label:
            "Alle Einwohner von Jakarta haben eine Geburtsurkunde und einen Personalausweis (KTP).",
        },
        {
          isCorrect: false,
          label:
            "Alle Einwohner von Jakarta haben eine Geburtsurkunde oder einen Personalausweis (KTP).",
        },
        {
          isCorrect: false,
          label:
            "Es gibt Einwohner von Jakarta, die älter als $$17$$ Jahre sind und keine Geburtsurkunde, aber einen Personalausweis (KTP) besitzen.",
        },
        {
          isCorrect: false,
          label:
            "Einige Einwohner von Jakarta haben keine Geburtsurkunde, aber einen Personalausweis (KTP).",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Some Jakarta residents have a birth certificate and ID card (KTP)",
        },
        {
          isCorrect: false,
          label:
            "All Jakarta residents have a birth certificate and ID card (KTP)",
        },
        {
          isCorrect: false,
          label:
            "All Jakarta residents have a birth certificate or ID card (KTP)",
        },
        {
          isCorrect: false,
          label:
            "There are Jakarta residents over $$17$$ years old who do not have a birth certificate but have an ID card (KTP)",
        },
        {
          isCorrect: false,
          label:
            "Some Jakarta residents do not have a birth certificate but have an ID card (KTP)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Sebagian warga Jakarta memiliki AKTA kelahiran dan KTP",
        },
        {
          isCorrect: false,
          label: "Semua warga Jakarta memiliki AKTA kelahiran dan KTP",
        },
        {
          isCorrect: false,
          label: "Semua warga Jakarta memiliki AKTA kelahiran atau KTP",
        },
        {
          isCorrect: false,
          label:
            "Ada warga Jakarta di atas $$17$$ tahun tidak memiliki AKTA kelahiran namun memiliki KTP",
        },
        {
          isCorrect: false,
          label:
            "Sebagian warga Jakarta tidak memiliki AKTA kelahiran namun mempunyai KTP",
        },
      ],
    },
  },
};

export default item;
