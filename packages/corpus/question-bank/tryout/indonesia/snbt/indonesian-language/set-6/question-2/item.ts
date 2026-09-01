import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Rata-rata 15,6 detik untuk sepuluh ayunan pada tali 60 sentimeter memberi periode perkiraan 1,56 detik; ketelitiannya masih dipengaruhi pencatatan manual.",
        },
        {
          isCorrect: false,
          label:
            "Durasi singkat membatasi ketelitian, tetapi pola yang terlihat sudah dapat digeneralisasi ke setiap keadaan sejenis.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan yang tercatat belum dapat dianggap sebagai bukti sama sekali sebelum pengulangan menghasilkan rata-rata yang persis sama.",
        },
        {
          isCorrect: false,
          label:
            "Kondisi pembanding membuat data dasar tidak diperlukan, sehingga nilai pada kondisi perubahan saja cukup untuk menyusun simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Hasil 15,6 detik pada tali 60 sentimeter membuktikan bahwa periode selalu berkurang 4,5 detik untuk setiap pengurangan panjang tali sebesar 40 sentimeter.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
