import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "application",
  },
  stimulus: "bekantan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pisang dan pepaya yang sudah matang dan manis",
        },
        {
          correct: false,
          label: "roti manis dan buah kalengan",
        },
        {
          correct: false,
          label: "biji-bijian kering dan kacang tanah yang disangrai",
        },
        {
          correct: true,
          label: "daun muda segar dan buah yang belum matang",
        },
        {
          correct: false,
          label: "ikan sungai segar dan udang kecil dari tepi sungai",
        },
      ],
    },
  },
};

export default item;
