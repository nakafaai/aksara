import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simpulan pasti benar karena hujan yang sama selalu menghasilkan vegetasi yang sama.",
        },
        {
          correct: false,
          label:
            "Simpulan pasti salah karena vegetasi tidak mungkin tumbuh di gurun.",
        },
        {
          correct: false,
          label:
            "Simpulan tidak relevan karena tidak ada hubungan antara hujan dan vegetasi dalam bacaan.",
        },
        {
          correct: true,
          label:
            "Simpulan masuk akal berdasarkan pengamatan sebelumnya, tetapi hasilnya belum pasti.",
        },
        {
          correct: false,
          label:
            "Tidak ada bukti yang relevan karena bacaan tidak melaporkan vegetasi setelah hujan sebelumnya.",
        },
      ],
    },
  },
};

export default item;
