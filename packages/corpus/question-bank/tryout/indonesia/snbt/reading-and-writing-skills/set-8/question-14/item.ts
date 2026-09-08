import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Daten worden im Fundbüro erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an das Fundbüro erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden im Fundbüro erhoben anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Fundbüro erheben und anschließend vergleicht.",
        },
        {
          isCorrect: true,
          label: "Die Daten wurden im Fundbüro erhoben und danach verglichen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected at the lost-property office and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect at the lost-property office and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected at the lost-property office and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected the lost-property office and were comparison afterward.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected at the lost-property office and compared afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di kantor barang hilang dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan dikantor barang hilang dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di kantor barang hilang dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di kantor barang hilang lalu di bandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di kantor barang hilang dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
