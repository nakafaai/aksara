import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "novel-review",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Catatan itu menunjukkan bahwa sang kakek pernah menghadapi pilihan serupa dengan cucunya.",
        },
        {
          correct: false,
          label:
            "Catatan itu menjelaskan cara membuat peta mata air dengan tangan secara rinci.",
        },
        {
          correct: false,
          label:
            "Catatan itu menggantikan dialog antarwarga yang terlalu banyak dalam novel.",
        },
        {
          correct: false,
          label:
            "Catatan itu membuktikan bahwa perkebunan di hulu sudah ada sejak tahun 1970-an.",
        },
        {
          correct: false,
          label:
            "Catatan itu menunjukkan bahwa Sinta sebenarnya tidak berasal dari desa itu.",
        },
      ],
    },
  },
};

export default item;
