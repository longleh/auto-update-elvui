import axios from 'axios'
import fs from 'fs'
import {getOnlineElvuiVersion} from '../src/onlineElvUIHelper.js'
import {getElvuiWebsite, getElvuiPage} from '../src/getConfig.js'

jest.mock('axios')
jest.mock('../src/getConfig.js', () => ({
  getElvuiWebsite: jest.fn(),
  getElvuiPage: jest.fn()
}))

it("checks that online elvui version is 12.75", async () => {
  const content = fs.readFileSync('./tests/mockFiles/ElvUIWebsite/version_found/download.html', 'utf8')
  axios.get.mockResolvedValue({data: content})
  const elvuiVersion = await getOnlineElvuiVersion();
  expect(elvuiVersion).toBe(12.75);
});

it("checks that unreachable website is handled", async () => {
  getElvuiPage.mockReturnValue('')
  getElvuiWebsite.mockReturnValue('')
  try {
    await getOnlineElvuiVersion();
  } catch (e) {
    expect(e.message).toMatch("Cannot reach ElvUI website");
  }
});
