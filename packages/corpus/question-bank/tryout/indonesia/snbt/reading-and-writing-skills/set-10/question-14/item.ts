import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Daten worden an der Informationsstelle im Stadtpark erhebt und danach vergleichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an die Informationsstelle im Stadtpark erhoben und danach verglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden an der Informationsstelle im Stadtpark erhoben anschließend sie verglichen wurden.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten wurden von Informationsstelle im Stadtpark erheben und anschließend vergleicht.",
        },
        {
          isCorrect: true,
          label:
            "Die Daten wurden an der Informationsstelle im Stadtpark erhoben und danach verglichen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data were collected at the city park information desk and compared afterward in.",
        },
        {
          isCorrect: false,
          label:
            "Data was collect at the city park information desk and comparing afterward.",
        },
        {
          isCorrect: false,
          label:
            "Data were collected at the city park information desk and afterward compared it.",
        },
        {
          isCorrect: false,
          label:
            "Data collected the city park information desk and were comparison afterward.",
        },
        {
          isCorrect: true,
          label:
            "Data were collected at the city park information desk and compared afterward.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data di kumpulkan di pusat informasi taman kota dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan dipusat informasi taman kota dan kemudian dibandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data mengumpulkan di pusat informasi taman kota dan kemudian membandingkan.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan pada di pusat informasi taman kota lalu di bandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Data dikumpulkan di pusat informasi taman kota dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
