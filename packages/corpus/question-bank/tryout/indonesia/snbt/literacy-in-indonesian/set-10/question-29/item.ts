import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menegaskan bahwa gang itu pasti akan diperiksa petugas pada malam berikutnya.",
        },
        {
          correct: true,
          label:
            "Mewujudkan batas pengetahuan yang dimiliki para tokoh sekaligus membuka kemungkinan peta dilanjutkan tanpa memastikan siapa yang akan melengkapinya.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa catatan warga tidak berguna karena masih menyisakan lokasi kosong.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa Nara sengaja mengabaikan gang agar peta buatannya terlihat lebih menarik.",
        },
        {
          correct: false,
          label:
            "Menutup konflik dengan memastikan tidak ada sumber cahaya di sekitar gang tersebut.",
        },
      ],
    },
  },
};

export default item;
