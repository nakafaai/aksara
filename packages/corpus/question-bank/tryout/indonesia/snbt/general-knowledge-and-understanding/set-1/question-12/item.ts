import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "memberikan penjelasan atau tanggapan.",
        },
        {
          correct: false,
          label: "menyangkal sesuatu hal.",
        },
        {
          correct: false,
          label: "kegiatan menawar sesuatu.",
        },
        {
          correct: false,
          label: "membicarakan sesuatu hal.",
        },
        {
          correct: false,
          label: "berdiskusi tentang sesuatu.",
        },
      ],
    },
  },
};

export default item;
