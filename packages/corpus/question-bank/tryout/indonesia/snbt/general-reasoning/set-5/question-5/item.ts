import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Fabrik X verkauft $$500{.}000$$ Stück" },
        {
          isCorrect: false,
          label: "Fabrik Y verkauft $$5{.}200{.}000$$ Stück",
        },
        { isCorrect: true, label: "Fabrik Z verkauft $$250{.}000$$ Stück" },
        {
          isCorrect: false,
          label:
            "Die prognostizierten Verkäufe von Fabrik Y sind viermal so hoch wie die Verkäufe von Fabrik X im Jahr $$2016$$",
        },
        {
          isCorrect: false,
          label:
            "Fabrik X verkauft $$800{.}000$$ Stück weniger als im Jahr $$2016$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Factory X sells $$500{,}000$$ units" },
        { isCorrect: false, label: "Factory Y sells $$5{,}200{,}000$$ units" },
        { isCorrect: true, label: "Factory Z sells $$250{,}000$$ units" },
        {
          isCorrect: false,
          label:
            "Factory Y's predicted sales are four times Factory X's $$2016$$ sales",
        },
        {
          isCorrect: false,
          label: "Factory X sells $$800{,}000$$ fewer units than in $$2016$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Pabrik X menjual $$500{.}000$$ unit" },
        { isCorrect: false, label: "Pabrik Y menjual $$5{.}200{.}000$$ unit" },
        { isCorrect: true, label: "Pabrik Z menjual $$250{.}000$$ unit" },
        {
          isCorrect: false,
          label:
            "Prediksi penjualan Pabrik Y empat kali penjualan Pabrik X pada $$2016$$",
        },
        {
          isCorrect: false,
          label:
            "Pabrik X menjual $$800{.}000$$ unit lebih sedikit daripada pada $$2016$$",
        },
      ],
    },
  },
};

export default item;
