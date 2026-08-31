import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden im Kontext Aufnahmestudio der Schule erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an den Kontext Aufnahmestudio der Schule erhoben und danach verglichen.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden in diesem Kontext erhoben: Aufnahmestudio der Schule. Anschließend wurden sie verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden in diesem Kontext erhoben Aufnahmestudio der Schule anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Aufnahmestudio der Schule erheben und anschließend vergleicht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected at this setting (school recording studio) and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect in this setting (school recording studio) and comparing afterward.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected in this setting (school recording studio) and compared afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected on this setting (school recording studio) and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected this setting (school recording studio) and were comparison afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di ukur di studio rekaman sekolah dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur didepan studio rekaman sekolah dan kemudian dibandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data diukur di studio rekaman sekolah dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengukur di studio rekaman sekolah dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data diukur pada di studio rekaman sekolah lalu di bandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
