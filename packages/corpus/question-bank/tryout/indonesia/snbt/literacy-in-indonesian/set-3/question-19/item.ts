import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *sumber sezaman* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *sumber sezaman* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *sumber sezaman* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *sumber sezaman* memberi dasar untuk membandingkan posisi kedua sumber tanpa menganggap salah satunya sebagai catatan yang sepenuhnya netral.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut hanya menamai bentuk dokumen dan tidak memengaruhi cara asal serta tujuan sumber dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
