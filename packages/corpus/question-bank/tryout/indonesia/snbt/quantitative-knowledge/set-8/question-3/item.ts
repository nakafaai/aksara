import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 2, label: "$$f(2027)=1$$" },
        {
          column: 1,
          label:
            "Persamaan $$f(x)=\\dfrac12$$ mempunyai tepat $$4$$ penyelesaian pada selang $$0\\le x\\le8$$.",
        },
        {
          column: 1,
          label: "$$f(x)+f(x+2)=0$$ untuk setiap bilangan real $$x$$.",
        },
        { column: 2, label: "Fungsi $$g(x)=f(x+1)$$ adalah fungsi ganjil." },
      ],
    },
  },
};

export default item;
