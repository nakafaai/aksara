import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "produk susu yang diubah oleh mikroorganisme melalui fermentasi.",
        },
        {
          correct: false,
          label: "produk susu yang dijamin tidak mengandung laktosa.",
        },
        {
          correct: false,
          label: "produk susu yang hanya ditujukan bagi lansia.",
        },
        {
          correct: false,
          label: "obat untuk menangani penyakit pencernaan.",
        },
        {
          correct: false,
          label: "produk susu yang dicampur oksigen sebelum diminum.",
        },
      ],
    },
  },
};

export default item;
