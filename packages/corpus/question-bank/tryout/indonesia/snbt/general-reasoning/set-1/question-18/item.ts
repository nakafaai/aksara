import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kantor baru lebih jauh dari rumah sebagian besar karyawan.",
        },
        {
          isCorrect: false,
          label:
            "Perpindahan itu menggandakan rata-rata waktu perjalanan ke kantor.",
        },
        {
          isCorrect: false,
          label: "Biaya sewa kantor baru lebih rendah daripada kantor lama.",
        },
        {
          isCorrect: false,
          label: "Perusahaan pindah setelah masa sewa gedung lama berakhir.",
        },
        {
          isCorrect: true,
          label:
            "Sebagian besar surat pengunduran diri telah diajukan sebelum rencana perpindahan diumumkan.",
        },
      ],
    },
  },
};

export default item;
