import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ketepatan pesan dinilai dari terjaganya maksud dan tindakan, bukan dari kesamaan kata demi kata.",
        },
        {
          correct: false,
          label:
            "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah.",
        },
        {
          correct: false,
          label:
            "Terjemahan harus mengikuti setiap kata sumber meskipun warga salah memahami tindakan yang diminta.",
        },
        {
          correct: false,
          label:
            "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru.",
        },
        {
          correct: false,
          label:
            "Pesan darurat boleh mengubah tingkat bahaya selama warga lebih mudah mengingat kata-katanya.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
