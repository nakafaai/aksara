import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fabrik X verkauft " },
            { display: "block", kind: "math", math: "500{.}000" },
            { kind: "text", text: " Stück" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fabrik Y verkauft " },
            { display: "block", kind: "math", math: "5{.}200{.}000" },
            { kind: "text", text: " Stück" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Fabrik Z verkauft " },
            { display: "block", kind: "math", math: "250{.}000" },
            { kind: "text", text: " Stück" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die prognostizierten Verkäufe von Fabrik Y sind viermal so hoch wie die Verkäufe von Fabrik X im Jahr ",
            },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fabrik X verkauft " },
            { display: "block", kind: "math", math: "800{.}000" },
            { kind: "text", text: " Stück weniger als im Jahr " },
            { display: "block", kind: "math", math: "2016" },
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
            { kind: "text", text: "Factory X sells " },
            { display: "block", kind: "math", math: "500{,}000" },
            { kind: "text", text: " units" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Factory Y sells " },
            { display: "block", kind: "math", math: "5{,}200{,}000" },
            { kind: "text", text: " units" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Factory Z sells " },
            { display: "block", kind: "math", math: "250{,}000" },
            { kind: "text", text: " units" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Factory Y's predicted sales are four times Factory X's ",
            },
            { display: "block", kind: "math", math: "2016" },
            { kind: "text", text: " sales" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Factory X sells " },
            { display: "block", kind: "math", math: "800{,}000" },
            { kind: "text", text: " fewer units than in " },
            { display: "block", kind: "math", math: "2016" },
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
            { kind: "text", text: "Pabrik X menjual " },
            { display: "block", kind: "math", math: "500{.}000" },
            { kind: "text", text: " unit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pabrik Y menjual " },
            { display: "block", kind: "math", math: "5{.}200{.}000" },
            { kind: "text", text: " unit" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Pabrik Z menjual " },
            { display: "block", kind: "math", math: "250{.}000" },
            { kind: "text", text: " unit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Prediksi penjualan Pabrik Y empat kali penjualan Pabrik X pada ",
            },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pabrik X menjual " },
            { display: "block", kind: "math", math: "800{.}000" },
            { kind: "text", text: " unit lebih sedikit daripada pada " },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
      ],
    },
  },
};

export default item;
