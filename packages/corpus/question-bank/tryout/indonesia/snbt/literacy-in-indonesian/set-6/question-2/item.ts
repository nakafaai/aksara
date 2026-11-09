import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Rata-rata $$15{,}6$$ detik untuk sepuluh ayunan pada tali $$60$$ sentimeter memberi periode perkiraan $$1{,}56$$ detik. Ketelitian perkiraan periode masih dipengaruhi pencatatan manual.",
        },
        {
          correct: false,
          label:
            "Durasi singkat membatasi ketelitian, tetapi pola yang terlihat sudah dapat digeneralisasi ke setiap keadaan sejenis.",
        },
        {
          correct: false,
          label:
            "Perbedaan yang tercatat belum dapat dianggap sebagai bukti sama sekali sebelum pengulangan menghasilkan rata-rata yang persis sama.",
        },
        {
          correct: false,
          label:
            "Kondisi pembanding membuat data dasar tidak diperlukan, sehingga nilai pada kondisi perubahan saja cukup untuk menyusun simpulan.",
        },
        {
          correct: false,
          label:
            "Hasil $$15{,}6$$ detik pada tali $$60$$ sentimeter membuktikan bahwa periode selalu berkurang $$4{,}5$$ detik untuk setiap pengurangan panjang tali sebesar $$40$$ sentimeter.",
        },
      ],
    },
  },
};

export default item;
