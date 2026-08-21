import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Der gesamte gemeinsame Arbeitseinsatz am Sonntag wurde wegen des Regens abgesagt.",
      value: false,
    },
    {
      label:
        "Beim gemeinsamen Arbeitseinsatz am Sonntag wurden wiederverwendbare Gegenstände gesammelt.",
      value: true,
    },
    {
      label:
        "Am Sonntag wurden sowohl der Entwässerungsgraben gereinigt als auch wiederverwendbare Gegenstände gesammelt.",
      value: false,
    },
    {
      label:
        "Am Sonntag wurde nur der Entwässerungsgraben gereinigt; wiederverwendbare Gegenstände wurden nicht gesammelt.",
      value: false,
    },
    {
      label:
        "Wegen des Regens fand am Sonntag überhaupt kein gemeinsamer Arbeitseinsatz statt.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Sunday's entire neighborhood work day was cancelled because of the rain.",
      value: false,
    },
    {
      label:
        "Reusable items were collected during Sunday's neighborhood work day.",
      value: true,
    },
    {
      label:
        "Both the drainage ditch cleaning and the reusable-item collection took place on Sunday.",
      value: false,
    },
    {
      label:
        "Only the drainage ditch was cleaned on Sunday; reusable items were not collected.",
      value: false,
    },
    {
      label: "No neighborhood work took place on Sunday because of the rain.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Pada hari Minggu tidak jadi dilaksanakan kerja bakti karena turun hujan.",
      value: false,
    },
    {
      label:
        "Pada hari Minggu dilaksanakan kerja bakti mengumpulkan barang bekas.",
      value: true,
    },
    {
      label:
        "Pada hari Minggu dilaksanakan kerja bakti membersihkan selokan dan mengumpulkan barang bekas.",
      value: false,
    },
    {
      label:
        "Pada hari Minggu hanya selokan yang dibersihkan, sedangkan barang bekas tidak dikumpulkan.",
      value: false,
    },
    {
      label:
        "Pada hari Minggu kerja bakti tidak dilaksanakan karena turun hujan.",
      value: false,
    },
  ],
};

export default choices;
