import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Treffen fand im Staatspalast statt",
      value: false,
    },
    {
      label:
        "Das Leistungsbilanzdefizit war mehr als dreimal so hoch wie das Handelsbilanzdefizit",
      value: false,
    },
    {
      label:
        "Die Regierung bat Wirtschaftsvertreter um konkrete und schnell umsetzbare Vorschläge",
      value: true,
    },
    {
      label:
        "Der Text beweist, dass der Handelskrieg das Handelsdefizit dauerhaft verursachte",
      value: false,
    },
    {
      label:
        "Nach dem Text kann die Wirtschaft künftige Herausforderungen ohne die Regierung bewältigen",
      value: false,
    },
  ],
  en: [
    {
      label: "The meeting took place at the State Palace",
      value: false,
    },
    {
      label:
        "The current-account deficit was more than three times the trade-balance deficit",
      value: false,
    },
    {
      label:
        "The government requested concrete, quickly implementable input from business representatives",
      value: true,
    },
    {
      label:
        "The passage proves that the trade war permanently caused the trade deficit",
      value: false,
    },
    {
      label:
        "The passage says business can address future challenges without government",
      value: false,
    },
  ],
  id: [
    {
      label: "Pertemuan berlangsung di Istana Negara",
      value: false,
    },
    {
      label:
        "Defisit transaksi berjalan lebih dari tiga kali defisit neraca perdagangan",
      value: false,
    },
    {
      label:
        "Pemerintah meminta masukan yang konkret dan dapat segera dilaksanakan dari perwakilan dunia usaha",
      value: true,
    },
    {
      label:
        "Bacaan membuktikan bahwa perang dagang secara permanen menyebabkan defisit perdagangan",
      value: false,
    },
    {
      label:
        "Bacaan menyatakan dunia usaha dapat menghadapi tantangan mendatang tanpa pemerintah",
      value: false,
    },
  ],
};

export default choices;
