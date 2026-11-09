import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "sidat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mencari makan",
        },
        {
          correct: false,
          label: "berganti kulit",
        },
        {
          correct: true,
          label: "bertelur dan berkembang biak",
        },
        {
          correct: false,
          label: "beristirahat panjang",
        },
        {
          correct: false,
          label: "bersembunyi dari ikan pemangsa",
        },
      ],
    },
  },
};

export default item;
