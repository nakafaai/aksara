import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "subak-water",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Subak tidak menggunakan saluran atau terowongan untuk mengalirkan air.",
        },
        {
          correct: true,
          label:
            "Subak juga merupakan organisasi petani yang mengatur jadwal tanam dan upacara, bukan hanya jaringan saluran air.",
        },
        {
          correct: false,
          label:
            "Irigasi di Bali sepenuhnya dikelola oleh pemerintah, bukan oleh petani.",
        },
        {
          correct: false,
          label: "Subak lebih tua daripada sistem irigasi modern.",
        },
        {
          correct: false,
          label: "Subak hanya berfungsi sebagai tempat upacara di pura air.",
        },
      ],
    },
  },
};

export default item;
