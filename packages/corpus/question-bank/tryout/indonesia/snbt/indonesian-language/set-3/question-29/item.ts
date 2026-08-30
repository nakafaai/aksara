import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti dugaan yang tidak perlu diperiksa pada terminal saat hujan sore",
        },
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti hasil akhir yang selalu berlaku untuk semua keadaan",
        },
        {
          isCorrect: true,
          label:
            "tanda atau benda yang membawa makna lebih luas daripada bentuk harfiahnya",
        },
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti rincian yang sengaja dihapus karena bertentangan dengan pendapat",
        },
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti hiasan bahasa yang tidak berhubungan dengan konteks",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
