import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dennoch, hatte das Team das Verständnis der Besuchenden noch nicht gemessen.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch: hatte das Team das Verständnis der Besuchenden noch nicht gemessen.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch hatte das Team, das Verständnis der Besuchenden noch nicht gemessen.",
        },
        {
          isCorrect: true,
          label:
            "Dennoch hatte das Team das Verständnis der Besuchenden noch nicht gemessen.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch hatte das Team das Verständnis der Besuchenden noch nicht gemessen?",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nevertheless, the, team had not measured visitor understanding.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless: the team had not measured visitor understanding.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team, had not measured visitor understanding.",
        },
        {
          isCorrect: true,
          label:
            "Nevertheless, the team had not measured visitor understanding.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team had not measured visitor understanding?",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Meskipun demikian tim belum mengukur pemahaman pengunjung.",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian: tim belum mengukur pemahaman pengunjung.",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian, tim, belum mengukur pemahaman pengunjung.",
        },
        {
          isCorrect: true,
          label: "Meskipun demikian, tim belum mengukur pemahaman pengunjung.",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian, tim belum mengukur pemahaman pengunjung?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
