import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Ia mula-mula menambah not pada birama kosong.",
        },
        {
          isCorrect: true,
          label: "Ia menahan diri agar Ayu menemukan tempo.",
        },
        {
          isCorrect: false,
          label: "Ia tetap ingin menutupi semua bagian cello.",
        },
        {
          isCorrect: true,
          label: "Ia menulis kata ‘dengarkan’ pada partitur.",
        },
      ],
    },
  },
  stimulusKey: "empty-measure",
};

export default item;
