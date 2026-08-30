import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der gesamte gemeinsame Arbeitseinsatz am Sonntag wurde wegen des Regens abgesagt.",
        },
        {
          isCorrect: true,
          label:
            "Beim gemeinsamen Arbeitseinsatz am Sonntag wurden wiederverwendbare Gegenstände gesammelt.",
        },
        {
          isCorrect: false,
          label:
            "Am Sonntag wurden sowohl der Entwässerungsgraben gereinigt als auch wiederverwendbare Gegenstände gesammelt.",
        },
        {
          isCorrect: false,
          label:
            "Am Sonntag wurde nur der Entwässerungsgraben gereinigt; wiederverwendbare Gegenstände wurden nicht gesammelt.",
        },
        {
          isCorrect: false,
          label:
            "Wegen des Regens fand am Sonntag überhaupt kein gemeinsamer Arbeitseinsatz statt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sunday's entire neighborhood work day was cancelled because of the rain.",
        },
        {
          isCorrect: true,
          label:
            "Reusable items were collected during Sunday's neighborhood work day.",
        },
        {
          isCorrect: false,
          label:
            "Both the drainage ditch cleaning and the reusable-item collection took place on Sunday.",
        },
        {
          isCorrect: false,
          label:
            "Only the drainage ditch was cleaned on Sunday; reusable items were not collected.",
        },
        {
          isCorrect: false,
          label:
            "No neighborhood work took place on Sunday because of the rain.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pada hari Minggu tidak jadi dilaksanakan kerja bakti karena turun hujan.",
        },
        {
          isCorrect: true,
          label:
            "Pada hari Minggu dilaksanakan kerja bakti mengumpulkan barang bekas.",
        },
        {
          isCorrect: false,
          label:
            "Pada hari Minggu dilaksanakan kerja bakti membersihkan selokan dan mengumpulkan barang bekas.",
        },
        {
          isCorrect: false,
          label:
            "Pada hari Minggu hanya selokan yang dibersihkan, sedangkan barang bekas tidak dikumpulkan.",
        },
        {
          isCorrect: false,
          label:
            "Pada hari Minggu kerja bakti tidak dilaksanakan karena turun hujan.",
        },
      ],
    },
  },
};

export default item;
