import { expect, it } from "vitest";
import { publicationRequirements } from "#test/requirements";

it("requires exact Git source context only for Git publication", async () => {
  const requirements = await publicationRequirements();
  expect(requirements).toEqual({ git: true, rollback: false });
});
