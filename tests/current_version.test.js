import { getElvUIVersion } from "../src/helpers/localElvUI.js";
import { getWowFolder } from "../src/config/getConfig.js";

jest.mock("../src/config/getConfig.js", () => ({
  getWowFolder: jest.fn(),
}));

it("checks that current elvui version is 12.7", async () => {
  getWowFolder.mockReturnValueOnce(
    "./tests/mockFiles/ElvUILocalVersion/older_version"
  );
  const elvuiVersion = await getElvUIVersion();
  expect(elvuiVersion).toBe(12.7);
});

it("checks that current elvui version is 12.75", async () => {
  getWowFolder.mockReturnValueOnce(
    "./tests/mockFiles/ElvUILocalVersion/latest_version"
  );
  const elvuiVersion = await getElvUIVersion();
  expect(elvuiVersion).toBe(12.75);
});

it("checks that not installed is managed", async () => {
  try {
    getWowFolder.mockReturnValue(
      "./tests/mockFiles/ElvUILocalVersion/not_installed"
    );
    await getElvUIVersion();
  } catch (e) {
    expect(e.message).toMatch("Cannot find ElvUI Metadata");
  }
});

it("checks when metada are not found", async () => {
  try {
    getWowFolder.mockReturnValue(
      "./tests/mockFiles/ElvUILocalVersion/unable_to_find_version"
    );
    await getElvUIVersion();
  } catch (e) {
    expect(e.message).toMatch("Cannot find ElvUI Metadata");
  }
});

it("checks when metada are not parsable", async () => {
  try {
    getWowFolder.mockReturnValueOnce(
      "./tests/mockFiles/ElvUILocalVersion/unable_to_parse_version"
    );
    await getElvUIVersion();
  } catch (e) {
    expect(e.message).toMatch("Cannot parse ElvUI version");
  }
});

it("checks when metada are not parsable 2", async () => {
  try {
    getWowFolder.mockReturnValueOnce(
      "./tests/mockFiles/ElvUILocalVersion/unable_to_parse_version_2"
    );
    await getElvUIVersion();
  } catch (e) {
    expect(e.message).toMatch("Cannot parse ElvUI version");
  }
});
