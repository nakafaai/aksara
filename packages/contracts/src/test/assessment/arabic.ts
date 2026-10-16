import {
  doc,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { hash, plainPart, singleChoice } from "#contracts/test/assessment/item";

/** Test-only family of one item that is written in Arabic, with no shared reading. */
export const arabicFamily = { id: "test/arabic-item" };

/**
 * Test-only Arabic version of one single-choice item. Its words are test
 * values, and its language is the content language `ar`, which no app locale is.
 */
export const arabicVersion = {
  deliveryLanguage: "ar",
  family: arabicFamily.id,
  hash: hash("9"),
  interactions: [
    {
      ...singleChoice([
        plainPart("option-1", "خيار اختبار أول"),
        plainPart("option-2", "خيار اختبار ثان"),
      ]),
      label: "اختر الإجابة (اختبار)",
    },
  ],
  prompt: doc(paragraph(text("سؤال اختبار فقط.")), place("answer")),
  scoring: [],
};
