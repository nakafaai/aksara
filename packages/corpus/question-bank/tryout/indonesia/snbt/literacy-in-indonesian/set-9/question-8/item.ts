import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Cadangan bertambah $$11$$ unit karena $$18$$ unit fotosintesis dikurangi $$7$$ unit respirasi, sedangkan serasah termasuk cadangan tumbuhan.",
        },
        {
          correct: true,
          label:
            "Cadangan bertambah $$5$$ unit karena $$18$$ unit masuk, sedangkan $$7$$ unit respirasi dan $$6$$ unit serasah keluar.",
        },
        {
          correct: false,
          label:
            "Cadangan berkurang $$1$$ unit karena seluruh aliran pada tabel harus dijumlahkan tanpa membedakan asal dan tujuannya.",
        },
        {
          correct: false,
          label:
            "Cadangan bertambah $$8$$ unit karena $$18$$ unit fotosintesis dikurangi $$7$$ unit respirasi dan $$3$$ unit yang terbawa pasang.",
        },
        {
          correct: false,
          label:
            "Perubahan bersih tidak dapat dihitung karena arus penguraian tanah harus dimasukkan sebagai arus keluar tumbuhan.",
        },
      ],
    },
  },
};

export default item;
