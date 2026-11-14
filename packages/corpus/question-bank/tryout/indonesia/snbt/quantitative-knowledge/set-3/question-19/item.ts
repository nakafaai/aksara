import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Himpunan penyelesaian $$f(x)<0$$ memuat tepat $$1$$ bilangan bulat.",
        },
        { column: 1, label: "Nilai minimum $$f(x)$$ adalah $$-1$$." },
        {
          column: 2,
          label:
            "Persamaan $$f(x)=8$$ mempunyai tepat $$2$$ penyelesaian real.",
        },
        {
          column: 2,
          label:
            "Himpunan penyelesaian $$4^x+2^{x+1}-8>0$$ adalah $$x<-2$$ atau $$x>1$$.",
        },
      ],
    },
  },
};

export default item;
