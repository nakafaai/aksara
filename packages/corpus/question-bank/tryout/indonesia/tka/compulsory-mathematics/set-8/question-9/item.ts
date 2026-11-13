import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Persamaan $$(g\\circ f)(x)=x$$ hanya dipenuhi oleh dua anggota $$A$$.",
        },
        {
          correct: true,
          label:
            "Persamaan $$(f\\circ g)(x)=(g\\circ f)(x)$$ dipenuhi oleh tepat satu anggota $$A$$.",
        },
        {
          correct: false,
          label:
            "Karena $$f$$ mempunyai fungsi invers, fungsi $$g\\circ f$$ juga mempunyai fungsi invers.",
        },
        {
          correct: true,
          label: "$$f^{-1}\\big(g(2)\\big)=4$$",
        },
        {
          correct: true,
          label:
            "Tidak ada anggota $$A$$ yang memenuhi $$(g\\circ f)(x)=4$$.",
        },
      ],
    },
  },
};

export default item;
