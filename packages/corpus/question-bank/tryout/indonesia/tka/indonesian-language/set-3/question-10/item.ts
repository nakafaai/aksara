import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "mapmakers-ink",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kesal karena noda membuktikan Laras ceroboh dan tidak layak membuat peta",
        },
        {
          correct: false,
          label:
            "ragu karena peta yang pernah dikoreksi pasti tidak aman digunakan",
        },
        {
          correct: false,
          label: "bangga karena noda menjadi tanda tempat berkumpul yang baru",
        },
        {
          correct: true,
          label:
            "menghargai keberanian Laras mengakui kekeliruan dan memperbaikinya melalui pemeriksaan nyata",
        },
        {
          correct: false,
          label:
            "cemas karena Laras sengaja membiarkan jalur tetap sulit dibaca",
        },
      ],
    },
  },
};

export default item;
