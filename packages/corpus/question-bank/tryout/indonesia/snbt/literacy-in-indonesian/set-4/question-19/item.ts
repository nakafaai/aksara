import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *triangulasi* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          correct: true,
          label:
            "Definisi *triangulasi* memberi dasar untuk membandingkan posisi kedua sumber tanpa menganggap salah satunya sebagai catatan yang sepenuhnya netral.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *triangulasi* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          correct: false,
          label:
            "Penyebutan *triangulasi* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menamai bentuk dokumen dan tidak memengaruhi cara asal serta tujuan sumber dibandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
