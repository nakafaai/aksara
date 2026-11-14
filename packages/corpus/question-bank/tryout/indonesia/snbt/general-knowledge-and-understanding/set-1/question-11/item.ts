import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "paraphrase",
  },
  stimulus: "serapan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kata daerah langsung menjadi kosakata bahasa Indonesia yang mapan begitu penutur di luar daerah asalnya sering menjumpainya di media nasional.",
        },
        {
          correct: false,
          label:
            "Kata daerah yang sering muncul di media nasional baru mapan setelah penutur di daerah asalnya tidak lagi merasa sedang meminjam kata itu.",
        },
        {
          correct: false,
          label:
            "Kata daerah baru mapan jika sering muncul di media nasional sekaligus dipakai penutur di luar daerah asalnya dalam percakapan sehari-hari tanpa merasa meminjam.",
        },
        {
          correct: true,
          label:
            "Sering muncul di media nasional belum cukup. Kata daerah baru mapan setelah dipakai penutur dari luar daerah asalnya dalam percakapan sehari-hari tanpa merasa meminjam.",
        },
        {
          correct: false,
          label:
            "Kata daerah baru mapan setelah penutur di luar daerah asalnya memakainya dalam tulisan resmi, tidak cukup hanya dengan sering muncul di media nasional.",
        },
      ],
    },
  },
};

export default item;
