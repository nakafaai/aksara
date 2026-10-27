import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "tanda tangan digital : keaslian dokumen",
        },
        {
          correct: false,
          label: "kompresi : ukuran berkas",
        },
        {
          correct: false,
          label: "kata sandi : kecerahan layar",
        },
        {
          correct: false,
          label: "cadangan data : kecepatan jaringan",
        },
        {
          correct: false,
          label: "enkripsi : resolusi cetak",
        },
      ],
    },
  },
};

export default item;
