import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Regierung bat Wirtschaftsvertreter um konkrete und schnell umsetzbare Vorschläge",
        },
        {
          isCorrect: false,
          label: "Das Treffen fand im Staatspalast statt",
        },
        {
          isCorrect: false,
          label:
            "Das Leistungsbilanzdefizit war mehr als dreimal so hoch wie das Handelsbilanzdefizit",
        },
        {
          isCorrect: false,
          label:
            "Der Text beweist, dass der Handelskrieg das Handelsdefizit dauerhaft verursachte",
        },
        {
          isCorrect: false,
          label:
            "Nach dem Text kann die Wirtschaft künftige Herausforderungen ohne die Regierung bewältigen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The government requested concrete, quickly implementable input from business representatives",
        },
        {
          isCorrect: false,
          label: "The meeting took place at the State Palace",
        },
        {
          isCorrect: false,
          label:
            "The current-account deficit was more than three times the trade-balance deficit",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that the trade war permanently caused the trade deficit",
        },
        {
          isCorrect: false,
          label:
            "The passage says business can address future challenges without government",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pemerintah meminta masukan yang konkret dan dapat segera dilaksanakan dari perwakilan dunia usaha",
        },
        {
          isCorrect: false,
          label: "Pertemuan berlangsung di Istana Negara",
        },
        {
          isCorrect: false,
          label:
            "Defisit transaksi berjalan lebih dari tiga kali defisit neraca perdagangan",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membuktikan bahwa perang dagang secara permanen menyebabkan defisit perdagangan",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan dunia usaha dapat menghadapi tantangan mendatang tanpa pemerintah",
        },
      ],
    },
  },
};

export default item;
