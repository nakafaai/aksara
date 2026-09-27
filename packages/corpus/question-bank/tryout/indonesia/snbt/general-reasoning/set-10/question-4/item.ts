import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simpulan pasti benar karena hujan yang sama selalu menghasilkan vegetasi yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan pasti salah karena vegetasi tidak mungkin tumbuh di gurun.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tidak relevan karena tidak ada hubungan antara hujan dan vegetasi dalam bacaan.",
        },
        {
          isCorrect: true,
          label:
            "Simpulan masuk akal berdasarkan pengamatan sebelumnya, tetapi hasilnya belum pasti.",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada bukti yang relevan karena bacaan tidak melaporkan vegetasi setelah hujan sebelumnya.",
        },
      ],
    },
  },
};

export default item;
