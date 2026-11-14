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
          correct: true,
          label: "Tidak ada bilangan real $$x$$ yang memenuhi $$f(x)=2$$.",
        },
        {
          correct: false,
          label:
            "Fungsi $$f\\circ f$$ terdefinisi untuk setiap bilangan real $$x\\neq3$$.",
        },
        {
          correct: true,
          label: "$$f^{-1}(x)=\\frac{3x+6}{x-2}$$ untuk $$x\\neq2$$.",
        },
        {
          correct: true,
          label:
            "Grafik $$y=f(x)$$ dan garis $$y=x$$ berpotongan di tepat dua titik, dan jumlah absis kedua titik itu $$5$$.",
        },
        {
          correct: false,
          label:
            "Untuk setiap bilangan real $$p\\neq3$$, jika $$f(p)=q$$ dan $$q\\neq3$$, maka $$f(q)=p$$.",
        },
      ],
    },
  },
};

export default item;
