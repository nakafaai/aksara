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
              text: "Eine Unterkühlung bedroht nur Menschen im Freien in den Bergen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Zittern ist das einzige verlässliche Warnzeichen einer Unterkühlung.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Eine Unterkühlung ist ein medizinischer Notfall, der schnelles und sicheres Handeln erfordert.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Direkte Hitze ist die beste Behandlung einer Unterkühlung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine wache Person benötigt keine medizinische Hilfe.",
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
              text: "Hypothermia only threatens people outdoors in mountains.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Shivering is the only reliable sign of hypothermia.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Hypothermia is a medical emergency that requires prompt and safe action.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Direct heat is the best way to treat hypothermia.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A person who remains awake does not need medical help.",
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
              text: "Hipotermia hanya mengancam orang yang berada di pegunungan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menggigil merupakan satu-satunya tanda hipotermia yang dapat dipercaya.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Hipotermia merupakan keadaan darurat medis yang memerlukan tindakan cepat dan aman.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Panas langsung merupakan cara terbaik untuk menangani hipotermia.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Orang yang masih sadar tidak memerlukan pertolongan medis.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
