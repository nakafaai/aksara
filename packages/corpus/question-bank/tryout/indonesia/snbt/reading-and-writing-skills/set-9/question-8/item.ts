import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dennoch, begrenzte das Team seine Schlussfolgerung auf den kurzen Versuch in einer Baumschule.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch: begrenzte das Team seine Schlussfolgerung auf den kurzen Versuch in einer Baumschule.",
        },
        {
          isCorrect: true,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung auf den kurzen Versuch in einer Baumschule.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team, seine Schlussfolgerung auf den kurzen Versuch in einer Baumschule.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung auf den kurzen Versuch in einer Baumschule?",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nevertheless, the, team limited its conclusion to the short trial at one nursery.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless: the team limited its conclusion to the short trial at one nursery.",
        },
        {
          isCorrect: true,
          label:
            "Nevertheless, the team limited its conclusion to the short trial at one nursery.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team, limited its conclusion to the short trial at one nursery.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team limited its conclusion to the short trial at one nursery?",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat di satu lokasi pembibitan?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
