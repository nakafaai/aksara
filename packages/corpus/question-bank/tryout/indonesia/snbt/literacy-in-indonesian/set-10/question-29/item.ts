import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menegaskan bahwa gang itu pasti akan diperiksa petugas pada malam berikutnya.",
        },
        {
          isCorrect: true,
          label:
            "Mewujudkan batas pengetahuan yang dimiliki para tokoh sekaligus membuka kemungkinan peta dilanjutkan tanpa memastikan siapa yang akan melengkapinya.",
        },
        {
          isCorrect: false,
          label:
            "Membuktikan bahwa catatan warga tidak berguna karena masih menyisakan lokasi kosong.",
        },
        {
          isCorrect: false,
          label:
            "Menunjukkan bahwa Nara sengaja mengabaikan gang agar peta buatannya terlihat lebih menarik.",
        },
        {
          isCorrect: false,
          label:
            "Menutup konflik dengan memastikan tidak ada sumber cahaya di sekitar gang tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
