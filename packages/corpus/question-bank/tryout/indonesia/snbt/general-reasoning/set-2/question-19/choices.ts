import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
