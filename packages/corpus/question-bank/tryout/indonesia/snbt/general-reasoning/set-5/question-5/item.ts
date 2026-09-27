import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pabrik $$Z$$ menjual $$250{.}000$$ unit",
        },
        {
          isCorrect: false,
          label: "Pabrik $$X$$ menjual $$500{.}000$$ unit",
        },
        {
          isCorrect: false,
          label: "Pabrik $$Y$$ menjual $$5{.}200{.}000$$ unit",
        },
        {
          isCorrect: false,
          label:
            "Prediksi penjualan Pabrik $$Y$$ empat kali penjualan Pabrik $$X$$ pada $$2016$$",
        },
        {
          isCorrect: false,
          label:
            "Pabrik $$X$$ menjual $$800{.}000$$ unit lebih sedikit daripada pada $$2016$$",
        },
      ],
    },
  },
};

export default item;
