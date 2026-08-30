import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "das Ventil geschlossen wird",
        },
        {
          isCorrect: false,
          label: "Nicht: eine Warnung gesendet wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: das Ventil geschlossen wird.",
        },
        {
          isCorrect: false,
          label: "eine Warnung gesendet wird",
        },
        {
          isCorrect: false,
          label: "Nicht: der Sensor aktiviert wird.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "the valve closes",
        },
        {
          isCorrect: false,
          label: "It is not true that a warning is sent.",
        },
        {
          isCorrect: false,
          label: "It is not true that the valve closes.",
        },
        {
          isCorrect: false,
          label: "a warning is sent",
        },
        {
          isCorrect: false,
          label: "It is not true that the sensor activates.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "katup ditutup",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa peringatan dikirim.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa katup ditutup.",
        },
        {
          isCorrect: false,
          label: "peringatan dikirim",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa sensor aktif.",
        },
      ],
    },
  },
};

export default item;
