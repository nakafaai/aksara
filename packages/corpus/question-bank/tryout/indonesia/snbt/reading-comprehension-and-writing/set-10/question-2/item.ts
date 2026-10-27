import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "nilai terendah yang wajib dicapai agar uji dinyatakan berhasil",
        },
        {
          correct: false,
          label:
            "rata-rata gabungan dari pertemuan uji dan pertemuan pembanding",
        },
        {
          correct: false,
          label: "perkiraan yang dibuat sebelum pencatatan dimulai",
        },
        {
          correct: false,
          label: "nilai yang telah dikoreksi setelah peserta memberi tanggapan",
        },
        {
          correct: true,
          label:
            "nilai yang dicatat sebelum perubahan uji dan dipakai sebagai salah satu acuan",
        },
      ],
    },
  },
};

export default item;
