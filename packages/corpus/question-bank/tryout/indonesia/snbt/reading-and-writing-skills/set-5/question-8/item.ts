import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dennoch, begrenzte das Team seine Schlussfolgerung zum Kontext Erfassung von Straßenbäumen auf den kurzen Versuch.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch: begrenzte das Team seine Schlussfolgerung zum Kontext Erfassung von Straßenbäumen auf den kurzen Versuch.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch; begrenzte das Team seine Schlussfolgerung zum Kontext Erfassung von Straßenbäumen auf den kurzen Versuch.",
        },
        {
          isCorrect: true,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung zum Kontext Erfassung von Straßenbäumen auf den kurzen Versuch.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung zum Kontext Erfassung von Straßenbäumen auf den kurzen Versuch?",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nevertheless the team limited its conclusion for this setting (street-tree survey) to the short trial.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless: the team limited its conclusion for this setting (street-tree survey) to the short trial.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless; the team limited its conclusion for this setting (street-tree survey) to the short trial.",
        },
        {
          isCorrect: true,
          label:
            "Nevertheless, the team limited its conclusion for this setting (street-tree survey) to the short trial.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team limited its conclusion for this setting (street-tree survey) to the short trial?",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan tentang pendataan pohon jalan pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan tentang pendataan pohon jalan pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian; tim membatasi simpulan tentang pendataan pohon jalan pada uji singkat tersebut.",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan tentang pendataan pohon jalan pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan tentang pendataan pohon jalan pada uji singkat tersebut?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
