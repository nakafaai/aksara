import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Cadangan bertambah 11 unit karena 18 unit fotosintesis dikurangi 7 unit respirasi, sedangkan serasah termasuk cadangan tumbuhan.",
        },
        {
          isCorrect: true,
          label:
            "Cadangan bertambah 5 unit karena 18 unit masuk, sedangkan 7 unit respirasi dan 6 unit serasah keluar.",
        },
        {
          isCorrect: false,
          label:
            "Cadangan berkurang 1 unit karena seluruh aliran pada tabel harus dijumlahkan tanpa membedakan asal dan tujuannya.",
        },
        {
          isCorrect: false,
          label:
            "Cadangan bertambah 8 unit karena 18 unit fotosintesis dikurangi 7 unit respirasi dan 3 unit yang terbawa pasang.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan bersih tidak dapat dihitung karena arus penguraian tanah harus dimasukkan sebagai arus keluar tumbuhan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
