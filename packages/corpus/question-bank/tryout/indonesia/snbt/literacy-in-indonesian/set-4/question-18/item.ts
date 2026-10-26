import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Denah membantu melacak perubahan ruang antarmasa, sedangkan wawancara menjelaskan pengalaman penghuni. Keduanya dapat menguji perubahan fungsi, tetapi ingatan dua narasumber tidak mewakili semua penghuni.",
        },
        {
          correct: false,
          label:
            "Denah tiga periode sudah cukup menjelaskan pengalaman seluruh penghuni karena perubahan ruang menentukan fungsi bangunan.",
        },
        {
          correct: false,
          label:
            "Wawancara harus diutamakan karena mantan penghuni mengalami bangunan secara langsung, sedangkan denah hanya bersifat teknis.",
        },
        {
          correct: false,
          label:
            "Kesamaan fungsi pada beberapa periode membuktikan bahwa pengalaman penghuni tidak berubah ketika denah direnovasi.",
        },
        {
          correct: false,
          label:
            "Perbedaan antara denah dan wawancara menunjukkan bahwa salah satu sumber keliru dan harus dikeluarkan.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
