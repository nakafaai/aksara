import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung auf den kurzen Versuch mit dieser Rezeptart.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch, begrenzte das Team seine Schlussfolgerung auf den kurzen Versuch mit dieser Rezeptart.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch: begrenzte das Team seine Schlussfolgerung auf den kurzen Versuch mit dieser Rezeptart.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team, seine Schlussfolgerung auf den kurzen Versuch mit dieser Rezeptart.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung auf den kurzen Versuch mit dieser Rezeptart?",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Nevertheless, the team limited its conclusion to the short trial with that type of recipe.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the, team limited its conclusion to the short trial with that type of recipe.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless: the team limited its conclusion to the short trial with that type of recipe.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team, limited its conclusion to the short trial with that type of recipe.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team limited its conclusion to the short trial with that type of recipe?",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat dengan jenis resep tersebut?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
