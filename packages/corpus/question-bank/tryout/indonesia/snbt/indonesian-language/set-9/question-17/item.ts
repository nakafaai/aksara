import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Foto menunjukkan identitas mantel melalui tampilannya, sedangkan buku perawatan hanya mengulang informasi visual tersebut dalam bentuk tulisan.",
        },
        {
          isCorrect: true,
          label:
            "Foto menunjukkan kemunculan mantel berciri serupa di panggung, sedangkan buku perawatan melacak tindakan pada M-17 tanpa memastikan setiap kali kostum itu dipentaskan.",
        },
        {
          isCorrect: false,
          label:
            "Buku perawatan membuktikan kemunculan mantel pada 2019 karena catatan terakhir tahun 2009 menyebut kostum telah dikembalikan.",
        },
        {
          isCorrect: false,
          label:
            "Foto lebih lengkap daripada buku perawatan karena rentang tahunnya lebih panjang, sehingga celah provenans dapat diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Kedua sumber tidak dapat dibandingkan karena salah satunya merekam benda, sedangkan yang lain merekam tindakan perawatan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
