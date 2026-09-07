import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalise zum Ortsformular im Fundbüro",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkaitsanalyse zum Ortsformular im Fundbüro",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalyse zum Ortsformullar im Fundbüro",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalyse zum Ortsformular im Fundbüroo",
        },
        {
          isCorrect: true,
          label: "eine Wirksamkeitsanalyse zum Ortsformular im Fundbüro",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysiss of the effectiveness of the form with structured location choices",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivness of the form with structured location choices",
        },
        {
          isCorrect: false,
          label:
            "an analisis of the effectiveness of the form with structured location choices",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivenes of the form with structured location choices",
        },
        {
          isCorrect: true,
          label:
            "an analysis of the effectiveness of the form with structured location choices",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisa efektivitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          isCorrect: false,
          label:
            "analisis efektifitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          isCorrect: false,
          label:
            "analisa efektifitas formulir dengan pilihan lokasi terstruktur",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas formulir lokasi dalam kontek layanan barang hilang",
        },
        {
          isCorrect: true,
          label:
            "analisis efektivitas formulir dengan pilihan lokasi terstruktur",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
