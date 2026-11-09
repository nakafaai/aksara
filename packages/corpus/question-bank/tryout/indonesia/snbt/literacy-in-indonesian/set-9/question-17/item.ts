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
            "Foto menunjukkan identitas mantel melalui tampilannya, sedangkan buku perawatan hanya mengulang informasi visual tersebut dalam bentuk tulisan.",
        },
        {
          correct: true,
          label:
            "Foto menunjukkan kemunculan mantel berciri serupa di panggung, sedangkan buku perawatan melacak tindakan pada M-17 tanpa memastikan kemunculannya di panggung.",
        },
        {
          correct: false,
          label:
            "Buku perawatan membuktikan kemunculan mantel pada $$2019$$ karena catatan terakhir tahun $$2009$$ menyebut kostum telah dikembalikan.",
        },
        {
          correct: false,
          label:
            "Foto lebih lengkap daripada buku perawatan karena rentang tahunnya lebih panjang, sehingga celah provenans dapat diabaikan.",
        },
        {
          correct: false,
          label:
            "Kedua sumber tidak dapat dibandingkan karena salah satunya merekam benda, sedangkan yang lain merekam tindakan perawatan.",
        },
      ],
    },
  },
};

export default item;
