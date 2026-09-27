import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "tanda tangan digital : keaslian dokumen",
        },
        {
          isCorrect: false,
          label: "kompresi : ukuran berkas",
        },
        {
          isCorrect: false,
          label: "kata sandi : kecerahan layar",
        },
        {
          isCorrect: false,
          label: "cadangan data : kecepatan jaringan",
        },
        {
          isCorrect: false,
          label: "enkripsi : resolusi cetak",
        },
      ],
    },
  },
};

export default item;
