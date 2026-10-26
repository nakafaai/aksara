import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Keduanya menunjukkan bahwa kemampuan teknis Laras belum cukup untuk menghasilkan esai yang layak diterbitkan.",
        },
        {
          correct: false,
          label:
            "Keduanya menjadi cara Laras meminta pembaca melengkapi sendiri bukti yang gagal ia peroleh di lapangan.",
        },
        {
          correct: false,
          label:
            "Keduanya membuktikan bahwa karya yang tidak selesai selalu lebih menarik daripada dokumentasi yang lengkap.",
        },
        {
          correct: false,
          label:
            "Keduanya menutupi jalur yang ditutup dengan simbol agar pembaca tidak mempertanyakan kekurangan data Laras.",
        },
        {
          correct: true,
          label:
            "Keduanya menandai batas pengamatan, sehingga ketidaklengkapan menjadi bagian jujur dari esai, bukan celah yang disamarkan.",
        },
      ],
    },
  },
};

export default item;
