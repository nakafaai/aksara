import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "dalam bacaan, berarti dugaan yang tidak perlu diperiksa pada taman bermain inklusif",
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
          isCorrect: false,
          label:
            "dalam bacaan, berarti hiasan bahasa yang tidak berhubungan dengan konteks",
        },
        {
          isCorrect: true,
          label:
            "rancangan yang sejak awal mempertimbangkan pengguna dengan kebutuhan berbeda",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
