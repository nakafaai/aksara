import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "refill-station",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "survei mengidentifikasi hambatan yang kemudian ditanggapi dengan layanan",
        },
        {
          correct: false,
          label: "program peminjaman dilakukan sebelum hambatan diketahui",
        },
        {
          correct: false,
          label:
            "survei menunjukkan siswa yang belum memakai stasiun terutama tidak membawa botol",
        },
        {
          correct: false,
          label: "keduanya tidak berkaitan dengan stasiun isi ulang",
        },
        {
          correct: false,
          label: "program dibuat untuk mengurangi volume air minum",
        },
      ],
    },
  },
};

export default item;
