import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *provenans* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *provenans* memberi dasar untuk membandingkan posisi kedua sumber tanpa menganggap salah satunya sebagai catatan yang sepenuhnya netral.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *provenans* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *provenans* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
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
