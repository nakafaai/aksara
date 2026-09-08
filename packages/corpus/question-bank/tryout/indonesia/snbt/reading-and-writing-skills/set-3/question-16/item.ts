import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Teilnehmenden des Kompostierworkshops gaben kurze Rückmeldungen, die kurz waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Teilnehmenden des Kompostierworkshops gaben kurze Rückmeldungen von kurzer Länge.",
        },
        {
          isCorrect: true,
          label:
            "Die Teilnehmenden des Kompostierworkshops gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Teilnehmenden des Kompostierworkshops gaben kurze Rückmeldungen in kurzer Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Teilnehmenden des Kompostierworkshops gaben kurze Rückmeldungen in diesem Kompostierworkshop.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Participants in the composting workshop gave brief comments that were brief.",
        },
        {
          isCorrect: false,
          label:
            "Participants in the composting workshop gave brief comments with a brief length.",
        },
        {
          isCorrect: true,
          label: "Participants in the composting workshop gave brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Participants in the composting workshop gave brief comments in a short form.",
        },
        {
          isCorrect: false,
          label:
            "Participants in the composting workshop gave brief comments in that composting workshop.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat dengan panjang komentar yang singkat.",
        },
        {
          isCorrect: true,
          label: "Peserta lokakarya kompos memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          isCorrect: false,
          label:
            "Peserta lokakarya kompos memberikan komentar singkat di lokakarya kompos tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
