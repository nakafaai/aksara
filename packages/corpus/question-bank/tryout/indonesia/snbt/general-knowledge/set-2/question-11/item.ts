import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "produk susu yang diubah oleh mikroorganisme melalui fermentasi.",
        },
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
          isCorrect: false,
          label: "produk susu yang dicampur oksigen sebelum diminum.",
        },
      ],
    },
  },
};

export default item;
