import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ein Milcherzeugnis, das garantiert keine Laktose enthält.",
        },
        {
          isCorrect: false,
          label:
            "ein Milcherzeugnis, das nur für ältere Menschen bestimmt ist.",
        },
        {
          isCorrect: false,
          label: "ein Arzneimittel zur Behandlung von Verdauungskrankheiten.",
        },
        {
          isCorrect: true,
          label:
            "ein durch Mikroorganismen fermentativ verändertes Milcherzeugnis.",
        },
        {
          isCorrect: false,
          label:
            "ein vor dem Verzehr mit Sauerstoff vermischtes Milcherzeugnis.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "dairy that is guaranteed to contain no lactose.",
        },
        {
          isCorrect: false,
          label: "dairy intended only for older adults.",
        },
        {
          isCorrect: false,
          label: "a medicine for treating digestive disease.",
        },
        {
          isCorrect: true,
          label: "dairy transformed by microorganisms through fermentation.",
        },
        {
          isCorrect: false,
          label: "dairy mixed with oxygen before consumption.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "produk susu yang dijamin tidak mengandung laktosa.",
        },
        {
          isCorrect: false,
          label: "produk susu yang hanya ditujukan bagi lansia.",
        },
        {
          isCorrect: false,
          label: "obat untuk menangani penyakit pencernaan.",
        },
        {
          isCorrect: true,
          label:
            "produk susu yang diubah oleh mikroorganisme melalui fermentasi.",
        },
        {
          isCorrect: false,
          label: "produk susu yang dicampur oksigen sebelum diminum.",
        },
      ],
    },
  },
};

export default item;
