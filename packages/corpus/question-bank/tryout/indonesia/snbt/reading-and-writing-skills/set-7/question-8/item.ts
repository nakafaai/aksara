import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dennoch, behauptete das Team nicht, dass Vorbestellungen immer weniger Reste hinterließen.",
        },
        {
          isCorrect: true,
          label:
            "Dennoch behauptete das Team nicht, dass Vorbestellungen immer weniger Reste hinterließen.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch: behauptete das Team nicht, dass Vorbestellungen immer weniger Reste hinterließen.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch behauptete das Team, nicht, dass Vorbestellungen immer weniger Reste hinterließen.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch behauptete das Team nicht, dass Vorbestellungen immer weniger Reste hinterließen?",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nevertheless, the, team did not claim that advance orders always reduced leftovers.",
        },
        {
          isCorrect: true,
          label:
            "Nevertheless, the team did not claim that advance orders always reduced leftovers.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless: the team did not claim that advance orders always reduced leftovers.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team, did not claim that advance orders always reduced leftovers.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team did not claim that advance orders always reduced leftovers?",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
