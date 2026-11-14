import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "eye-screening",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "hasil pemeriksaan membuktikan bahwa siswa yang salah menyalin memang malas",
        },
        {
          correct: false,
          label:
            "paragraf kedua membantah bahwa siswa sulit membaca tulisan di papan",
        },
        {
          correct: true,
          label:
            "hasil pemeriksaan menunjukkan bahwa masalah penglihatan yang sering tidak disadari memang dialami banyak siswa",
        },
        {
          correct: false,
          label:
            "hasil pemeriksaan menunjukkan bahwa semua siswa membutuhkan kacamata",
        },
        {
          correct: false,
          label: "paragraf kedua menjelaskan cara membuat kacamata",
        },
      ],
    },
  },
};

export default item;
