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
            "Istilah *kontekstualisasi* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *kontekstualisasi* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          correct: false,
          label:
            "Penyebutan *kontekstualisasi* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menamai bentuk dokumen dan tidak memengaruhi cara asal serta tujuan sumber dibandingkan.",
        },
        {
          correct: true,
          label:
            "Definisi *kontekstualisasi* mengarahkan siswa membaca perubahan jadwal, peserta, tujuan pencatatan, dan kekosongan arsip sebelum menafsirkan pola peminjaman.",
        },
      ],
    },
  },
};

export default item;
