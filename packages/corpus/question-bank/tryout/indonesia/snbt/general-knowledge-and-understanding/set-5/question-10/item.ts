import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "paraphrase",
  },
  stimulus: "petir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Guruh dapat menyambar orang yang mendengarnya dari jarak dekat.",
        },
        {
          correct: false,
          label:
            "Orang hanya dapat tersambar petir jika guruh terdengar sangat keras.",
        },
        {
          correct: true,
          label:
            "Terdengarnya guruh menandakan bahwa bahaya sambaran petir sudah dekat.",
        },
        {
          correct: false,
          label:
            "Petir yang guruhnya tidak terdengar pasti tidak berbahaya bagi siapa pun.",
        },
        {
          correct: false,
          label:
            "Jarak petir tidak dapat diperkirakan dari bunyi guruh yang terdengar.",
        },
      ],
    },
  },
};

export default item;
