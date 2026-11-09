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
          label:
            "Aksara Bali lebih tua daripada aksara Kawi sehingga naskahnya lebih lengkap.",
        },
        {
          correct: true,
          label:
            "Teks-teks itu bertahan berkat penyalinan, sedangkan naskah aslinya mungkin sudah rusak.",
        },
        {
          correct: false,
          label:
            "Salinan yang dibuat di Bali pasti sama persis dengan naskah aslinya.",
        },
        {
          correct: false,
          label:
            "Daun lontar lebih awet di Bali karena orang Bali lebih pandai merawatnya.",
        },
      ],
    },
  },
};

export default item;
