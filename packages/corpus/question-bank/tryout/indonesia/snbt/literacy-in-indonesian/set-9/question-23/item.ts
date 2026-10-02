import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Keduanya menunjukkan bahwa kemampuan teknis Laras belum cukup untuk menghasilkan esai yang layak diterbitkan.",
        },
        {
          isCorrect: false,
          label:
            "Keduanya menjadi cara Laras meminta pembaca melengkapi sendiri bukti yang gagal ia peroleh di lapangan.",
        },
        {
          isCorrect: false,
          label:
            "Keduanya membuktikan bahwa karya yang tidak selesai selalu lebih menarik daripada dokumentasi yang lengkap.",
        },
        {
          isCorrect: false,
          label:
            "Keduanya menutupi jalur yang ditutup dengan simbol agar pembaca tidak mempertanyakan kekurangan data Laras.",
        },
        {
          isCorrect: true,
          label:
            "Keduanya menandai batas pengamatan, sehingga ketidaklengkapan menjadi bagian jujur dari esai, bukan celah yang disamarkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
