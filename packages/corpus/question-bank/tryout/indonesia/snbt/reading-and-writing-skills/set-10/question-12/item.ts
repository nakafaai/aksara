import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team kleine Karten mit Gehzeiten im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team kleine Karten mit Gehzeiten im Stadtpark.",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team kleine Karten mit Gehzeiten im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team kleine Karten mit Gehzeiten im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team kleine Karten mit Gehzeiten im Stadtpark",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested small maps showing walking times in the city park.",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested small maps showing walking times in the city park.",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested small maps showing walking times in the city park.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested small maps showing walking times in the city park.",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested small maps showing walking times in the city park",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji peta kecil dengan waktu tempuh di taman kota",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
