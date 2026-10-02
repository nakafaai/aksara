import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *kontekstualisasi* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *kontekstualisasi* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *kontekstualisasi* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut hanya menamai bentuk dokumen dan tidak memengaruhi cara asal serta tujuan sumber dibandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *kontekstualisasi* mengarahkan siswa membaca perubahan jadwal, peserta, tujuan pencatatan, dan kekosongan arsip sebelum menafsirkan pola peminjaman.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
