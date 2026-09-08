import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dennoch, begrenzte das Team seine Schlussfolgerung auf die in den Beispielfotos dargestellten Baumarten.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch: begrenzte das Team seine Schlussfolgerung auf die in den Beispielfotos dargestellten Baumarten.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team, seine Schlussfolgerung auf die in den Beispielfotos dargestellten Baumarten.",
        },
        {
          isCorrect: false,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung auf die in den Beispielfotos dargestellten Baumarten?",
        },
        {
          isCorrect: true,
          label:
            "Dennoch begrenzte das Team seine Schlussfolgerung auf die in den Beispielfotos dargestellten Baumarten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nevertheless, the, team limited its conclusion to the tree species represented in the sample photographs.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless: the team limited its conclusion to the tree species represented in the sample photographs.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team, limited its conclusion to the tree species represented in the sample photographs.",
        },
        {
          isCorrect: false,
          label:
            "Nevertheless, the team limited its conclusion to the tree species represented in the sample photographs?",
        },
        {
          isCorrect: true,
          label:
            "Nevertheless, the team limited its conclusion to the tree species represented in the sample photographs.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto?",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
