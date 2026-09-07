import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "am Montag prüfte das Team das Ortsformular im Fundbüro.",
        },
        {
          isCorrect: false,
          label: "Am montag prüfte das Team das Ortsformular im Fundbüro.",
        },
        {
          isCorrect: false,
          label: "Am Montag prüfte Das Team das Ortsformular im Fundbüro.",
        },
        {
          isCorrect: true,
          label: "Am Montag prüfte das Team das Ortsformular im Fundbüro.",
        },
        {
          isCorrect: false,
          label: "Am Montag, prüfte das Team das Ortsformular im Fundbüro",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested the form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested the form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested the form with structured location choices.",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested the form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested the form with structured location choices",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji formulir dengan pilihan lokasi terstruktur",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
