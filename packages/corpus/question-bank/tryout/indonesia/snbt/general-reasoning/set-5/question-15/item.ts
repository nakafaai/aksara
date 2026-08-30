import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das Treffen fand im Staatspalast statt" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das Leistungsbilanzdefizit war mehr als dreimal so hoch wie das Handelsbilanzdefizit",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Regierung bat Wirtschaftsvertreter um konkrete und schnell umsetzbare Vorschläge",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Text beweist, dass der Handelskrieg das Handelsdefizit dauerhaft verursachte",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nach dem Text kann die Wirtschaft künftige Herausforderungen ohne die Regierung bewältigen",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The meeting took place at the State Palace",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The current-account deficit was more than three times the trade-balance deficit",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The government requested concrete, quickly implementable input from business representatives",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The passage proves that the trade war permanently caused the trade deficit",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The passage says business can address future challenges without government",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pertemuan berlangsung di Istana Negara" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Defisit transaksi berjalan lebih dari tiga kali defisit neraca perdagangan",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pemerintah meminta masukan yang konkret dan dapat segera dilaksanakan dari perwakilan dunia usaha",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bacaan membuktikan bahwa perang dagang secara permanen menyebabkan defisit perdagangan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bacaan menyatakan dunia usaha dapat menghadapi tantangan mendatang tanpa pemerintah",
            },
          ],
        },
      ],
    },
  },
};

export default item;
