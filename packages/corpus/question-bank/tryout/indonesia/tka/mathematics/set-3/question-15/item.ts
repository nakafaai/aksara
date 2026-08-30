import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Eine Drehung um $90^\\circ$ gegen den Uhrzeigersinn bildet $(x,y)$ auf $(-y,x)$ ab.",
        },
        {
          isCorrect: true,
          label: "Eine Spiegelung an $y=x$ vertauscht die Koordinaten.",
        },
        {
          isCorrect: true,
          label:
            "Eine Streckung mit dem Faktor $\\frac12$ vervierfacht den Flächeninhalt nicht, sondern multipliziert ihn mit $\\frac14$.",
        },
        {
          isCorrect: false,
          label:
            "Eine Verschiebung kann den Flächeninhalt einer Figur verändern.",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label:
            "A $90^\\circ$ counterclockwise rotation maps $(x,y)$ to $(-y,x)$.",
        },
        {
          isCorrect: true,
          label: "Reflection across $y=x$ swaps the coordinates.",
        },
        {
          isCorrect: true,
          label:
            "A dilation with scale factor $\\frac12$ multiplies area by $\\frac14$.",
        },
        {
          isCorrect: false,
          label: "A translation can change a figure's area.",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Rotasi $90^\\circ$ berlawanan arah jarum jam memetakan $(x,y)$ ke $(-y,x)$.",
        },
        {
          isCorrect: true,
          label: "Refleksi terhadap $y=x$ menukar kedua koordinat.",
        },
        {
          isCorrect: true,
          label:
            "Dilatasi dengan faktor $\\frac12$ mengalikan luas dengan $\\frac14$.",
        },
        {
          isCorrect: false,
          label: "Translasi dapat mengubah luas suatu bangun.",
        },
      ],
    },
  },
};

export default item;
