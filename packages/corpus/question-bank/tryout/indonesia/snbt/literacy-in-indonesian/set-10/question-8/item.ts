import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$35$$ mililiter, karena $$150$$ dikurangi $$24$$ dan $$91$$.",
        },
        {
          correct: false,
          label:
            "$$43$$ mililiter, karena $$150$$ dikurangi $$16$$ dan $$91$$.",
        },
        {
          correct: false,
          label:
            "$$59$$ mililiter, karena seluruh air yang belum keluar dianggap sudah tersimpan.",
        },
        {
          correct: false,
          label:
            "$$67$$ mililiter, karena $$8$$ mililiter air permukaan ditambahkan ke selisih $$150$$ dan $$91$$ mililiter.",
        },
        {
          correct: true,
          label:
            "$$51$$ mililiter, karena $$150$$ mililiter dikurangi $$8$$ mililiter di permukaan dan $$91$$ mililiter yang keluar.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
