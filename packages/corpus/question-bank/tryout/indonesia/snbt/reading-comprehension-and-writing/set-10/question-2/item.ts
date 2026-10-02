import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "nilai terendah yang wajib dicapai agar uji dinyatakan berhasil",
        },
        {
          isCorrect: false,
          label:
            "rata-rata gabungan dari pertemuan uji dan pertemuan pembanding",
        },
        {
          isCorrect: false,
          label: "perkiraan yang dibuat sebelum pencatatan dimulai",
        },
        {
          isCorrect: false,
          label: "nilai yang telah dikoreksi setelah peserta memberi tanggapan",
        },
        {
          isCorrect: true,
          label:
            "nilai yang dicatat sebelum perubahan uji dan dipakai sebagai salah satu acuan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
