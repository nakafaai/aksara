import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
