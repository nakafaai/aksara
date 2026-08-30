import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "program peminjaman dilakukan sebelum hambatan diketahui",
        },
        {
          isCorrect: true,
          label:
            "survei mengidentifikasi hambatan yang kemudian ditanggapi dengan layanan",
        },
        {
          isCorrect: false,
          label: "survei membuktikan semua siswa sudah membawa botol",
        },
        {
          isCorrect: false,
          label: "keduanya tidak berkaitan dengan stasiun isi ulang",
        },
        {
          isCorrect: false,
          label: "program dibuat untuk mengurangi volume air minum",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
