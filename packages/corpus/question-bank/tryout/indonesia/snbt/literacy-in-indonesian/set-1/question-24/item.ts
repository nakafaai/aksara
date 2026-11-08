import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "kawi-script",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Teks-teks Jawa Kuno pada awalnya ditulis di Bali, bukan di Jawa.",
        },
        {
          correct: false,
          label: "Aksara Bali lebih tua daripada aksara Kawi.",
        },
        {
          correct: true,
          label:
            "Teks-teks itu dapat bertahan karena terus disalin, sementara naskah aslinya kemungkinan sudah rusak.",
        },
        {
          correct: false,
          label:
            "Salinan yang dibuat di Bali pasti sama persis dengan naskah aslinya.",
        },
        {
          correct: false,
          label: "Daun lontar lebih awet di Bali daripada di Jawa.",
        },
      ],
    },
  },
};

export default item;
