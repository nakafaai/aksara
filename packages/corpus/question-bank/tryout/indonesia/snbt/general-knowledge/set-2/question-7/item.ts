import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tiere, die gejagt werden." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "kleine Tiere, die von anderen Tieren gefressen werden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "kleine Insekten." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Insekten und andere Kleintiere." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Tiere, die andere Tiere jagen." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "animals that are preyed upon." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "small animals that are eaten by other animals.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "small insects." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "insects and other small animals." }],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "animals that prey on other animals." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "hewan yang dimangsa." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "hewan kecil yang dimakan oleh hewan lainnya.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "serangga kecil." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "serangga dan hewan kecil lainnya." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "hewan pemangsa hewan lainnya." }],
        },
      ],
    },
  },
};

export default item;
