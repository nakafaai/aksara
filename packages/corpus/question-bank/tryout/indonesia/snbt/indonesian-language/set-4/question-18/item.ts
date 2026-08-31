import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Denah membantu melacak perubahan ruang antarmasa, sedangkan wawancara menjelaskan pengalaman penghuni; keduanya dapat menguji perubahan fungsi, tetapi ingatan dua narasumber tidak mewakili semua penghuni.",
        },
        {
          isCorrect: false,
          label:
            "Denah tiga periode sudah cukup menjelaskan pengalaman seluruh penghuni karena perubahan ruang menentukan fungsi bangunan.",
        },
        {
          isCorrect: false,
          label:
            "Wawancara harus diutamakan karena mantan penghuni mengalami bangunan secara langsung, sedangkan denah hanya bersifat teknis.",
        },
        {
          isCorrect: false,
          label:
            "Kesamaan fungsi pada beberapa periode membuktikan bahwa pengalaman penghuni tidak berubah ketika denah direnovasi.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan antara denah dan wawancara menunjukkan bahwa salah satu sumber keliru dan harus dikeluarkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
