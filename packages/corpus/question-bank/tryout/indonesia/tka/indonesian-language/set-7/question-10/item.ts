import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "mango-tree",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pak Darmo memagari pohon agar tidak ada yang memetik mangganya",
        },
        {
          correct: false,
          label: "Ayu membuang mangga yang jatuh ke halamannya",
        },
        {
          correct: false,
          label: "anak-anak di gang tetap takut mendekati rumah Pak Darmo",
        },
        {
          correct: true,
          label:
            "Ayu dan anak-anak di gang kembali memetik dan membagikan mangga bersama Pak Darmo",
        },
        {
          correct: false,
          label: "ibu Ayu meminta Pak Darmo menebang pohon itu",
        },
      ],
    },
  },
};

export default item;
