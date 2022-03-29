import { getElvUIVersion } from "../src/localElvUIHelper.js";

it("checks that current elvui version is 12.7", async () => {
  const elvuiVersion = await getElvUIVersion(
    "./tests/mockFiles/ElvUILocalVersion/older_version"
  );
  expect(elvuiVersion).toBe(12.7);
});

it("checks that current elvui version is 12.75", async () => {
  const elvuiVersion = await getElvUIVersion(
    "./tests/mockFiles/ElvUILocalVersion/latest_version"
  );
  expect(elvuiVersion).toBe(12.75);
});

it("checks that not installed is managed", async () => {
  try {
    await getElvUIVersion(
      "./tests/mockFiles/ElvUILocalVersion/not_installed"
    );
  } catch (e) {
    expect(e).toMatch("Cannot find ElvUI Metadata");
  }
});

it("checks when metada are not found", async () => {
    try {
      await getElvUIVersion(
        "./tests/mockFiles/ElvUILocalVersion/unable_to_find_version"
      );
    } catch (e) {
      expect(e).toMatch("Cannot find ElvUI Metadata");
    }
  });

  it("checks when metada are not parsable", async () => {
    try {
      await getElvUIVersion(
        "./tests/mockFiles/ElvUILocalVersion/unable_to_parse_version"
      );
    } catch (e) {
      expect(e).toMatch("Cannot parse ElvUI version");
    }
  });

  it("checks when metada are not parsable 2", async () => {
    try {
      await getElvUIVersion(
        "./tests/mockFiles/ElvUILocalVersion/unable_to_parse_version_2"
      );
    } catch (e) {
      expect(e).toMatch("Cannot parse ElvUI version");
    }
  });
