import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Die Art ist nur in Papua heimisch" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Art ist überall außerhalb Neuguineas eingeführt",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Art wächst vor allem in einem trockenen gemäßigten Biom",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Das natürliche Verbreitungsgebiet der Art reicht weit über Neuguinea hinaus",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Art ist eine krautige Pflanze und kein Baum",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The species is native only to Papua" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The species is introduced everywhere outside New Guinea",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The species grows primarily in a dry temperate biome",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The species' native range extends well beyond New Guinea",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The species is an herb rather than a tree" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Spesies ini hanya berasal dari Papua" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Spesies ini merupakan tumbuhan introduksi di semua wilayah di luar Pulau Papua",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Spesies ini terutama hidup di bioma kering beriklim sedang",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Daerah asal spesies ini membentang jauh melampaui Pulau Papua",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Spesies ini merupakan herba, bukan pohon" },
          ],
        },
      ],
    },
  },
};

export default item;
