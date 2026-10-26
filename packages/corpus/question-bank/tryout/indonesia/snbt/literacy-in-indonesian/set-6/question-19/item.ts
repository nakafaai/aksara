import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *provenans* membuktikan bahwa sumber yang lebih baru pasti lebih akurat daripada sumber lainnya.",
        },
        {
          correct: true,
          label:
            "Definisi *provenans* menuntut riwayat kepemilikan, penguasaan, dan perpindahan dibedakan, sehingga satu catatan lokasi tidak langsung dianggap sebagai bukti hak milik.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *provenans* dengan kesalahan sehingga perbedaan antarsumber tidak perlu dianalisis.",
        },
        {
          correct: false,
          label:
            "Penyebutan *provenans* mengizinkan bagian sumber yang hilang diisi dengan dugaan pembaca.",
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
