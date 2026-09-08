import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team den Rückgabecode beim Schirmverleih.",
        },
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team den Rückgabecode beim Schirmverleih.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team den Rückgabecode beim Schirmverleih.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team den Rückgabecode beim Schirmverleih.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team den Rückgabecode beim Schirmverleih",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "On Monday, the team tested the return code on each umbrella handle.",
        },
        {
          isCorrect: false,
          label:
            "on Monday, the team tested the return code on each umbrella handle.",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested the return code on each umbrella handle.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested the return code on each umbrella handle.",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested the return code on each umbrella handle",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji kode pengembalian pada setiap gagang payung",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
