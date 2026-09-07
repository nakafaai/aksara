import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalise zum Rückgabecode beim Schirmverleih",
        },
        {
          isCorrect: true,
          label: "eine Wirksamkeitsanalyse zum Rückgabecode beim Schirmverleih",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkaitsanalyse zum Rückgabecode beim Schirmverleih",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalyse zum Rückgabecod beim Schirmverleih",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zum Rückgabecode beim Schirmverleihh",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysiss of the effectiveness of the return code on each umbrella handle",
        },
        {
          isCorrect: true,
          label:
            "an analysis of the effectiveness of the return code on each umbrella handle",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivness of the return code on each umbrella handle",
        },
        {
          isCorrect: false,
          label:
            "an analisis of the effectiveness of the return code on each umbrella handle",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivenes of the return code on each umbrella handle",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas kode pengembalian pada setiap gagang",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas kode pengembalian pada setiap gagang",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas kode pengembalian pada setiap gagang",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas kode pengembalian pada setiap gagang",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas kode pengembalian dalam kontek peminjaman payung",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
