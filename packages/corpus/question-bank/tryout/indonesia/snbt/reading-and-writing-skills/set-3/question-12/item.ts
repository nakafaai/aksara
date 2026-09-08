import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team Reihenfolgekarten im Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team Reihenfolgekarten im Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team Reihenfolgekarten im Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team Reihenfolgekarten im Kompostierworkshop",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team Reihenfolgekarten im Kompostierworkshop.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested sequencing cards in the composting workshop.",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested sequencing cards in the composting workshop.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested sequencing cards in the composting workshop.",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested sequencing cards in the composting workshop",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested sequencing cards in the composting workshop.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji kartu urutan bahan di lokakarya kompos",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
