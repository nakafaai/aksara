import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$4 \\text{ or } -2$$", value: true },
    { label: "$$-4 \\text{ or } 2$$", value: false },
    { label: "$$-2 \\text{ or } 3$$", value: false },
    { label: "$$2 \\text{ or } -3$$", value: false },
    { label: "$$3 \\text{ or } 8$$", value: false },
  ],
  id: [
    { label: "$$4 \\text{ atau } -2$$", value: true },
    { label: "$$-4 \\text{ atau } 2$$", value: false },
    { label: "$$-2 \\text{ atau } 3$$", value: false },
    { label: "$$2 \\text{ atau } -3$$", value: false },
    { label: "$$3 \\text{ atau } 8$$", value: false },
  ],
};

export default choices;
