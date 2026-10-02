import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: false,
          label: "Banyak segitiga berwarna pada tahap ke-$$n$$ adalah $$3n$$.",
        },
        {
          isCorrect: true,
          label: "Tahap ke-$$4$$ memuat $$81$$ segitiga berwarna.",
        },
        {
          isCorrect: false,
          label:
            "Luas daerah yang warnanya dihapus ketika tahap ke-$$1$$ diubah menjadi tahap ke-$$2$$ sama dengan luas daerah yang warnanya dihapus ketika tahap ke-$$0$$ diubah menjadi tahap ke-$$1$$.",
        },
        {
          isCorrect: true,
          label: "Luas daerah berwarna pada tahap ke-$$3$$ adalah $$13{,}5\\text{ cm}^2$$.",
        },
        {
          isCorrect: true,
          label:
            "Tahap pertama yang luas daerah berwarnanya kurang dari $$10\\text{ cm}^2$$ adalah tahap ke-$$5$$.",
        },
      ],
    },
  },
};

export default item;
