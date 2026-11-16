import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "metabolism-and-enzymes",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$240$$ minutes, because only a single column at $$10\\text{ cm}^3$$ per minute reaches $$85\\%$$",
        },
        {
          correct: false,
          label:
            "$$60$$ minutes, because two columns at $$40\\text{ cm}^3$$ per minute convert $$45\\%+45\\%=90\\%$$",
        },
        {
          correct: true,
          label:
            "$$120$$ minutes, because the second column converts $$70\\%$$ of the lactose left by the first",
        },
        {
          correct: false,
          label:
            "$$120$$ minutes, because two columns at $$20\\text{ cm}^3$$ per minute convert $$70\\%+70\\%=140\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$240$$ minit, kerana hanya satu turus pada $$10\\text{ cm}^3$$ seminit mencapai $$85\\%$$",
        },
        {
          correct: false,
          label:
            "$$60$$ minit, kerana dua turus pada $$40\\text{ cm}^3$$ seminit menukarkan $$45\\%+45\\%=90\\%$$",
        },
        {
          correct: true,
          label:
            "$$120$$ minit, kerana turus kedua menukarkan $$70\\%$$ laktosa yang ditinggalkan oleh turus pertama",
        },
        {
          correct: false,
          label:
            "$$120$$ minit, kerana dua turus pada $$20\\text{ cm}^3$$ seminit menukarkan $$70\\%+70\\%=140\\%$$",
        },
      ],
    },
  },
};

export default item;
