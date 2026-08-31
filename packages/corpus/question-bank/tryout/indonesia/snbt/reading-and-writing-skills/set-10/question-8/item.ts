import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung zum Kontext Kochkurs für Jugendliche auf den kurzen Versuch.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch, begrenzte das Team seine Schlussfolgerung zum Kontext Kochkurs für Jugendliche auf den kurzen Versuch.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch: begrenzte das Team seine Schlussfolgerung zum Kontext Kochkurs für Jugendliche auf den kurzen Versuch.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch; begrenzte das Team seine Schlussfolgerung zum Kontext Kochkurs für Jugendliche auf den kurzen Versuch.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung zum Kontext Kochkurs für Jugendliche auf den kurzen Versuch?",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Nevertheless, the team limited its conclusion for this setting (teen cooking class) to the short trial.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless the team limited its conclusion for this setting (teen cooking class) to the short trial.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless: the team limited its conclusion for this setting (teen cooking class) to the short trial.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless; the team limited its conclusion for this setting (teen cooking class) to the short trial.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team limited its conclusion for this setting (teen cooking class) to the short trial?",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan tentang kelas memasak remaja pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan tentang kelas memasak remaja pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan tentang kelas memasak remaja pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian; tim membatasi simpulan tentang kelas memasak remaja pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan tentang kelas memasak remaja pada uji singkat tersebut?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
