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
              text: "Stunting bedeutet ein zu geringes Gewicht für die Körpergröße",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Stunting kann nur durch genetische Faktoren verursacht werden",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Stunting verursacht immer eine kognitive Behinderung",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Stunting ist eine zu geringe Körpergröße für das Alter und steht häufig mit chronischer oder wiederkehrender Unterernährung in Verbindung",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Überernährung ist die einzige Ursache von Stunting",
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
            { kind: "text", text: "Stunting means low weight for height" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Only genetic factors can cause stunting" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Stunting always causes cognitive disability",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Stunting is low height for age and is commonly linked to chronic or recurrent undernutrition",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Overnutrition is the only cause of stunting",
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
              text: "Stunting berarti berat badan rendah menurut tinggi badan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Stunting hanya dapat disebabkan oleh faktor genetik",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Stunting selalu menyebabkan disabilitas kognitif",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Stunting adalah tinggi badan rendah menurut usia dan umumnya berkaitan dengan kekurangan gizi kronis atau berulang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kelebihan gizi adalah satu-satunya penyebab stunting",
            },
          ],
        },
      ],
    },
  },
};

export default item;
