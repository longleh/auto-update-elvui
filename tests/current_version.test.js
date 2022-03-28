import { getElvUIVersion } from '../main.js'

it ('checks that current elvui version is 12.7', async() => {
    jest.mock("../config.js", () => ({
        wow_folder: './wow_test',
        elvui_website: './elvuiFakeWebsite'
    }));
    const elvuiVersion = await getElvUIVersion('./tests/wow_test');
    expect(elvuiVersion).toBe(12.7)
})
