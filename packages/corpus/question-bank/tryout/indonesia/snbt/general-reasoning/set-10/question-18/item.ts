import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Der Sensor war aktiv und ein Alarm wurde protokolliert.",
        },
        {
          isCorrect: false,
          label: "Der Sensor war aktiv, aber kein Alarm wurde protokolliert.",
        },
        {
          isCorrect: false,
          label:
            "Ein Alarm wurde protokolliert, aber der Techniker wurde nicht benachrichtigt.",
        },
        {
          isCorrect: true,
          label:
            "Der Sensor war nicht aktiv und kein Alarm wurde protokolliert.",
        },
        {
          isCorrect: false,
          label: "Nur der Status des Technikers ist bekannt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The sensor was active and an alarm was logged.",
        },
        {
          isCorrect: false,
          label: "The sensor was active, but no alarm was logged.",
        },
        {
          isCorrect: false,
          label: "An alarm was logged, but the technician was not notified.",
        },
        {
          isCorrect: true,
          label: "The sensor was not active and no alarm was logged.",
        },
        {
          isCorrect: false,
          label: "Only the technician's status is known.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sensor aktif dan alarm tercatat.",
        },
        {
          isCorrect: false,
          label: "Sensor aktif, tetapi alarm tidak tercatat.",
        },
        {
          isCorrect: false,
          label: "Alarm tercatat, tetapi teknisi tidak diberi tahu.",
        },
        {
          isCorrect: true,
          label: "Sensor tidak aktif dan alarm tidak tercatat.",
        },
        {
          isCorrect: false,
          label: "Hanya status teknisi yang dapat diketahui.",
        },
      ],
    },
  },
};

export default item;
