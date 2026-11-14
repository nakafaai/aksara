import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ada atlet yang lolos seleksi daerah dan belum pernah cedera berat, tetapi bukan anggota tim inti provinsi atau bukan penerima beasiswa olahraga.",
        },
        {
          correct: false,
          label:
            "Semua atlet yang lolos seleksi daerah dan belum pernah cedera berat bukan anggota tim inti provinsi dan bukan penerima beasiswa olahraga.",
        },
        {
          correct: false,
          label:
            "Ada atlet yang tidak lolos seleksi daerah atau pernah cedera berat, tetapi bukan anggota tim inti provinsi dan bukan penerima beasiswa olahraga.",
        },
        {
          correct: true,
          label:
            "Ada atlet yang lolos seleksi daerah dan belum pernah cedera berat, tetapi bukan anggota tim inti provinsi dan bukan penerima beasiswa olahraga.",
        },
        {
          correct: false,
          label:
            "Ada atlet yang bukan anggota tim inti provinsi dan bukan penerima beasiswa olahraga.",
        },
      ],
    },
  },
};

export default item;
