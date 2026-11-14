import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "pranata-mangsa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa pengetahuan petani tentang bintang semakin berkurang",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa letak bintang ikut berubah akibat perubahan iklim",
        },
        {
          correct: false,
          label:
            "menjelaskan cara menemukan Lintang Waluku di langit menjelang subuh",
        },
        {
          correct: true,
          label:
            "menunjukkan bahwa tanda yang dahulu tepat kini dapat menyesatkan, karena bintang tetap pada jadwalnya sedangkan hujan bergeser",
        },
        {
          correct: false,
          label:
            "memperkenalkan Lintang Waluku kepada pembaca yang belum mengenalnya",
        },
      ],
    },
  },
};

export default item;
