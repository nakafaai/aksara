import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Der Verkauf von Hosen ist " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " geringer als der von Hemden" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Der Verkauf von Anzügen ist " },
            { display: "block", kind: "math", math: "35" },
            { kind: "text", text: " höher als der von Hosen" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Zusammen werden weniger als " },
            { display: "block", kind: "math", math: "70" },
            { kind: "text", text: " Hemden und Hosen verkauft" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Der Verkauf von Hemden ist " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " höher als der von Hosen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Der Verkauf von Hosen ist " },
            { display: "block", kind: "math", math: "35" },
            { kind: "text", text: " geringer als der von Anzügen" },
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
            { kind: "text", text: "Pants sales are " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " fewer than shirts" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Suits sales are " },
            { display: "block", kind: "math", math: "35" },
            { kind: "text", text: " more than pants" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The combined number of shirts and pants sold is less than ",
            },
            { display: "block", kind: "math", math: "70" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Shirts sales are " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " more than pants" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pants sales are " },
            { display: "block", kind: "math", math: "35" },
            { kind: "text", text: " less than suits" },
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
            { kind: "text", text: "Penjualan celana " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " lebih sedikit dari baju" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Penjualan jas " },
            { display: "block", kind: "math", math: "35" },
            { kind: "text", text: " lebih banyak dari celana" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jumlah penjualan baju dan celana kurang dari ",
            },
            { display: "block", kind: "math", math: "70" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Penjualan baju " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " lebih banyak dari celana" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Penjualan celana " },
            { display: "block", kind: "math", math: "35" },
            { kind: "text", text: " lebih sedikit dari jas" },
          ],
        },
      ],
    },
  },
};

export default item;
