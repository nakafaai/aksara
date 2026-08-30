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
              text: "Jedes Gewürz erreicht seinen höchsten Verkaufswert im November ",
            },
            { display: "block", kind: "math", math: "2020" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Schalottenverkäufe im Januar " },
            { display: "block", kind: "math", math: "2021" },
            { kind: "text", text: " werden voraussichtlich " },
            { display: "block", kind: "math", math: "76" },
            { kind: "text", text: " Tonnen betragen." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Der Knoblauchabsatz im Januar " },
            { display: "block", kind: "math", math: "2021" },
            { kind: "text", text: " wird " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " Tonnen übersteigen." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In jedem Monat werden weniger Schalotten als rote Chilischoten verkauft.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Schalotten sind in jedem Monat allein das Gewürz mit dem niedrigsten Verkaufswert.",
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
              text: "Each spice recorded its highest sales in November ",
            },
            { display: "block", kind: "math", math: "2020" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Shallot sales in January " },
            { display: "block", kind: "math", math: "2021" },
            { kind: "text", text: " are predicted to be " },
            { display: "block", kind: "math", math: "76" },
            { kind: "text", text: " tons." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Garlic sales in January " },
            { display: "block", kind: "math", math: "2021" },
            { kind: "text", text: " will exceed " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " tons." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Shallot sales are lower than red chili sales in every month.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Shallot is the sole lowest-selling spice in every month.",
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
            {
              kind: "text",
              text: "Setiap jenis rempah mencapai penjualan tertinggi pada November ",
            },
            { display: "block", kind: "math", math: "2020" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penjualan bawang merah pada bulan Januari ",
            },
            { display: "block", kind: "math", math: "2021" },
            { kind: "text", text: " diprediksi sebesar " },
            { display: "block", kind: "math", math: "76" },
            { kind: "text", text: " ton." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Penjualan bawang putih pada bulan Januari ",
            },
            { display: "block", kind: "math", math: "2021" },
            { kind: "text", text: " akan melebihi " },
            { display: "block", kind: "math", math: "100" },
            { kind: "text", text: " ton." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penjualan bawang merah lebih rendah daripada penjualan cabai merah pada setiap bulan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bawang merah menjadi satu-satunya rempah dengan penjualan terendah pada setiap bulan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
