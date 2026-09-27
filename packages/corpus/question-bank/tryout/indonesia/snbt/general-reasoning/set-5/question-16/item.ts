import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pertumbuhan ekonomi mulai membaik kembali pada $$2016$$",
        },
        {
          isCorrect: true,
          label:
            "Pertumbuhan tetap di atas $$5\\%$$ pada setiap tahun yang disebutkan",
        },
        {
          isCorrect: false,
          label:
            "PDB pada $$2018$$ sebesar $$\\text{Rp }14{.}837{,}4\\text{ triliun}$$ dan PDB per kapita sekitar $$\\text{Rp }56\\text{ juta}$$",
        },
        {
          isCorrect: false,
          label:
            "Pertumbuhan terendah yang disebutkan adalah $$4{,}88\\%$$ pada $$2015$$",
        },
        {
          isCorrect: false,
          label: "Pertumbuhan ekonomi pada $$2018$$ sebesar $$5{,}17\\%$$",
        },
      ],
    },
  },
};

export default item;
