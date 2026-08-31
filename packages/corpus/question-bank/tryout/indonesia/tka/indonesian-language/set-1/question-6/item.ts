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
          label: "Awalnya lampu mempertahankan ingatan tentang ayahnya.",
        },
        {
          isCorrect: true,
          label: "Saat hujan, lampu membantu memanggil pertolongan.",
        },
        {
          isCorrect: false,
          label: "Pada akhir cerita, lampu menjadi alasan menjual dermaga.",
        },
        {
          isCorrect: true,
          label:
            "Pada akhir cerita, kebiasaan pribadi berkembang menjadi kepedulian bersama.",
        },
      ],
    },
  },
  stimulusKey: "harbor-lamp",
};

export default item;
