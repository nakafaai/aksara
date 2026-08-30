import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti dugaan yang tidak perlu diperiksa pada pendataan sumur warga",
        },
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti hasil akhir yang selalu berlaku untuk semua keadaan",
        },
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti rincian yang sengaja dihapus karena bertentangan dengan pendapat",
        },
        {
          isCorrect: true,
          label:
            "kemampuan dua atau lebih catatan untuk dibandingkan secara bermakna",
        },
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti hiasan bahasa yang tidak berhubungan dengan konteks",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
