import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "kesal karena noda membuktikan Laras ceroboh dan tidak layak membuat peta",
        },
        {
          isCorrect: false,
          label:
            "ragu karena peta yang pernah dikoreksi pasti tidak aman digunakan",
        },
        {
          isCorrect: false,
          label: "bangga karena noda menjadi tanda tempat berkumpul yang baru",
        },
        {
          isCorrect: true,
          label:
            "menghargai keberanian Laras mengakui kekeliruan dan memperbaikinya melalui pemeriksaan nyata",
        },
        {
          isCorrect: false,
          label:
            "cemas karena Laras sengaja membiarkan jalur tetap sulit dibaca",
        },
      ],
    },
  },
  stimulusKey: "mapmakers-ink",
};

export default item;
