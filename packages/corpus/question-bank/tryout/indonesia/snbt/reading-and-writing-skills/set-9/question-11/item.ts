import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalise zum Digitalplan im Proberaum",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkaitsanalyse zum Digitalplan im Proberaum",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalyse zum Digittalplan im Proberaum",
        },
        {
          isCorrect: true,
          label: "eine Wirksamkeitsanalyse zum Digitalplan im Proberaum",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalyse zum Digitalplan im Proberaumm",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysiss of the effectiveness of the digital schedule updated after cancellations",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivness of the digital schedule updated after cancellations",
        },
        {
          isCorrect: false,
          label:
            "an analisis of the effectiveness of the digital schedule updated after cancellations",
        },
        {
          isCorrect: true,
          label:
            "an analysis of the effectiveness of the digital schedule updated after cancellations",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivenes of the digital schedule updated after cancellations",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas jadwal digital setelah pembatalan",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas jadwal digital setelah pembatalan",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas jadwal digital setelah pembatalan",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas jadwal digital setelah pembatalan",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas jadwal digital dalam kontek ruang latihan musik",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
