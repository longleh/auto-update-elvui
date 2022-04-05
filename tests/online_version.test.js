import axios from "axios";
import fs from "fs";
import { getOnlineElvuiVersion } from "../src/helpers/onlineElvUI.js";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

it("checks that online elvui version is 12.75", async () => {
  const content = fs.readFileSync(
    "./tests/mockFiles/ElvUIWebsite/version_found/download.html",
    "utf8"
  );
  axios.get.mockResolvedValue({ data: content });
  const elvuiVersion = await getOnlineElvuiVersion();
  expect(elvuiVersion).toBe(12.75);
});

it("checks that unparsable (no download text) is handled", async () => {
  const content = fs.readFileSync(
    "./tests/mockFiles/ElvUIWebsite/unparsable_version/download.html",
    "utf8"
  );
  axios.get.mockResolvedValue({ data: content });
  try {
    await getOnlineElvuiVersion();
  } catch (e) {
    expect(e.message).toMatch("Cannot parse ElvUI online version");
  }
});

it("checks that unparsable (no version) is handled", async () => {
  const content = fs.readFileSync(
    "./tests/mockFiles/ElvUIWebsite/unparsable_version/download_2.html",
    "utf8"
  );
  axios.get.mockResolvedValue({ data: content });
  try {
    await getOnlineElvuiVersion();
  } catch (e) {
    expect(e.message).toMatch("Cannot parse ElvUI online version");
  }
});

it("checks that unparsable (no version but text after) is handled", async () => {
  const content = fs.readFileSync(
    "./tests/mockFiles/ElvUIWebsite/unparsable_version/download_3.html",
    "utf8"
  );
  axios.get.mockResolvedValue({ data: content });
  try {
    await getOnlineElvuiVersion();
  } catch (e) {
    expect(e.message).toMatch("Cannot parse ElvUI online version");
  }
});
