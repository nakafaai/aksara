import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "borrowed-words",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lembaga bahasa melarang penutur mempelajari asal-usul kata.",
        },
        {
          correct: false,
          label:
            "Kata pinjaman selalu dipakai dengan makna yang sama seperti aslinya.",
        },
        {
          correct: false,
          label:
            "Sebagian besar kata pinjaman hanya muncul dalam dokumen resmi.",
        },
        {
          correct: true,
          label:
            "Ejaan dan bunyinya disesuaikan sehingga terdengar seperti kata asli.",
        },
        {
          correct: false,
          label: "Penutur tidak tertarik pada sejarah bahasa sama sekali.",
        },
      ],
    },
  },
};

export default item;
