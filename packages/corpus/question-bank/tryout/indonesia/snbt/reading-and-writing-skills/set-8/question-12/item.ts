import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team ein Formular mit strukturierten Ortsangaben im Kontext Fundbüroservice.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team ein Formular mit strukturierten Ortsangaben im Kontext Fundbüroservice.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team ein Formular mit strukturierten Ortsangaben im Kontext Fundbüroservice.",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team ein Formular mit strukturierten Ortsangaben im folgenden Kontext: Fundbüroservice.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team ein Formular mit strukturierten Ortsangaben im Kontext Fundbüroservice",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested a form with structured location choices in this setting (lost-property service).",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested a form with structured location choices in this setting (lost-property service).",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested a form with structured location choices in this setting (lost-property service).",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested a form with structured location choices in this setting (lost-property service).",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested a form with structured location choices in this setting (lost-property service)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji formulir dengan pilihan lokasi yang terstruktur di layanan pencarian barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji formulir dengan pilihan lokasi yang terstruktur di layanan pencarian barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji formulir dengan pilihan lokasi yang terstruktur di layanan pencarian barang hilang.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji formulir dengan pilihan lokasi yang terstruktur di layanan pencarian barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji formulir dengan pilihan lokasi yang terstruktur di layanan pencarian barang hilang",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
