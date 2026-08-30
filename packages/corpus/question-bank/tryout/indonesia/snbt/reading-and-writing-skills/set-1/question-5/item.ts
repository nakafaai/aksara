import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Bootsform des Sarkophags von Tomok.",
        },
        {
          isCorrect: false,
          label: "Megalithische Überreste am Tobasee.",
        },
        {
          isCorrect: false,
          label: "Schutzfiguren auf Gräbern der Toba-Batak.",
        },
        {
          isCorrect: true,
          label:
            "Der Sarkophag von Tomok in der megalithischen Tradition der Toba-Batak.",
        },
        {
          isCorrect: false,
          label: "Bestattungsbräuche auf der Insel Samosir.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The Boat Form of the Tomok Sarcophagus.",
        },
        {
          isCorrect: false,
          label: "Megalithic Remains around Lake Toba.",
        },
        {
          isCorrect: false,
          label: "Protective Figures on Toba Batak Graves.",
        },
        {
          isCorrect: true,
          label:
            "The Tomok Sarcophagus in the Toba Batak Megalithic Tradition.",
        },
        {
          isCorrect: false,
          label: "Burial Customs on Samosir Island.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Bentuk Kapal pada Sarkofagus Tomok.",
        },
        {
          isCorrect: false,
          label: "Tinggalan Megalitik di Sekitar Danau Toba.",
        },
        {
          isCorrect: false,
          label: "Figur Pelindung pada Kubur Batak Toba.",
        },
        {
          isCorrect: true,
          label: "Sarkofagus Tomok dalam Tradisi Megalitik Batak Toba.",
        },
        {
          isCorrect: false,
          label: "Adat Penguburan di Pulau Samosir.",
        },
      ],
    },
  },
};

export default item;
