import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Maschine A",
        },
        {
          isCorrect: false,
          label: "Maschine B",
        },
        {
          isCorrect: true,
          label: "Maschine C",
        },
        {
          isCorrect: false,
          label: "Maschinen A und C haben denselben Höchstwert",
        },
        {
          isCorrect: false,
          label: "Maschinen B und C haben denselben Höchstwert",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Machine A",
        },
        {
          isCorrect: false,
          label: "Machine B",
        },
        {
          isCorrect: true,
          label: "Machine C",
        },
        {
          isCorrect: false,
          label: "Machines A and C tie for highest",
        },
        {
          isCorrect: false,
          label: "Machines B and C tie for highest",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mesin A",
        },
        {
          isCorrect: false,
          label: "Mesin B",
        },
        {
          isCorrect: true,
          label: "Mesin C",
        },
        {
          isCorrect: false,
          label: "Mesin A dan C sama tinggi",
        },
        {
          isCorrect: false,
          label: "Mesin B dan C sama tinggi",
        },
      ],
    },
  },
};

export default item;
