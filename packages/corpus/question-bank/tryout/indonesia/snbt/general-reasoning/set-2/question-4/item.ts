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
              text: "Das Kind nimmt wenig Fett und viel Vitamin B6 auf",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Manche Kinder, die Bananen essen, nehmen wenig Fett auf",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Fleisch kann viel Fett, aber wenig Vitamin B6 liefern",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Das Kind nimmt überhaupt kein Fett auf" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Manche Kinder, die Bananen essen, nehmen viel Vitamin B6 auf",
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
              text: "The child gets a small amount of fat and a lot of vitamin B6",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Some children who eat bananas get a small amount of fat",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Meat can provide a lot of fat but little vitamin B6",
            },
          ],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "The child will not get any fat" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Some children who eat bananas get a lot of vitamin B6",
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
              text: "Anak memperoleh sedikit lemak dan banyak vitamin B6",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sebagian anak yang makan pisang memperoleh sedikit lemak",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Daging dapat memberikan banyak lemak tetapi sedikit vitamin B6",
            },
          ],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Anak tidak akan mendapatkan lemak" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sebagian anak yang makan pisang memperoleh banyak vitamin B6",
            },
          ],
        },
      ],
    },
  },
};

export default item;
