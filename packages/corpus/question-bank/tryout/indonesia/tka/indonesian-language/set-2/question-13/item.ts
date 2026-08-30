import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "agar air tidak pernah masuk ke taman",
        },
        {
          isCorrect: false,
          label: "agar selokan tidak perlu dibersihkan",
        },
        {
          isCorrect: true,
          label:
            "agar tingkat keparahan genangan dapat dibandingkan selain durasinya",
        },
        {
          isCorrect: false,
          label: "agar semua hujan memiliki intensitas sama",
        },
        {
          isCorrect: false,
          label: "agar tanaman dapat dipindahkan ke gerbang",
        },
      ],
    },
  },
  stimulusKey: "rain-garden",
};

export default item;
