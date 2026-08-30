import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden im Kontext Büchertauschmarkt erhebt und danach vergleichen.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden in diesem Kontext erhoben: Büchertauschmarkt. Anschließend wurden sie verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Kontext Büchertauschmarkt erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden in diesem Kontext erhoben Büchertauschmarkt anschließend sie verglichen wurden.",
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
            "Data were collected at this setting (book exchange market) and compared afterward in.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected in this setting (book exchange market) and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in this setting (book exchange market) and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected on this setting (book exchange market) and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected this setting (book exchange market) and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Data di ukur di pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          isCorrect: true,
          label: "Data diukur di pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur didepan pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengukur di pasar tukar buku dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label: "Data diukur pada di pasar tukar buku lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
