import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Peluang pertumbuhan ekonomi karena besarnya proporsi penduduk usia produktif",
        },
        {
          correct: false,
          label: "Letak geografis Indonesia yang strategis",
        },
        {
          correct: false,
          label: "Keunggulan produk pertanian Indonesia",
        },
        {
          correct: false,
          label:
            "Indonesia menjadi pengekspor nomor satu dunia dan menuju negara maju",
        },
        {
          correct: false,
          label: "Peningkatan produktivitas Indonesia",
        },
      ],
    },
  },
};

export default item;
