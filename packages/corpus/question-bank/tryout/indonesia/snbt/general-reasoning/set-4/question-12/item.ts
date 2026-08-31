import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Art ist nur in Papua heimisch",
        },
        {
          isCorrect: false,
          label: "Die Art ist überall außerhalb Neuguineas eingeführt",
        },
        {
          isCorrect: true,
          label:
            "Das natürliche Verbreitungsgebiet der Art reicht weit über Neuguinea hinaus",
        },
        {
          isCorrect: false,
          label: "Die Art wächst vor allem in einem trockenen gemäßigten Biom",
        },
        {
          isCorrect: false,
          label: "Die Art ist eine krautige Pflanze und kein Baum",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The species is native only to Papua",
        },
        {
          isCorrect: false,
          label: "The species is introduced everywhere outside New Guinea",
        },
        {
          isCorrect: true,
          label: "The species' native range extends well beyond New Guinea",
        },
        {
          isCorrect: false,
          label: "The species grows primarily in a dry temperate biome",
        },
        {
          isCorrect: false,
          label: "The species is an herb rather than a tree",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Spesies ini hanya berasal dari Papua",
        },
        {
          isCorrect: false,
          label:
            "Spesies ini merupakan tumbuhan introduksi di semua wilayah di luar Pulau Papua",
        },
        {
          isCorrect: true,
          label:
            "Daerah asal spesies ini membentang jauh melampaui Pulau Papua",
        },
        {
          isCorrect: false,
          label: "Spesies ini terutama hidup di bioma kering beriklim sedang",
        },
        {
          isCorrect: false,
          label: "Spesies ini merupakan herba, bukan pohon",
        },
      ],
    },
  },
};

export default item;
