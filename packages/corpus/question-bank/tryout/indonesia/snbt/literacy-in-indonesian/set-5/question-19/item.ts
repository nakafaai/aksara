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
            "Istilah *sejarah lisan* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          correct: true,
          label:
            "Definisi *sejarah lisan* menempatkan wawancara sebagai rekaman pengalaman yang perlu dinilai menurut penutur dan waktu perekamannya, bukan disamakan dengan catatan transaksi.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *sejarah lisan* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          correct: false,
          label:
            "Penyebutan *sejarah lisan* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menamai bentuk dokumen dan tidak memengaruhi cara asal serta tujuan sumber dibandingkan.",
        },
      ],
    },
  },
};

export default item;
