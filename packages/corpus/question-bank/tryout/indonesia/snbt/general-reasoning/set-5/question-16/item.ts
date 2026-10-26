import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pertumbuhan ekonomi mulai membaik kembali pada $$2016$$",
        },
        {
          correct: true,
          label:
            "Pertumbuhan tetap di atas $$5\\%$$ pada setiap tahun yang disebutkan",
        },
        {
          correct: false,
          label:
            "PDB pada $$2018$$ sebesar $$\\text{Rp }14{.}837{,}4\\text{ triliun}$$ dan PDB per kapita sekitar $$\\text{Rp }56\\text{ juta}$$",
        },
        {
          correct: false,
          label:
            "Pertumbuhan terendah yang disebutkan adalah $$4{,}88\\%$$ pada $$2015$$",
        },
        {
          correct: false,
          label: "Pertumbuhan ekonomi pada $$2018$$ sebesar $$5{,}17\\%$$",
        },
      ],
    },
  },
};

export default item;
