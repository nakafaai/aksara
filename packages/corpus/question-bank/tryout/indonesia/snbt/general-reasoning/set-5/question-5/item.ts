import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Pabrik $$Z$$ menjual $$250{.}000$$ unit",
        },
        {
          correct: false,
          label: "Pabrik $$X$$ menjual $$500{.}000$$ unit",
        },
        {
          correct: false,
          label: "Pabrik $$Y$$ menjual $$5{.}200{.}000$$ unit",
        },
        {
          correct: false,
          label:
            "Prediksi penjualan Pabrik $$Y$$ empat kali penjualan Pabrik $$X$$ pada $$2016$$",
        },
        {
          correct: false,
          label:
            "Pabrik $$X$$ menjual $$800{.}000$$ unit lebih sedikit daripada pada $$2016$$",
        },
      ],
    },
  },
};

export default item;
