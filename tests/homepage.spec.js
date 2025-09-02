//@ts-check

const { test, expect, } = require('@playwright/test');
const { addScreenshotToReport } = require('../utilities/contextUtilities');

test ('Verify Homepage title', async ({page}, testInfo)=>{
  await page.goto('/',{waitUntil:'networkidle', timeout:17000});
  await expect(page).toHaveTitle('OrangeHRM');
  await page.screenshot({path:'homepage.png'});
  // Capture a screenshot
  await addScreenshotToReport(testInfo, page, 'homepage');
})

test ('Verify Homepage logo', async ({page}, testInfo)=>{

  await page.goto('/',{waitUntil:'networkidle', timeout:17000});
  const logo = await page.locator('img[alt="company-branding"]');
  await expect(logo).toBeTruthy();
  await addScreenshotToReport(testInfo, page, 'logo');
})

test ('Forgot Password link is displayed correctly', async ({page}, testInfo)=>{

  await page.goto('/',{waitUntil:'networkidle', timeout:17000});
  const forgotPasswordLink = await page.locator('text=Forgot your password?');
  await expect(forgotPasswordLink).toBeTruthy();
  await expect(forgotPasswordLink).toHaveText('Forgot your password?');
  await expect(forgotPasswordLink).toHaveCSS('color', 'rgb(255, 123, 29)');
  await addScreenshotToReport(testInfo, page, 'forgot-password-link');
})

test ('Login button is displayed correctly', async ({page}, testInfo)=>{

  await page.goto('/',{waitUntil:'networkidle', timeout:17000});
  const loginButton = await page.locator('button[type="submit"]');
  await expect(loginButton).toBeTruthy();
  await expect(loginButton).toHaveText('Login');
  await expect(loginButton).toHaveCSS('background-color', 'rgb(255, 123, 29)');
  await addScreenshotToReport(testInfo, page, 'login-button');
})

test ('User Edit boxes', async ({page}, testInfo)=>{

  await page.goto('/',{waitUntil:'networkidle', timeout:17000});
  await page.getByRole('textbox', {name: 'Username'}).fill('testuser');
  await page.getByRole('textbox', {name: 'Password'}).fill('testpass');
  const userEditBoxes = await page.getByRole('textbox');
  await expect(userEditBoxes).toHaveCount(2);
  await addScreenshotToReport(testInfo, page, 'user-edit-boxes');
  await expect(page.getByRole('textbox', {name: 'Username'})).toHaveValue('testuser');
  await expect(page.getByRole('textbox', {name: 'Password'})).toHaveValue('testpass');
  const user = await page.getByLabel('Username').filter({hasText:'Username'});
  //const pass = await page.getByLabel('Password').filter({hasText:'Password'});

})
