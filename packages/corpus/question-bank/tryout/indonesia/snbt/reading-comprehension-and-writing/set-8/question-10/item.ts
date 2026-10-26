import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim akan mengelompokkan pertanyaan dan menilai pemahaman sambil mengubah aturan ukuran kelompok.",
        },
        {
          correct: true,
          label:
            "Tim akan mengelompokkan jenis pertanyaan dan menilai pemahaman sambil mempertahankan aturan ukuran kelompok.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah pengunjung yang bertanya paling tinggi.",
        },
        {
          correct: false,
          label:
            "Tim akan menerapkan kartu permanen sebagai pengganti penilaian lanjutan.",
        },
        {
          correct: false,
          label:
            "Tim akan mempertahankan aturan kelompok tanpa menilai pemahaman atau mengelompokkan pertanyaan.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
