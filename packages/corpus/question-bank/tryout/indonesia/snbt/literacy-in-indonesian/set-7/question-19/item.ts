import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *representasi* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *representasi* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          correct: true,
          label:
            "Definisi *representasi* membatasi poster sebagai bukti tentang citra yang ingin dibangun penyelenggara, sehingga poster tidak disamakan dengan catatan lengkap pengalaman pengunjung.",
        },
        {
          correct: false,
          label:
            "Penyebutan *representasi* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut menjadikan semua isi poster tidak berguna karena sumber yang dibuat penyelenggara pasti tidak dapat diteliti.",
        },
      ],
    },
  },
};

export default item;
