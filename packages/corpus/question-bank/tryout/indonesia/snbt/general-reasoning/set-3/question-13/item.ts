import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das Geschäft verkauft " },
            { display: "block", kind: "math", math: "24" },
            { kind: "text", text: " Bergo-Tücher." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pashmina ist mit " },
            { display: "block", kind: "math", math: "35" },
            {
              kind: "text",
              text: " verkauften Tüchern das meistverkaufte Modell.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Das Geschäft verkauft " },
            { display: "block", kind: "math", math: "42" },
            { kind: "text", text: " quadratische Tücher." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Es werden weniger Pashmina- als Bergo-Tücher verkauft.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bergo ist das meistverkaufte Kopftuchmodell.",
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
            { kind: "text", text: "The shop sells " },
            { display: "block", kind: "math", math: "24" },
            { kind: "text", text: " bergo headscarves." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pashmina is the best-selling style, with " },
            { display: "block", kind: "math", math: "35" },
            { kind: "text", text: " headscarves sold." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "The shop sells " },
            { display: "block", kind: "math", math: "42" },
            { kind: "text", text: " square headscarves." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The shop sells fewer pashmina than bergo headscarves.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bergo is the best-selling headscarf style.",
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
              text: "Banyak kerudung jenis bergo yang terjual adalah ",
            },
            { display: "block", kind: "math", math: "24" },
            { kind: "text", text: " buah." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kerudung jenis pasmina paling banyak terjual yaitu sebesar ",
            },
            { display: "block", kind: "math", math: "35" },
            { kind: "text", text: " buah." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Penjualan jenis kerudung segiempat adalah sebanyak ",
            },
            { display: "block", kind: "math", math: "42" },
            { kind: "text", text: " buah." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kerudung jenis pasmina lebih sedikit terjual dibandingkan kerudung jenis bergo.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kerudung jenis bergo adalah kerudung yang paling banyak terjual.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
