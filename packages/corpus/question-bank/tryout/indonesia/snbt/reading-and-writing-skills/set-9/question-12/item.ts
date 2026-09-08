import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "am Montag prüfte das Team den Digitalplan im Proberaum.",
        },
        {
          isCorrect: true,
          label: "Am Montag prüfte das Team den Digitalplan im Proberaum.",
        },
        {
          isCorrect: false,
          label: "Am montag prüfte das Team den Digitalplan im Proberaum.",
        },
        {
          isCorrect: false,
          label: "Am Montag prüfte Das Team den Digitalplan im Proberaum.",
        },
        {
          isCorrect: false,
          label: "Am Montag, prüfte das Team den Digitalplan im Proberaum",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested the digital schedule updated after cancellations.",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested the digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested the digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested the digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested the digital schedule updated after cancellations",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pada Senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          isCorrect: true,
          label: "Pada Senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          isCorrect: false,
          label: "Pada senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          isCorrect: false,
          label: "Pada Senin, Tim menguji jadwal digital setelah pembatalan.",
        },
        {
          isCorrect: false,
          label: "Pada Senin tim menguji jadwal digital setelah pembatalan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
