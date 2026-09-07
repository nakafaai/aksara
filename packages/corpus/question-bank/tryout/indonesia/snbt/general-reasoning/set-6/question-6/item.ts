import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Basketball ist das beliebteste Hobby",
        },
        {
          isCorrect: true,
          label: "Insgesamt interessieren sich $$160$$ Schüler für Malen",
        },
        {
          isCorrect: false,
          label: "Insgesamt interessieren sich $$65$$ Schüler für Schauspiel",
        },
        {
          isCorrect: false,
          label: "Die Gesamtzahl in Klasse XII beträgt $$306$$",
        },
        {
          isCorrect: false,
          label:
            "Unter den drei Jahrgangsstufen hat Klasse X die wenigsten Tanzinteressierten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Basketball is the most popular hobby",
        },
        {
          isCorrect: true,
          label: "The number of students who like painting is $$160$$",
        },
        {
          isCorrect: false,
          label: "The number of students who like acting is $$65$$",
        },
        {
          isCorrect: false,
          label:
            "The total number of Grade XII students based on hobbies is $$306$$",
        },
        {
          isCorrect: false,
          label:
            "Grade X has the fewest dance participants among the three grades",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kegemaran basket adalah paling banyak diminati",
        },
        {
          isCorrect: true,
          label: "Jumlah siswa gemar melukis adalah $$160$$",
        },
        {
          isCorrect: false,
          label: "Jumlah siswa gemar seni peran adalah $$65$$ siswa",
        },
        {
          isCorrect: false,
          label: "Jumlah siswa kelas XII sesuai kegemaran adalah $$306$$",
        },
        {
          isCorrect: false,
          label:
            "Di antara ketiga jenjang, kelas X memiliki peminat seni tari paling sedikit",
        },
      ],
    },
  },
};

export default item;
