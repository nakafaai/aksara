import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "letter-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "aku lirik menanam bunga di halaman rumah kosnya untuk mengingat kampung halamannya",
        },
        {
          correct: false,
          label:
            "aku lirik ingin segera pulang dan bertani lagi di sawah ibunya",
        },
        {
          correct: false,
          label: "aku lirik sudah melupakan kampungnya sejak bekerja di kota",
        },
        {
          correct: false,
          label: "aku lirik sakit dada karena udara kota yang kotor",
        },
        {
          correct: true,
          label:
            "aku lirik berusaha merawat ingatan dan ikatannya dengan kampung halaman",
        },
      ],
    },
  },
};

export default item;
