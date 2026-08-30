import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "ein Milcherzeugnis, das garantiert keine Laktose enthält.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "ein Milcherzeugnis, das nur für ältere Menschen bestimmt ist.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "ein Arzneimittel zur Behandlung von Verdauungskrankheiten.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "ein durch Mikroorganismen fermentativ verändertes Milcherzeugnis.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "ein vor dem Verzehr mit Sauerstoff vermischtes Milcherzeugnis.",
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
            {
              kind: "text",
              text: "dairy that is guaranteed to contain no lactose.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "dairy intended only for older adults." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "a medicine for treating digestive disease.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "dairy transformed by microorganisms through fermentation.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "dairy mixed with oxygen before consumption.",
            },
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
            {
              kind: "text",
              text: "produk susu yang dijamin tidak mengandung laktosa.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "produk susu yang hanya ditujukan bagi lansia.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "obat untuk menangani penyakit pencernaan." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "produk susu yang diubah oleh mikroorganisme melalui fermentasi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "produk susu yang dicampur oksigen sebelum diminum.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
