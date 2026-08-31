import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ab $$2016$$ verbesserte sich das Wirtschaftswachstum wieder",
        },
        {
          isCorrect: true,
          label: "Das Wachstum lag in jedem genannten Jahr über $$5%$$",
        },
        {
          isCorrect: false,
          label:
            "Das BIP betrug $$2018$$ $$\\text{Rp }14{.}837{,}4\\text{ Billionen}$$ und das BIP pro Kopf rund $$\\text{Rp }56\\text{ Millionen}$$",
        },
        {
          isCorrect: false,
          label:
            "Das niedrigste genannte Wachstum betrug $$4{,}88%$$ im Jahr $$2015$$",
        },
        {
          isCorrect: false,
          label: "Das Wirtschaftswachstum betrug $$2018$$ $$5{,}17%$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Economic growth began improving again in $$2016$$",
        },
        {
          isCorrect: true,
          label: "Growth remained above $$5%$$ in every year mentioned",
        },
        {
          isCorrect: false,
          label:
            "GDP in $$2018$$ was $$\\text{Rp }14{,}837.4\\text{ trillion}$$ and GDP per capita was about $$\\text{Rp }56\\text{ million}$$",
        },
        {
          isCorrect: false,
          label: "The lowest stated growth was $$4.88%$$ in $$2015$$",
        },
        {
          isCorrect: false,
          label: "Economic growth in $$2018$$ was $$5.17%$$",
        },
      ],
    },
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
            "Pertumbuhan tetap di atas $$5%$$ pada setiap tahun yang disebutkan",
        },
        {
          isCorrect: false,
          label:
            "PDB pada $$2018$$ sebesar $$\\text{Rp }14{.}837{,}4\\text{ triliun}$$ dan PDB per kapita sekitar $$\\text{Rp }56\\text{ juta}$$",
        },
        {
          isCorrect: false,
          label:
            "Pertumbuhan terendah yang disebutkan adalah $$4{,}88%$$ pada $$2015$$",
        },
        {
          isCorrect: false,
          label: "Pertumbuhan ekonomi pada $$2018$$ sebesar $$5{,}17%$$",
        },
      ],
    },
  },
};

export default item;
