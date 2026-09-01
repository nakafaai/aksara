import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *representasi* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *representasi* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *representasi* membatasi poster sebagai bukti tentang citra yang ingin dibangun penyelenggara, sehingga poster tidak disamakan dengan catatan lengkap pengalaman pengunjung.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *representasi* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut menjadikan semua isi poster tidak berguna karena sumber yang dibuat penyelenggara pasti tidak dapat diteliti.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
