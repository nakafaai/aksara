import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      categories: ["Data pengamatan", "Penjelasan alternatif"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "438 liter air pada minggu ketiga",
        },
        {
          correctCategoryOrder: 2,
          label: "Kantin berhenti menjual satu merek air kemasan",
        },
        {
          correctCategoryOrder: 2,
          label: "Suhu udara meningkat",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
