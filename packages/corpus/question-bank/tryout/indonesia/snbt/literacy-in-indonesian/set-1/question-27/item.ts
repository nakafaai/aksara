import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "salt-field",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Langit yang berubah makin biru ketika siang tiba.",
        },
        {
          correct: false,
          label: "Ayah yang menyerah pada cuaca yang tidak menentu.",
        },
        {
          correct: false,
          label: "Air laut yang surut karena pasang berganti.",
        },
        {
          correct: true,
          label: "Air laut yang menguap dan meninggalkan garam.",
        },
        {
          correct: false,
          label: "Air yang meresap ke dalam tanah di bawah petak.",
        },
      ],
    },
  },
};

export default item;
