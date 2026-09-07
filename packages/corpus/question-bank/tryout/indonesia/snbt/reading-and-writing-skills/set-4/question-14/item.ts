import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden auf dem Büchertauschmarkt erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Büchertauschmarkt erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden auf dem Büchertauschmarkt erhoben anschließend sie verglichen wurden.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden auf dem Büchertauschmarkt erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Büchertauschmarkt erheben und anschließend vergleicht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected at the book exchange and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect at the book exchange and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected at the book exchange and afterward compared it.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected at the book exchange and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data collected the book exchange and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan didepan pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di pasar tukar buku dan kemudian membandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di pasar tukar buku lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
