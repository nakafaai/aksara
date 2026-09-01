import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *sejarah lisan* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *sejarah lisan* menempatkan wawancara sebagai rekaman pengalaman yang perlu dinilai menurut penutur dan waktu perekamannya, bukan disamakan dengan catatan transaksi.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menyamakan *sejarah lisan* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *sejarah lisan* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
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
