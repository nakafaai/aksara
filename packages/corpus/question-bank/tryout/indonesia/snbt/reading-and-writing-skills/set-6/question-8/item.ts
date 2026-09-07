import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dennoch, begrenzte das Team seine Schlussfolgerung auf die untersuchte Ausstellung.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch: begrenzte das Team seine Schlussfolgerung auf die untersuchte Ausstellung.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team, seine Schlussfolgerung auf die untersuchte Ausstellung.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung auf die untersuchte Ausstellung?",
        },
        {
          isCorrect: true,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung auf die untersuchte Ausstellung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nevertheless, the, team limited its conclusion to the exhibition tested.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless: the team limited its conclusion to the exhibition tested.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team, limited its conclusion to the exhibition tested.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team limited its conclusion to the exhibition tested?",
        },
        {
          isCorrect: true,
          label:
            "Nevertheless, the team limited its conclusion to the exhibition tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada pameran yang diuji.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada pameran yang diuji.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada pameran yang diuji.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada pameran yang diuji?",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada pameran yang diuji.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
