import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Insgesamt interessieren sich $$160$$ Schülerinnen und Schüler für Malerei",
        },
        {
          isCorrect: false,
          label: "Basketball ist das beliebteste Freizeitinteresse",
        },
        {
          isCorrect: false,
          label:
            "Insgesamt interessieren sich $$65$$ Schülerinnen und Schüler für Schauspiel",
        },
        {
          isCorrect: false,
          label:
            "Die Gesamtzahl der Schülerinnen und Schüler in Klasse $$\\text{XII}$$ beträgt $$306$$",
        },
        {
          isCorrect: false,
          label:
            "In Klasse $$\\text{X}$$ interessieren sich die wenigsten Schülerinnen und Schüler für Tanz",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The number of students interested in painting is $$160$$",
        },
        {
          isCorrect: false,
          label: "Basketball is the most popular interest",
        },
        {
          isCorrect: false,
          label:
            "The number of students interested in acting is $$65$$ students",
        },
        {
          isCorrect: false,
          label:
            "The number of class $$\\text{XII}$$ students according to interest is $$306$$",
        },
        {
          isCorrect: false,
          label: "The least interest in dance is in class $$\\text{X}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Jumlah siswa gemar melukis adalah $$160$$",
        },
        {
          isCorrect: false,
          label: "Kegemaran basket adalah paling banyak diminati",
        },
        {
          isCorrect: false,
          label: "Jumlah siswa gemar seni peran adalah $$65$$ siswa",
        },
        {
          isCorrect: false,
          label:
            "Jumlah siswa kelas $$\\text{XII}$$ sesuai kegemaran adalah $$306$$",
        },
        {
          isCorrect: false,
          label:
            "Kegemaran seni tari yang paling sedikit ada di kelas $$\\text{X}$$",
        },
      ],
    },
  },
};

export default item;
