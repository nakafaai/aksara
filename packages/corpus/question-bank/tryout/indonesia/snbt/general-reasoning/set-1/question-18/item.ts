import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kantor baru lebih jauh dari rumah sebagian besar karyawan.",
        },
        {
          correct: false,
          label:
            "Perpindahan itu menggandakan rata-rata waktu perjalanan ke kantor.",
        },
        {
          correct: false,
          label: "Biaya sewa kantor baru lebih rendah daripada kantor lama.",
        },
        {
          correct: false,
          label: "Perusahaan pindah setelah masa sewa gedung lama berakhir.",
        },
        {
          correct: true,
          label:
            "Sebagian besar surat pengunduran diri telah diajukan sebelum rencana perpindahan diumumkan.",
        },
      ],
    },
  },
};

export default item;
