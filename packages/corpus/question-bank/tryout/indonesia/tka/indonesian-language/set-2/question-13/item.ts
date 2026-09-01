import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "agar tingkat keparahan genangan dapat dibandingkan selain durasinya",
        },
        {
          isCorrect: false,
          label: "agar air tidak pernah masuk ke taman",
        },
        {
          isCorrect: false,
          label:
            "agar perubahan durasi genangan dapat dikaitkan dengan taman tanpa memeriksa kondisi selokan",
        },
        {
          isCorrect: false,
          label:
            "agar pengukuran genangan dapat dibandingkan tanpa menyesuaikan perbedaan intensitas hujan",
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
