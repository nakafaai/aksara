import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2$$ Belletristikbücher",
      value: false,
    },
    {
      label: "$$1$$ Belletristikbuch und $$1$$ Wissenschaftsbuch",
      value: false,
    },
    {
      label: "$$1$$ Wissenschaftsbuch und $$1$$ Geschichtsbuch",
      value: false,
    },
    {
      label: "$$2$$ Geschichtsbücher",
      value: false,
    },
    {
      label: "$$2$$ Wissenschaftsbücher",
      value: true,
    },
  ],
  en: [
    { label: "$$2$$ fiction books", value: false },
    { label: "$$1$$ fiction book and $$1$$ science book", value: false },
    { label: "$$1$$ science book and $$1$$ history book", value: false },
    { label: "$$2$$ history books", value: false },
    { label: "$$2$$ science books", value: true },
  ],
  id: [
    { label: "$$2$$ buku fiksi", value: false },
    { label: "$$1$$ buku fiksi dan $$1$$ buku sains", value: false },
    { label: "$$1$$ buku sains dan $$1$$ buku sejarah", value: false },
    { label: "$$2$$ buku sejarah", value: false },
    { label: "$$2$$ buku sains", value: true },
  ],
};

export default choices;
