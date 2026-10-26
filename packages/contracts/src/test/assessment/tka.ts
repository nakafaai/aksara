import {
  blockMath,
  doc,
  math,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { hash, NAME, part, plainPart } from "#contracts/test/assessment/item";

const TKA_SET_1 =
  "question-bank/tryout/indonesia/tka/compulsory-mathematics/set-1";

/** The five statements of TKA compulsory mathematics set 1, question 15. */
export const tkaChoice = {
  id: "statements",
  kind: "choice",
  label: NAME,
  maxChoices: 5,
  minChoices: 1,
  options: [
    part("option-1", math("T(1,-2)=(4,2)"), text(".")),
    part("option-2", math("T"), text(" menggandakan setiap panjang.")),
    part(
      "option-3",
      math("T"),
      text(" mengalikan setiap luas dengan "),
      math("4"),
      text(".")
    ),
    part("option-4", math("T"), text(" membalik orientasi.")),
    part("option-5", math("T^2(x,y)=(-4x,-4y)"), text(".")),
  ],
  shuffle: false,
};

/** TKA compulsory mathematics set 1, question 15: select all true statements. */
export const tkaMultiple = {
  deliveryLanguage: "id",
  family: `${TKA_SET_1}/question-15`,
  hash: hash("4"),
  interactions: [tkaChoice],
  prompt: doc(
    paragraph(
      text("Transformasi "),
      math("T"),
      text(
        " mula-mula mendilatasi suatu bangun berpusat di titik asal dengan faktor "
      ),
      math("2"),
      text(", lalu merotasi hasilnya sebesar "),
      math("90^\\circ"),
      text(
        " berlawanan arah jarum jam terhadap titik asal. Pilih semua pernyataan yang benar."
      )
    ),
    place("statements")
  ),
  scoring: [],
};

/** The explanation of the multiple-choice question, a record of its own. */
export const tkaMultipleExplanation = {
  document: doc(
    paragraph(
      text("Dilatasi mengalikan kedua koordinat dengan "),
      math("2"),
      text(". Rotasi berikutnya mengubah "),
      math("(x,y)"),
      text(" menjadi "),
      math("(-y,x)"),
      text(".")
    ),
    blockMath("T(x,y)=(-2y,2x)"),
    paragraph(
      text("Dilatasi positif dan rotasi sama-sama "),
      text("mempertahankan orientasi", "bold"),
      text(".")
    )
  ),
  language: "id",
  version: tkaMultiple.hash,
};

/** The family of the multiple-choice question. */
export const tkaMultipleFamily = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  id: tkaMultiple.family,
};

/** TKA compulsory mathematics set 1, question 19: True or False for each statement. */
export const tkaMatrix = {
  deliveryLanguage: "id",
  family: `${TKA_SET_1}/question-19`,
  hash: hash("5"),
  interactions: [
    {
      columns: [plainPart("column-1", "Benar"), plainPart("column-2", "Salah")],
      id: "categories",
      kind: "matrix",
      label: NAME,
      shuffle: false,
      statements: [
        part(
          "statement-1",
          text("Luas sisi "),
          math("pl"),
          text(" dikalikan "),
          math("6"),
          text(".")
        ),
        part(
          "statement-2",
          text("Luas sisi "),
          math("lt"),
          text(" dikalikan "),
          math("\\frac32"),
          text(".")
        ),
        part("statement-3", text("Volume dikalikan "), math("3"), text(".")),
        part(
          "statement-4",
          text("Setiap diagonal ruang dikalikan "),
          math("2"),
          text(".")
        ),
        part(
          "statement-5",
          text("Luas permukaan total selalu dikalikan "),
          math("3"),
          text(".")
        ),
      ],
    },
  ],
  prompt: doc(
    paragraph(
      text("Sebuah balok dengan rusuk "),
      math("p"),
      text(", "),
      math("l"),
      text(", dan "),
      math("t"),
      text(
        " mengalami penskalaan tak seragam. Kategorikan setiap pernyataan sebagai benar atau salah."
      )
    ),
    place("categories")
  ),
  scoring: [],
};

/** The multiple-choice question with its words in a second, test-only, language. */
export const tkaMultipleEnglish = {
  ...tkaMultiple,
  deliveryLanguage: "en",
  hash: hash("6"),
  interactions: [
    {
      ...tkaChoice,
      label: "Select the answers",
      options: [
        plainPart("option-1", "Option 1 (en)"),
        plainPart("option-2", "Option 2 (en)"),
        plainPart("option-3", "Option 3 (en)"),
        plainPart("option-4", "Option 4 (en)"),
        plainPart("option-5", "Option 5 (en)"),
      ],
    },
  ],
  prompt: doc(paragraph(text("Test-only prompt (en).")), place("statements")),
};
