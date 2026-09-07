import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalise zum Ausfüllbeispiel im Lärmformular",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkaitsanalyse zum Ausfüllbeispiel im Lärmformular",
        },
        {
          isCorrect: true,
          label: "eine Wirksamkeitsanalyse zum Ausfüllbeispiel im Lärmformular",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalyse zum Ausfülbeispiel im Lärmformular",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zum Ausfüllbeispiel im Lärmformullar",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysiss of the effectiveness of the example on the noise-report form",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivness of the example on the noise-report form",
        },
        {
          isCorrect: true,
          label:
            "an analysis of the effectiveness of the example on the noise-report form",
        },
        {
          isCorrect: false,
          label:
            "an analisis of the effectiveness of the example on the noise-report form",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivenes of the example on the noise-report form",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas contoh pencatatan waktu suara",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas contoh pencatatan waktu suara",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas contoh pencatatan waktu suara",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas contoh pencatatan waktu suara",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas contoh pencatatan dalam kontek kebisingan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
