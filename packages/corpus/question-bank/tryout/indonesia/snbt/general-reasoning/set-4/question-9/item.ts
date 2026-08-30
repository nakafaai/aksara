import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tempeh enthält " },
            { display: "block", kind: "math", math: "72\\text{ kcal}" },
            { kind: "text", text: " mehr Energie und " },
            { display: "block", kind: "math", math: "13{,}2\\text{ g}" },
            { kind: "text", text: " mehr Fett pro " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fettes Rindfleisch enthält " },
            { display: "block", kind: "math", math: "3{,}3\\text{ g}" },
            { kind: "text", text: " mehr Protein pro " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tempeh und fettes Rindfleisch enthalten gleich viel Protein",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fettes Rindfleisch enthält " },
            { display: "block", kind: "math", math: "82\\text{ kcal}" },
            { kind: "text", text: " mehr Energie pro " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Fettes Rindfleisch enthält " },
            { display: "block", kind: "math", math: "72\\text{ kcal}" },
            { kind: "text", text: " mehr Energie und " },
            { display: "block", kind: "math", math: "13{,}2\\text{ g}" },
            { kind: "text", text: " mehr Fett pro " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
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
            { kind: "text", text: "Tempeh contains " },
            { display: "block", kind: "math", math: "72\\text{ kcal}" },
            { kind: "text", text: " more energy and " },
            { display: "block", kind: "math", math: "13.2\\text{ g}" },
            { kind: "text", text: " more fat per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fatty beef contains " },
            { display: "block", kind: "math", math: "3.3\\text{ g}" },
            { kind: "text", text: " more protein per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tempeh and fatty beef contain the same amount of protein",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Fatty beef contains " },
            { display: "block", kind: "math", math: "82\\text{ kcal}" },
            { kind: "text", text: " more energy per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Fatty beef contains " },
            { display: "block", kind: "math", math: "72\\text{ kcal}" },
            { kind: "text", text: " more energy and " },
            { display: "block", kind: "math", math: "13.2\\text{ g}" },
            { kind: "text", text: " more fat per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
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
            { kind: "text", text: "Tempe mengandung energi " },
            { display: "block", kind: "math", math: "72\\text{ kkal}" },
            { kind: "text", text: " lebih banyak dan lemak " },
            { display: "block", kind: "math", math: "13{,}2\\text{ g}" },
            { kind: "text", text: " lebih banyak per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Daging sapi gemuk mengandung protein " },
            { display: "block", kind: "math", math: "3{,}3\\text{ g}" },
            { kind: "text", text: " lebih banyak per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tempe dan daging sapi gemuk mengandung protein dalam jumlah yang sama",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Daging sapi gemuk mengandung energi " },
            { display: "block", kind: "math", math: "82\\text{ kkal}" },
            { kind: "text", text: " lebih banyak per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Daging sapi gemuk mengandung energi " },
            { display: "block", kind: "math", math: "72\\text{ kkal}" },
            { kind: "text", text: " lebih banyak dan lemak " },
            { display: "block", kind: "math", math: "13{,}2\\text{ g}" },
            { kind: "text", text: " lebih banyak per " },
            { display: "block", kind: "math", math: "100\\text{ g}" },
          ],
        },
      ],
    },
  },
};

export default item;
