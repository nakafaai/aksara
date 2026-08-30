import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tempeh enthält mehr Energie als fettes Rindfleisch",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fettes Rindfleisch enthält " },
            { display: "block", kind: "math", math: "3{,}3\\text{ g}" },
            { kind: "text", text: " mehr Protein pro " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " als Tempeh" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tempeh enthält " },
            { display: "block", kind: "math", math: "13{,}2\\text{ g}" },
            { kind: "text", text: " mehr Fett pro " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " als fettes Rindfleisch" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Tempeh enthält " },
            { display: "block", kind: "math", math: "3{,}3\\text{ g}" },
            { kind: "text", text: " mehr Protein pro " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " als fettes Rindfleisch" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fettes Rindfleisch enthält " },
            { display: "block", kind: "math", math: "12{,}2\\text{ g}" },
            { kind: "text", text: " mehr Fett pro " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " als Tempeh" },
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
              text: "Tempeh contains more energy than fatty beef",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fatty beef contains " },
            { display: "block", kind: "math", math: "3.3\\text{ g}" },
            { kind: "text", text: " more protein per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " than tempeh" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tempeh contains " },
            { display: "block", kind: "math", math: "13.2\\text{ g}" },
            { kind: "text", text: " more fat per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " than fatty beef" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Tempeh contains " },
            { display: "block", kind: "math", math: "3.3\\text{ g}" },
            { kind: "text", text: " more protein per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " than fatty beef" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fatty beef contains " },
            { display: "block", kind: "math", math: "12.2\\text{ g}" },
            { kind: "text", text: " more fat per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " than tempeh" },
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
            {
              kind: "text",
              text: "Tempe mengandung energi lebih tinggi daripada daging sapi gemuk",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Daging sapi gemuk mengandung protein " },
            { display: "block", kind: "math", math: "3{,}3\\text{ g}" },
            { kind: "text", text: " lebih banyak per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " daripada tempe" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tempe mengandung lemak " },
            { display: "block", kind: "math", math: "13{,}2\\text{ g}" },
            { kind: "text", text: " lebih banyak per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " daripada daging sapi gemuk" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Tempe mengandung protein " },
            { display: "block", kind: "math", math: "3{,}3\\text{ g}" },
            { kind: "text", text: " lebih banyak per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " daripada daging sapi gemuk" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Daging sapi gemuk mengandung lemak " },
            { display: "block", kind: "math", math: "12{,}2\\text{ g}" },
            { kind: "text", text: " lebih banyak per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
            { kind: "text", text: " daripada tempe" },
          ],
        },
      ],
    },
  },
};

export default item;
